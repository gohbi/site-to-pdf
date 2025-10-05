#!/usr/bin/env python3
"""
main.py – Entry point for the URL‑to‑PDF job‑scraper.
"""

import argparse
import sys
from pathlib import Path

from src.fetcher import fetch_main_text
from src.pdf_builder import text_to_pdf

def _process_url(url: str, out_path: Path) -> None:
    success, payload = fetch_main_text(url)
    if not success:
        sys.exit(f"❌ Unable to extract text: {payload}")

    # `payload` is the raw article text
    text_to_pdf(payload, out_path)

def _process_region(args) -> None:
    # Existing screen‑capture path – kept for backward compatibility
    from src.capture import capture_region
    from src.ocr import image_to_text

    region = {"left": args.left, "top": args.top,
              "width": args.width, "height": args.height}
    img = capture_region(region)
    txt = image_to_text(img)
    text_to_pdf(txt, args.out)

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert a job‑listing URL (or a screen region) into a PDF."
    )
    group = parser.add_mutually_exclusive_group(required=True)

    # ----- URL mode -------------------------------------------------
    group.add_argument(
        "--url",
        type=str,
        help="Web address of the job description page."
    )

    # ----- Region mode (legacy) --------------------------------------
    group.add_argument(
        "--region",
        nargs=4,
        metavar=("LEFT", "TOP", "WIDTH", "HEIGHT"),
        type=int,
        help="Capture a screen rectangle instead of a URL. Provide four integers."
    )

    parser.add_argument(
        "--out",
        type=Path,
        default=Path("job_description.pdf"),
        help="Destination PDF file (default: job_description.pdf)."
    )

    args = parser.parse_args()

    if args.url:
        _process_url(args.url, args.out)
    else:
        left, top, width, height = args.region
        class DummyArgs:
            pass
        dummy = DummyArgs()
        dummy.left, dummy.top, dummy.width, dummy.height, dummy.out = left, top, width, height, args.out
        _process_region(dummy)