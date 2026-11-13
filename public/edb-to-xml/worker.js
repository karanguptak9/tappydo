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
      pyodide.runPython("import sys; sys.path.insert(0, '/lib'); import edb2xml, heyex2hedx");
      pyodide.FS.mkdir("/in");
      pyodide.FS.mkdir("/out");
    })();
  }
  return booting;
}

const RUN = `
import os, shutil, sys, zipfile, edb2xml
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
        if os.path.isdir("/out/images"):
            for name in sorted(os.listdir("/out/images")):
                # PNG and JPEG data is already compressed
                z.write("/out/images/" + name, arcname="images/" + name, compress_type=zipfile.ZIP_STORED)
shutil.rmtree("/out/images", ignore_errors=True)
ERR
`;

/* Scan report: all Heidelberg files of a scan (or a whole export) together
   -> one HEDX-style XML and one PDF per series. */
const REPORT = `
import json, zipfile, heyex2hedx
ERR = None
META = []
try:
    reports = heyex2hedx.build_all(list(PATHS))
    if not reports:
        ERR = "No scan series found in these files."
    else:
        with zipfile.ZipFile("/out/out.zip", "w", zipfile.ZIP_DEFLATED) as z:
            for r in reports:
                x = "/out/" + r["name"] + ".xml"
                p = "/out/" + r["name"] + ".pdf"
                with open(x, "w", encoding="utf-8", newline="\\n") as f:
                    f.write(r["xml"])
                with open(p, "wb") as f:
                    f.write(heyex2hedx.pdf_bytes(r["xml"]))
                z.write(x, arcname=r["name"] + ".xml")
                z.write(p, arcname=r["name"] + ".pdf")
                META.append({k: r[k] for k in ("series", "name", "notes", "images", "grid")})
except Exception as exc:
    ERR = f"{type(exc).__name__}: {exc}"
json.dumps({"err": ERR, "meta": META})
`;

async function report(msg) {
  postMessage({ type: "stage", stage: "engine" });
  await boot();
  postMessage({ type: "stage", stage: "convert" });

  const FS = pyodide.FS;
  const blobs = msg.files.map((f, i) => ({
    name: i + "_" + (f.name || "input").replace(/[\/\\\0]/g, "_"), data: f.file }));
  FS.mount(FS.filesystems.WORKERFS, { blobs }, "/in");
  const written = [];
  try {
    pyodide.globals.set("PATHS", pyodide.toPy(blobs.map((b) => "/in/" + b.name)));
    const res = JSON.parse(pyodide.runPython(REPORT));
    if (res.err) {
      postMessage({ type: "error", message: String(res.err).replace(/\/in\/\d+_/g, "") });
      return;
    }
    const reports = res.meta.map((m) => {
      written.push("/out/" + m.name + ".xml", "/out/" + m.name + ".pdf");
      return Object.assign({}, m, {
        xml: new Blob([FS.readFile("/out/" + m.name + ".xml")], { type: "text/plain" }),
        pdf: new Blob([FS.readFile("/out/" + m.name + ".pdf")], { type: "application/pdf" }),
      });
    });
    written.push("/out/out.zip");
    postMessage({ type: "report", reports, zip: new Blob([FS.readFile("/out/out.zip")], { type: "application/zip" }) });
  } finally {
    for (const f of written.concat(["/out/out.zip"])) {
      try { FS.unlink(f); } catch (e) { /* not written */ }
    }
    FS.unmount("/in");
  }
}

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
    if (o.images) argv.push("--images", "/out/images");
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
  (e.data.mode === "report" ? report(e.data) : convert(e.data)).catch((err) => {
    postMessage({ type: "error", message: (err && err.message) || String(err), engine: !pyodide });
  });
};
