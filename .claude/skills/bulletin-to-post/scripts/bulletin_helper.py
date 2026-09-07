#!/usr/bin/env python3
"""
Helper CLI for turning Broncobots Bulletin PDFs into Jekyll posts.

Wraps the PyMuPDF (fitz) + Pillow calls needed to inspect a bulletin PDF and
pull out its lead photo, so the calling agent doesn't have to re-write the
same heredoc every time. Every subcommand prints plain text / JSON to stdout;
nothing here writes to _posts/ or touches git — the calling agent still
decides what the post's title/date/image should be and creates the files.

Subcommands:
  render        Render one or more pages of a PDF to PNG for visual reading.
  list-images   List embedded raster images on a page: xref, size, bytes,
                placement rect, and a guess at whether it's the header banner.
  extract-image Dump one embedded image's raw bytes to a file (for viewing
                a candidate before committing to it).
  save-jpeg     Decode one embedded image and save it as a JPEG at the given
                path (this is the final "commit" step once you've picked one).
  find-missing  Catch-up mode: list PDFs in BroncoBulletin/ that no post in
                _posts/ references yet.

Requires: pymupdf (pip install pymupdf), Pillow (usually already present).
"""
import argparse
import io
import json
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF


def cmd_render(args):
    doc = fitz.open(args.pdf)
    pages = args.pages if args.pages else list(range(len(doc)))
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = Path(args.pdf).stem
    stem = re.sub(r"[^A-Za-z0-9_-]+", "_", stem)
    results = []
    for pno in pages:
        if pno >= len(doc):
            continue
        page = doc[pno]
        pix = page.get_pixmap(matrix=fitz.Matrix(args.zoom, args.zoom))
        out_path = out_dir / f"{stem}_page{pno}.png"
        pix.save(str(out_path))
        results.append(str(out_path))
    print(json.dumps({"pdf": args.pdf, "pages_rendered": results}, indent=2))


def _is_probable_banner(w, h, rect, page_rect):
    """Heuristic: the recurring header banner is very wide/short and sits at
    the top of the page (y0 close to 0)."""
    aspect = w / h if h else 0
    near_top = rect[1] <= 5  # y0
    full_width = (rect[2] - rect[0]) >= page_rect.width * 0.9
    return aspect >= 3.0 and near_top and full_width


def cmd_list_images(args):
    doc = fitz.open(args.pdf)
    page = doc[args.page]
    page_rect = page.rect
    rows = []
    for img in page.get_images(full=True):
        xref = img[0]
        base = doc.extract_image(xref)
        rects = page.get_image_rects(xref)
        rect = tuple(round(v, 1) for v in rects[0]) if rects else None
        rows.append({
            "xref": xref,
            "width": base["width"],
            "height": base["height"],
            "ext": base["ext"],
            "bytes": len(base["image"]),
            "rect_x0y0x1y1": rect,
            "probable_banner": _is_probable_banner(
                base["width"], base["height"], rect, page_rect
            ) if rect else False,
        })
    # Sort top-to-bottom (smaller y0 = higher/earlier on the page) so the
    # calling agent can read "reading order" directly off the list.
    rows.sort(key=lambda r: (r["rect_x0y0x1y1"] or (0, 0, 0, 0))[1])
    print(json.dumps({"pdf": args.pdf, "page": args.page, "images": rows}, indent=2))


def cmd_extract_image(args):
    doc = fitz.open(args.pdf)
    base = doc.extract_image(args.xref)
    out_path = Path(args.out) if args.out else Path(f"xref{args.xref}.{base['ext']}")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(base["image"])
    print(json.dumps({
        "saved_to": str(out_path),
        "width": base["width"],
        "height": base["height"],
        "ext": base["ext"],
    }, indent=2))


def cmd_save_jpeg(args):
    from PIL import Image

    doc = fitz.open(args.pdf)
    base = doc.extract_image(args.xref)
    img = Image.open(io.BytesIO(base["image"]))
    if img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=args.quality)
    print(json.dumps({
        "saved_to": str(out_path),
        "width": img.width,
        "height": img.height,
    }, indent=2))


def cmd_find_missing(args):
    bulletins_dir = Path(args.bulletins_dir)
    posts_dir = Path(args.posts_dir)

    pdfs = sorted(bulletins_dir.glob("*.pdf"))
    post_files = list(posts_dir.glob("*.markdown")) + list(posts_dir.glob("*.md"))

    # Every existing post embeds its exact source PDF filename verbatim in an
    # <iframe src="...">, so that's the reliable cross-check — post filenames
    # are human slugs of the headline and don't correspond to PDF filenames.
    referenced = set()
    for pf in post_files:
        text = pf.read_text(encoding="utf-8", errors="ignore")
        for m in re.finditer(r'BroncoBulletin/([^"]+\.pdf)', text):
            referenced.add(m.group(1))

    missing = [str(p.name) for p in pdfs if p.name not in referenced]
    print(json.dumps({
        "total_pdfs": len(pdfs),
        "already_have_posts": len(pdfs) - len(missing),
        "missing": missing,
    }, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("render", help="Render page(s) of a PDF to PNG")
    p.add_argument("pdf")
    p.add_argument("--pages", type=int, nargs="*", help="Page numbers, 0-indexed (default: all pages)")
    p.add_argument("--zoom", type=float, default=1.5)
    p.add_argument("--out-dir", default=".")
    p.set_defaults(func=cmd_render)

    p = sub.add_parser("list-images", help="List embedded images on a page with placement rects")
    p.add_argument("pdf")
    p.add_argument("--page", type=int, default=0)
    p.set_defaults(func=cmd_list_images)

    p = sub.add_parser("extract-image", help="Dump one embedded image's raw bytes for viewing")
    p.add_argument("pdf")
    p.add_argument("xref", type=int)
    p.add_argument("--out", help="Output path (default: xref<N>.<ext> in cwd)")
    p.set_defaults(func=cmd_extract_image)

    p = sub.add_parser("save-jpeg", help="Decode and save one embedded image as the final JPEG")
    p.add_argument("pdf")
    p.add_argument("xref", type=int)
    p.add_argument("out")
    p.add_argument("--quality", type=int, default=90)
    p.set_defaults(func=cmd_save_jpeg)

    p = sub.add_parser("find-missing", help="List bulletin PDFs with no matching post yet")
    p.add_argument("--bulletins-dir", default="BroncoBulletin")
    p.add_argument("--posts-dir", default="_posts")
    p.set_defaults(func=cmd_find_missing)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    sys.exit(main())
