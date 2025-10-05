#!/usr/bin/env python3
"""
snip_to_pdf.py
---------------
A tiny Windows‑only utility that:

1. Pops up a Yes/No dialog asking if you want to capture text.
2. Launches the built‑in Snipping Tool (Ctrl+Shift+S) when you answer Yes.
3. Reads the image that the Snipping Tool places on the clipboard.
4. Runs Tesseract OCR on that image.
5. Writes the extracted text to a PDF (using the existing pdf_builder module).

Dependencies:
    - tkinter (standard library)
    - pillow
    - pytesseract
    - reportlab
    - pywin32 (for clipboard handling)   <-- installed automatically by Pillow on Windows
"""

import sys
import time
import subprocess
import tkinter as tk
from tkinter import messagebox, filedialog
from pathlib import Path

from PIL import ImageGrab, Image
import pytesseract

# Import the PDF builder you already have in src/pdf_builder.py
# Adjust the import path if your repo layout differs.
from src.pdf_builder import text_to_pdf


# ----------------------------------------------------------------------
# Helper: make sure Tesseract is reachable -------------------------------------------------
def _ensure_tesseract():
    try:
        pytesseract.get_tesseract_version()
    except Exception as exc:  # pragma: no cover
        raise EnvironmentError(
            "Tesseract OCR executable not found. Install it and ensure it is on your PATH.\n"
            "   • macOS: brew install tesseract\n"
            "   • Ubuntu: sudo apt-get install tesseract-ocr\n"
            "   • Windows: download the installer from https://github.com/UB-Mannheim/tesseract/wiki"
        ) from exc


# ----------------------------------------------------------------------
# Step 1 – Show a modal Yes/No dialog ---------------------------------------------------------
def ask_user():
    root = tk.Tk()
    root.withdraw()                     # hide the empty root window
    answer = messagebox.askyesno(
        title="Capture Text?",
        message="Do you want to capture some text from the screen?\n"
                "Press ‘Yes’ to open the Snipping Tool.",
        icon=messagebox.QUESTION,
    )
    root.destroy()
    return answer


# ----------------------------------------------------------------------
# Step 2 – Launch the Snipping Tool ------------------------------------------------------------
def launch_snipping_tool():
    """
    On Windows 10/11 the modern Snipping Tool can be started with:
        ms-screenclip:   (opens the overlay directly)
    Older versions use `SnippingTool.exe`.
    We try the modern URI first; if that fails we fall back to the classic exe.
    """
    try:
        # Modern overlay (works on Win10+)
        subprocess.Popen(["explorer", "ms-screenclip:"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:  # pragma: no cover
        # Classic Snipping Tool (still present on many systems)
        subprocess.Popen(["SnippingTool.exe"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


# ----------------------------------------------------------------------
# Step 3 – Wait for the user to finish the snip and grab the clipboard image -----------------
def get_image_from_clipboard(timeout_seconds: int = 30) -> Image.Image:
    """
    Poll the clipboard until an image appears or the timeout expires.
    Returns a Pillow Image object.
    """
    start = time.time()
    while time.time() - start < timeout_seconds:
        # Pillow’s ImageGrab can read the Windows clipboard directly.
        img = ImageGrab.grabclipboard()
        if isinstance(img, Image.Image):
            return img
        time.sleep(0.5)  # poll twice per second
    raise TimeoutError("No image was copied to the clipboard within the timeout period.")


# ----------------------------------------------------------------------
# Step 4 – OCR the image ------------------------------------------------------------------------
def ocr_image(img: Image.Image) -> str:
    _ensure_tesseract()
    # You can tune Tesseract with config flags if needed, e.g. '--psm 6'
    return pytesseract.image_to_string(img, lang="eng").strip()


# ----------------------------------------------------------------------
# Step 5 – Ask the user where to save the PDF ----------------------------------------------------
def ask_save_location(default_name: str = "captured_text.pdf") -> Path:
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.asksaveasfilename(
        title="Save PDF As",
        defaultextension=".pdf",
        initialfile=default_name,
        filetypes=[("PDF files", "*.pdf")],
    )
    root.destroy()
    if not file_path:
        raise KeyboardInterrupt("User cancelled the save dialog.")
    return Path(file_path)


# ----------------------------------------------------------------------
# Main orchestration ---------------------------------------------------------------------------
def main():
    try:
        if not ask_user():
            print("User declined to capture text – exiting.")
            return

        print("Launching Snipping Tool…")
        launch_snipping_tool()
        print("Please select the region that contains the text, then release the mouse.")
        print("Waiting for the image to appear on the clipboard…")

        img = get_image_from_clipboard()
        print("Image received – performing OCR…")
        extracted_text = ocr_image(img)

        if not extracted_text:
            print("⚠️  OCR did not find any recognisable text.")
            return

        save_path = ask_save_location()
        text_to_pdf(extracted_text, save_path)
        print(f"✅ PDF saved to {save_path}")

    except KeyboardInterrupt:
        print("\nOperation cancelled by the user.")
    except TimeoutError as te:
        print(f"\n⏰ {te}")
    except Exception as e:  # pragma: no cover
        print(f"\n❌ Unexpected error: {e}")


if __name__ == "__main__":
    main()