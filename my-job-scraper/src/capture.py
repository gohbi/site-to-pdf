"""
src/capture.py
----------------
Utility for grabbing a rectangular region of the screen.

Uses the **mss** library because it works on Windows, macOS and Linux
without any additional native dependencies.
"""

from typing import Dict
import mss
from PIL import Image


def _dict_to_mss_region(region: Dict[str, int]) -> Dict[str, int]:
    """
    mss expects a dict with the keys ``left``, ``top``, ``width`` and ``height``.
    This tiny wrapper validates the input and raises a helpful error if something
    is missing or malformed.
    """
    required_keys = {"left", "top", "width", "height"}
    missing = required_keys - region.keys()
    if missing:
        raise ValueError(f"Region dict is missing keys: {missing}")

    # Ensure all values are ints and non‑negative
    for k in required_keys:
        v = region[k]
        if not isinstance(v, int) or v < 0:
            raise ValueError(f"Region value for '{k}' must be a non‑negative int, got {v!r}")

    return region


def capture_region(region: Dict[str, int]) -> Image.Image:
    """
    Capture a rectangular portion of the primary monitor.

    Parameters
    ----------
    region : dict
        ``{'left': int, 'top': int, 'width': int, 'height': int}``

    Returns
    -------
    PIL.Image.Image
        An RGB image that can be fed directly into OCR utilities.
    """
    # Validate / normalise the dict
    safe_region = _dict_to_mss_region(region)

    # ``mss`` works with a context manager that handles cleanup for us.
    with mss.mss() as sct:
        # Grab returns a ``MSSImage`` (basically raw bytes + metadata)
        raw = sct.grab(safe_region)

        # Convert the raw bytes to a Pillow Image (RGB mode)
        img = Image.frombytes("RGB", raw.size, raw.rgb)

    return img