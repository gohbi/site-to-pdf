Site to PDF

## Prerequisites

### 1️⃣ Install Tesseract OCR

`custom_snip_to_pdf.py` (and the other snipping utilities) rely on the **Tesseract OCR engine** to turn the captured image into text.  
You must:

1. **Download & install Tesseract**  
   * **Windows** – Grab the installer from the official UB‑Mannheim builds:  
     <https://github.com/UB-Mannheim/tesseract/wiki>  
   * **macOS** – Install via Homebrew: `brew install tesseract`  
   * **Linux** – Install from your distro’s package manager, e.g.  
     `sudo apt-get install tesseract-ocr` (Debian/Ubuntu) or `sudo dnf install tesseract` (Fedora).

2. **Add the Tesseract install folder to your system PATH**  
   * **Windows** – The installer normally adds `C:\Program Files\Tesseract-OCR` to the PATH automatically. If it didn’t, open *System Properties → Advanced → Environment Variables* and prepend that folder to the **Path** variable.  
   * **macOS / Linux** – The Homebrew or package‑manager installation already places `tesseract` in `/usr/local/bin` (or `/usr/bin`), which is on the PATH by default. If you installed it somewhere custom, export the folder, e.g.:  
     ```bash
     export PATH="/opt/tesseract/bin:$PATH"
     ```

> **Why this matters** – All open‑source projects that wrap Tesseract (including this snipping tool) expect the `tesseract` executable to be discoverable via the system PATH. If it isn’t, `pytesseract` will raise a cryptic “TesseractNotFoundError”. The snippet below adds a **clear, early‑exit check** so users see a friendly message instead of a stack trace.

### 2️⃣ Python dependencies

```bash
pip install -r requirements.txt



## Layout 
      my-job-scraper/
      │
      ├─ src/
      │   ├─ __init__.py
      │   ├─ capture.py          # (no longer needed for the snip flow)
      │   ├─ ocr.py
      │   ├─ pdf_builder.py
      │   └─ fetcher.py          # (URL mode – still useful)
      │
      ├─ snip_to_pdf.py          # ← the script above
      ├─ main.py                 # (your original URL/region entry point, optional)
      ├─ requirements.txt
      └─ README.md
