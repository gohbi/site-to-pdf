import argparse
from src.capture import capture_region
from src.ocr import image_to_text
from src.pdf_builder import text_to_pdf

def main():
    parser = argparse.ArgumentParser(description="Grab a screen region, OCR it, and save as PDF.")
    parser.add_argument("--left", type=int, required=True)
    parser.add_argument("--top", type=int, required=True)
    parser.add_argument("--width", type=int, required=True)
    parser.add_argument("--height", type=int, required=True)
    parser.add_argument("--out", default="job_description.pdf")
    args = parser.parse_args()

    region = {"left": args.left, "top": args.top,
              "width": args.width, "height": args.height}
    img = capture_region(region)
    txt = image_to_text(img)
    text_to_pdf(txt, args.out)
    print(f"✅ Saved PDF to {args.out}")

if __name__ == "__main__":
    main()