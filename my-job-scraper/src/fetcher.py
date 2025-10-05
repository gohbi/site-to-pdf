"""
src/fetcher.py
---------------
Utilities for downloading a web page and extracting the main article text.
"""

import logging
from typing import Tuple, Optional

import requests
from bs4 import BeautifulSoup

# Optional, higher‑quality extractor (install with `pip install readability-lxml`)
try:
    from readability import Document  # type: ignore
    _HAS_READABILITY = True
except Exception:  # pragma: no cover
    _HAS_READABILITY = False


def _download(url: str, timeout: int = 15) -> str:
    """Fetch the raw HTML of *url*."""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (compatible; LumoJobScraper/1.0; +https://github.com/yourname/job‑scraper)"
        )
    }
    response = requests.get(url, headers=headers, timeout=timeout)
    response.raise_for_status()
    return response.text


def _extract_with_readability(html: str) -> str:
    """Best‑effort extraction using Mozilla’s Readability algorithm."""
    doc = Document(html)
    # `summary()` returns a cleaned‑up HTML fragment
    cleaned_html = doc.summary()
    soup = BeautifulSoup(cleaned_html, "html.parser")
    return soup.get_text(separator="\n")


def _fallback_extract(html: str) -> str:
    """
    Very simple fallback: grab the biggest `<p>` container.
    This works for many job‑board pages that don’t have a full article wrapper.
    """
    soup = BeautifulSoup(html, "html.parser")
    # Find all <p> tags, join them, and keep the longest block of text.
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")]
    if not paragraphs:
        return ""
    # Return the concatenation of the top‑N longest paragraphs (here 10)
    top_paras = sorted(paragraphs, key=len, reverse=True)[:10]
    return "\n\n".join(top_paras)


def fetch_main_text(url: str) -> Tuple[bool, Optional[str]]:
    """
    Download *url* and return the extracted main text.

    Returns
    -------
    (success, text_or_error_message)
        *success* – ``True`` if we got something that looks like article text.
        *text_or_error_message* – the extracted text, or an explanatory string.
    """
    try:
        html = _download(url)
    except Exception as exc:  # network, 404, timeout, etc.
        logging.error("Failed to download %s – %s", url, exc)
        return False, f"Network error: {exc}"

    # Try the high‑quality Readability extractor first
    if _HAS_READABILITY:
        try:
            text = _extract_with_readability(html)
            if text.strip():
                return True, text
        except Exception as exc:  # pragma: no cover
            logging.warning("Readability failed for %s – %s", url, exc)

    # Fallback to the simple heuristic
    text = _fallback_extract(html)
    if text.strip():
        return True, text

    return False, "Could not locate meaningful text on the page."