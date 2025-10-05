#!/usr/bin/env python3
"""
custom_snip_to_pdf.py
---------------------
A cross-platform (Windows/macOS/Linux) snipping tool using tkinter and Pillow.
Lets the user select a region of the screen, runs OCR, and saves as PDF using your existing text_to_pdf function.

Dependencies:
    - tkinter (standard library)
    - pillow
    - pytesseract
    - reportlab

This script does NOT interfere with your existing snip_to_pdf.py or main.py.
"""

import tkinter as tk
from tkinter import filedialog
from PIL import ImageGrab, Image
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r"\your\path\to\tesseract.exe"  # <-- Change this to your Tesseract executable path
from pathlib import Path
import sys

from src.pdf_builder import text_to_pdf

def select_region():
    root = tk.Tk()
    root.attributes("-fullscreen", True)
    root.attributes("-alpha", 0.3)
    root.title("Drag to select region")
    canvas = tk.Canvas(root, cursor="cross", bg="grey")
    canvas.pack(fill=tk.BOTH, expand=True)

    rect = None
    start_x = start_y = end_x = end_y = 0

    def on_mouse_down(event):
        nonlocal start_x, start_y, rect
        start_x, start_y = event.x, event.y
        rect = canvas.create_rectangle(start_x, start_y, start_x, start_y, outline="red", width=2)

    def on_mouse_move(event):
        nonlocal rect
        if rect:
            canvas.coords(rect, start_x, start_y, event.x, event.y)

    def on_mouse_up(event):
        nonlocal end_x, end_y
        end_x, end_y = event.x, event.y
        root.quit()
        root.destroy()

    canvas.bind("<ButtonPress-1>", on_mouse_down)
    canvas.bind("<B1-Motion>", on_mouse_move)
    canvas.bind("<ButtonRelease-1>", on_mouse_up)
    root.mainloop()
    # Ensure coordinates are positive and ordered
    x1, y1 = min(start_x, end_x), min(start_y, end_y)
    x2, y2 = max(start_x, end_x), max(start_y, end_y)
    return (x1, y1, x2, y2)

def ocr_image(img: Image.Image) -> str:
    try:
        pytesseract.get_tesseract_version()
    except Exception as exc:
        raise EnvironmentError(
            "Tesseract OCR executable not found. Install it and ensure it is on your PATH."
        ) from exc
    return pytesseract.image_to_string(img, lang="eng").strip()

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

def main():
    print("Drag to select the region you want to capture...")
    region = select_region()
    print(f"Selected region: {region}")
    img = ImageGrab.grab(bbox=region)
    print("Image captured. Running OCR...")
    extracted_text = ocr_image(img)
    if not extracted_text:
        print("⚠️  OCR did not find any recognisable text.")
        return
    save_path = ask_save_location()
    text_to_pdf(extracted_text, save_path)
    print(f"✅ PDF saved to {save_path}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nOperation cancelled by the user.")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
