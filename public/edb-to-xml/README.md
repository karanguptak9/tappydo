# EDB & SDB to XML converter

Files behind `/projects/edb-to-xml`. The page itself is `public/edb-to-xml.html`.

- `worker.js` runs the conversion in a Web Worker using Pyodide (Python compiled to
  WebAssembly), loaded from the jsDelivr CDN at a pinned version. The chosen file is read
  locally and never leaves the browser.
- `pylib.zip` is the Python code the worker runs:
  - `edb2xml.py`, the converter script.
  - `dissect.esedb`, `dissect.cstruct` and `dissect.util` (pure-Python files only), the
    ESE database parser by Fox-IT, unmodified, licensed AGPL-3.0.
    Source: https://github.com/fox-it/dissect.esedb

To update the converter, edit `edb2xml.py`, then rebuild `pylib.zip` with `edb2xml.py` and
the `dissect/` package folder at the top level of the archive.
