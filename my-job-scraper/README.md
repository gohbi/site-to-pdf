# site-to-pdf
Scan text on a website and turn it into a pdf.
## Layout
    my‑job‑scraper/
    │
    ├─ README.md                # Project overview, setup, usage
    ├─ requirements.txt         # Python dependencies (or pyproject.toml)
    ├─ .gitignore               # Exclude virtual‑env, caches, secrets
    │
    ├─ src/
    │   ├─ __init__.py
    │   ├─ capture.py           # Screenshot logic (mss, MediaProjection, etc.)
    │   ├─ ocr.py               # Wrapper around pytesseract / ML‑Kit
    │   └─ pdf_builder.py       # ReportLab (or other) PDF generation
    │
    └─ main.py                  # Tiny CLI / entry point
