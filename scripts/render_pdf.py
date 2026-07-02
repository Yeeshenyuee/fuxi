#!/usr/bin/env python
"""Render PDF pages to PNG for visual reading (for scanned PDFs / CJK glyph fonts
that break pdftotext). Verified workflow: render TOC pages first to build the
chapter->page index, then render only the chapter you are teaching.

Usage:   python render_pdf.py <pdf_path> <start_page> <end_page> <out_dir>
Requires: pip install pymupdf
"""
import os
import sys

import fitz  # pymupdf

if len(sys.argv) != 5:
    sys.exit("usage: python render_pdf.py <pdf> <start_page> <end_page> <outdir>")

pdf, start, end, outdir = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
doc = fitz.open(pdf)
os.makedirs(outdir, exist_ok=True)
n = len(doc)
mat = fitz.Matrix(2, 2)  # 2x zoom keeps CJK text legible
for i in range(start - 1, min(end, n)):
    doc[i].get_pixmap(matrix=mat).save(os.path.join(outdir, "p%03d.png" % (i + 1)))
print("rendered pages %d-%d of %d -> %s" % (start, min(end, n), n, outdir))
