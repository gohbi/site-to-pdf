"""
src/pdf_builder.py
-------------------
Creates a simple PDF from a plain‑text string using ReportLab.

The layout is deliberately straightforward:
* 1‑inch margins on all sides
* 12‑pt Helvetica font
* Automatic page breaks when the cursor reaches the bottom margin
"""

from pathlib import Path
from typing import Union
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas


def _split_into_lines(text: str, max_width: float, pdf_canvas: canvas.Canvas) -> list[str]:
    """
    Break a long string into lines that fit within ``max_width`` points.
    This is a very lightweight word‑wrap implementation that uses the
    canvas's built‑in stringWidth measurement.
    """
    words = text.split()
    lines = []
    current = ""

    for w in words:
        # Tentatively add the next word
        trial = f"{current} {w}".strip()
        if pdf_canvas.stringWidth(trial, "Helvetica", 12) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)

    return lines


def text_to_pdf(
    text: Union[str, bytes],
    output_path: Union[str, Path],
    page_size=LETTER,
    margin_pt: float = 72,  # 1 inch = 72 points
) -> None:
    """
    Write ``text`` to a PDF file.

    Parameters
    ----------
    text : str or bytes
        The content you want in the PDF. Bytes will be decoded as UTF‑8.
    output_path : str or pathlib.Path
        Destination filename (e.g. ``'job_description.pdf'``).
    page_size : tuple, optional
        Width/height in points. Default is US Letter (612 × 792 pt).
    margin_pt : float, optional
        Margin on all four sides, expressed in points. Default 1 in.
    """
    # Normalise inputs
    if isinstance(text, bytes):
        text = text.decode("utf-8")
    out_file = Path(output_path)

    # Prepare canvas
    c = canvas.Canvas(str(out_file), pagesize=page_size)
    width, height = page_size
    usable_width = width - 2 * margin_pt
    y_cursor = height - margin_pt  # start at top margin

    # Font settings – Helvetica is built‑in, no external TTF needed.
    c.setFont("Helvetica", 12)

    # Split the whole document into paragraphs first (preserve blank lines)
    paragraphs = text.split("\n\n")
    for para in paragraphs:
        # Within each paragraph, wrap lines to the printable width.
        lines = _split_into_lines(para.replace("\n", " "), usable_width, c)

        for line in lines:
            # If we run out of vertical space, start a new page.
            if y_cursor < margin_pt:
                c.showPage()
                c.setFont("Helvetica", 12)
                y_cursor = height - margin_pt

            c.drawString(margin_pt, y_cursor, line)
            y_cursor -= 14  # line height (12pt font + 2pt leading)

        # Add a blank line between paragraphs
        y_cursor -= 8

    c.save()
    print(f"✅ PDF written to {out_file.resolve()}")