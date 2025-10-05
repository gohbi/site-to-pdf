"""
src/ocr.py
-----------
Thin wrapper around pytesseract (the Python bindings for the Tesseract OCR engine).

The function accepts a Pillow Image and returns the recognised Unicode string.
"""

from typing import Union
from PIL import Image
import pytesseract
import os


def _ensure_tesseract_available() -> None:
    """
    Verify that the ``tesseract`` executable can be found on the system ``PATH``.
    If not, raise a clear error that tells the user how to install it.
    """
    # ``pytesseract`` exposes the path via ``pytesseract.tesseract_cmd``.
    # By default it assumes the binary is on the PATH.
    if not pytesseract.get_tesseract_version():
        raise EnvironmentError(
            "Tesseract OCR executable not found. "
            "Install it and ensure it's on your PATH:\n"
            "- macOS:  brew install tesseract\n"
            "- Ubuntu: sudo apt-get install tesseract-ocr\n"
            "- Windows: download the installer from https://github.com/UB-Mannheim/tesseract/wiki"
        )


def image_to_text(image: Image.Image, lang: str = "eng") -> str:
    """
    Run OCR on a Pillow image and return the extracted text.

    Parameters
    ----------
    image : PIL.Image.Image
        The image to analyse. Must be in RGB or grayscale mode.
    lang : str, optional
        Language pack for Tesseract (default ``'eng'``). Additional packs can be
        installed via your OS package manager.

    Returns
    -------
    str
        Plain‑text representation of the image contents.
    """
    # Defensive check – helps new users understand why OCR might fail.
    _ensure_tesseract_available()

    # ``pytesseract.image_to_string`` does all the heavy lifting.
    # You can pass additional config flags here (e.g. ``--psm 6``) if you
    # need to tweak layout handling.
    text = pytesseract.image_to_string(image, lang=lang)

    # Strip trailing whitespace but preserve line breaks – makes PDF formatting easier.
    return text.strip("\n")