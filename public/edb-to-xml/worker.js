/* Runs the converter (edb2xml.py) inside the browser. The file is read
   locally through WORKERFS; nothing is sent anywhere. */
const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
const LIB = new URL("pylib.zip", self.location.href).href;
let pyodide = null;
let booting = null;

function log(line) {
  postMessage({ type: "log", line: String(line) });
}

function boot() {
  if (!booting) {
    booting = (async () => {
      importScripts(PYODIDE + "pyodide.js");
      pyodide = await loadPyodide({ indexURL: PYODIDE, stdout: log, stderr: log });
      // pylib.zip holds edb2xml.py and the dissect.esedb parser it uses.
      const res = await fetch(LIB);
      if (!res.ok) throw new Error("Could not load the converter files.");
      pyodide.unpackArchive(await res.arrayBuffer(), "zip", { extractDir: "/lib" });
      pyodide.runPython("import sys; sys.path.insert(0, '/lib'); import edb2xml");
      pyodide.FS.mkdir("/in");
      pyodide.FS.mkdir("/out");
    })();
  }
  return booting;
}

const RUN = `
import sys, zipfile, edb2xml
sys.argv = list(ARGV)
ERR = None
try:
    edb2xml.main()
except SystemExit as exc:
    if isinstance(exc.code, str):
        ERR = exc.code
    elif exc.code:
        ERR = "The converter stopped with an error."
except Exception as exc:
    ERR = f"{type(exc).__name__}: {exc}"
if ERR is None:
    with zipfile.ZipFile("/out/out.zip", "w", zipfile.ZIP_DEFLATED) as z:
        z.write("/out/out.xml", arcname=XMLNAME)
ERR
`;

async function convert(msg) {
  postMessage({ type: "stage", stage: "engine" });
  await boot();
  postMessage({ type: "stage", stage: "convert" });

  const FS = pyodide.FS;
  const safe = (msg.name || "input").replace(/[\/\\\0]/g, "_");
  FS.mount(FS.filesystems.WORKERFS, { blobs: [{ name: safe, data: msg.file }] }, "/in");
  try {
    const o = msg.opts || {};
    const argv = ["edb2xml", "/in/" + safe, "-o", "/out/out.xml", "--binary", o.binary === "base64" ? "base64" : "hex"];
    if (o.skipSystem) argv.push("--skip-system");
    if (o.includeNulls) argv.push("--include-nulls");
    if (o.allTags) argv.push("--all-tags");
    if (o.maxRows > 0) argv.push("--max-rows", String(o.maxRows));
    pyodide.globals.set("ARGV", pyodide.toPy(argv));
    pyodide.globals.set("XMLNAME", msg.xmlName);
    const err = pyodide.runPython(RUN);
    if (err) {
      postMessage({ type: "error", message: String(err) });
      return;
    }
    const xml = FS.readFile("/out/out.xml");
    const zip = FS.readFile("/out/out.zip");
    postMessage({
      type: "done",
      xml: new Blob([xml], { type: "text/plain" }),
      zip: new Blob([zip], { type: "application/zip" }),
    });
  } finally {
    for (const f of ["/out/out.xml", "/out/out.zip"]) {
      try { FS.unlink(f); } catch (e) { /* not written */ }
    }
    FS.unmount("/in");
  }
}

self.onmessage = (e) => {
  convert(e.data).catch((err) => {
    postMessage({ type: "error", message: (err && err.message) || String(err), engine: !pyodide });
  });
};
