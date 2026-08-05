#!/usr/bin/env python3
"""Format code in the Level 1 DOCX and rebuild its companion PDF."""

from __future__ import annotations

import html
import json
import re
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "PCCP_Level_1_Full_De_Bai_Tieng_Viet_84_Bai.docx"
PDF = ROOT / "PCCP_Level_1_Full_De_Bai_Tieng_Viet_84_Bai.pdf"
FORMATTER = ROOT / "tools" / "format_code_blocks.mjs"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_NS = "http://www.w3.org/XML/1998/namespace"
W = f"{{{W_NS}}}"
ET.register_namespace("w", W_NS)


def paragraph_style(paragraph: ET.Element) -> str:
    style = paragraph.find(f"./{W}pPr/{W}pStyle")
    return style.get(f"{W}val", "") if style is not None else ""


def element_text(element: ET.Element, preserve_breaks: bool = True) -> str:
    parts: list[str] = []
    for node in element.iter():
        if node.tag == f"{W}t":
            parts.append(node.text or "")
        elif preserve_breaks and node.tag == f"{W}tab":
            parts.append("\t")
        elif preserve_breaks and node.tag == f"{W}br" and node.get(f"{W}type") != "page":
            parts.append("\n")
    return "".join(parts)


def replace_paragraph_text(paragraph: ET.Element, text: str, code: bool = False) -> None:
    properties = paragraph.find(f"{W}pPr")
    for child in list(paragraph):
        if child is not properties:
            paragraph.remove(child)

    if properties is None:
        properties = ET.Element(f"{W}pPr")
        paragraph.insert(0, properties)

    if code:
        word_wrap = properties.find(f"{W}wordWrap")
        if word_wrap is None:
            word_wrap = ET.SubElement(properties, f"{W}wordWrap")
        word_wrap.set(f"{W}val", "0")

    run = ET.SubElement(paragraph, f"{W}r")
    if code:
        run_properties = ET.SubElement(run, f"{W}rPr")
        fonts = ET.SubElement(run_properties, f"{W}rFonts")
        for key in ("ascii", "hAnsi", "eastAsia"):
            fonts.set(f"{W}{key}", "Noto Sans Mono")
        size = ET.SubElement(run_properties, f"{W}sz")
        size.set(f"{W}val", "15")  # 7.5 pt: readable and safe at print width 88.

    lines = text.rstrip().split("\n")
    for index, line in enumerate(lines):
        if index:
            ET.SubElement(run, f"{W}br")
        text_node = ET.SubElement(run, f"{W}t")
        text_node.set(f"{{{XML_NS}}}space", "preserve")
        text_node.text = line


def normalize_es2021(code: str) -> str:
    replacements = {
        "id.at(-1)": "id[id.length - 1]",
        "st.at(-1)": "st[st.length - 1]",
        "out.at(-1)": "out[out.length - 1]",
    }
    for old, new in replacements.items():
        code = code.replace(old, new)
    # The original DOCX stored this escape sequence as a visual line break,
    # turning a valid string literal into two physical lines.
    code = code.replace("join('\n')", "join('\\n')")
    # Keep the only Hangul string literal visible in the embedded-monospace PDF
    # font without changing its JavaScript value.
    code = code.replace("'수박'", "'\\uC218\\uBC15'")
    return code


def format_code_blocks(blocks: list[str]) -> list[str]:
    process = subprocess.run(
        ["node", str(FORMATTER)],
        input=json.dumps(blocks),
        text=True,
        capture_output=True,
        cwd=ROOT,
        check=False,
    )
    if process.returncode:
        raise RuntimeError(f"Prettier failed:\n{process.stderr}")
    return json.loads(process.stdout)


def update_docx() -> ET.Element:
    with zipfile.ZipFile(DOCX) as source:
        entries = {name: source.read(name) for name in source.namelist()}

    document = ET.fromstring(entries["word/document.xml"])
    styles = ET.fromstring(entries["word/styles.xml"])
    body = document.find(f"{W}body")
    if body is None:
        raise RuntimeError("DOCX has no document body")

    code_paragraphs = [
        paragraph
        for paragraph in body.findall(f"{W}p")
        if paragraph_style(paragraph) == "CodeBlock"
    ]
    if len(code_paragraphs) != 86:
        raise RuntimeError(f"Expected 86 code blocks, found {len(code_paragraphs)}")

    raw_blocks = [normalize_es2021(element_text(p)) for p in code_paragraphs]
    formatted_blocks = format_code_blocks(raw_blocks)
    for paragraph, code in zip(code_paragraphs, formatted_blocks):
        replace_paragraph_text(paragraph, code, code=True)

    title_replacements = {
        "Đề Việt đầy đủ ý • 84 bài JavaScript • Phân tích • Code": (
            "86 bài phân tích • 84 bài Level 1 + 2 bài mô phỏng PCCP • JavaScript"
        ),
        (
            "Phạm vi đối chiếu 03/08/2026: 4 câu số 1 PCCP/mô phỏng và toàn bộ "
            "84 bài Level 1 hỗ trợ JavaScript; mỗi bài có đề diễn giải tiếng Việt, "
            "input/output, ràng buộc, pattern và code; không gồm SQL."
        ): (
            "86 bài phân tích: 84 bài Level 1 hỗ trợ JavaScript + 2 bài mô phỏng "
            "PCCP bổ sung. Mỗi bài có đề diễn giải tiếng Việt, input/output, ràng "
            "buộc, pattern và code; không gồm SQL."
        ),
    }
    replaced = set()
    for paragraph in body.findall(f"{W}p"):
        current = element_text(paragraph, preserve_breaks=False)
        if current in title_replacements:
            replace_paragraph_text(paragraph, title_replacements[current])
            replaced.add(current)
            continue
        for original, replacement in title_replacements.items():
            if current == replacement:
                replaced.add(original)
                break
    if replaced != set(title_replacements):
        missing = set(title_replacements) - replaced
        raise RuntimeError(f"Missing expected cover text: {missing}")

    for style in styles.findall(f"{W}style"):
        if style.get(f"{W}styleId") != "CodeBlock":
            continue
        run_properties = style.find(f"{W}rPr")
        if run_properties is None:
            run_properties = ET.SubElement(style, f"{W}rPr")
        fonts = run_properties.find(f"{W}rFonts")
        if fonts is None:
            fonts = ET.SubElement(run_properties, f"{W}rFonts")
        for key in ("ascii", "hAnsi", "eastAsia"):
            fonts.set(f"{W}{key}", "Noto Sans Mono")
        size = run_properties.find(f"{W}sz")
        if size is None:
            size = ET.SubElement(run_properties, f"{W}sz")
        size.set(f"{W}val", "15")
        break

    entries["word/document.xml"] = ET.tostring(
        document, encoding="utf-8", xml_declaration=True
    )
    entries["word/styles.xml"] = ET.tostring(
        styles, encoding="utf-8", xml_declaration=True
    )

    with tempfile.NamedTemporaryFile(
        dir=DOCX.parent, prefix=".level1-", suffix=".docx", delete=False
    ) as temporary:
        temporary_path = Path(temporary.name)
    try:
        with zipfile.ZipFile(temporary_path, "w", zipfile.ZIP_DEFLATED) as target:
            for name, data in entries.items():
                target.writestr(name, data)
        temporary_path.replace(DOCX)
    finally:
        temporary_path.unlink(missing_ok=True)

    return document


def inline_html(paragraph: ET.Element) -> str:
    output: list[str] = []
    for run in paragraph.findall(f"./{W}r"):
        text = element_text(run)
        if not text:
            continue
        escaped = html.escape(text).replace("\n", "<br>")
        properties = run.find(f"{W}rPr")
        if properties is not None and properties.find(f"{W}b") is not None:
            escaped = f"<strong>{escaped}</strong>"
        if properties is not None and properties.find(f"{W}i") is not None:
            escaped = f"<em>{escaped}</em>"
        output.append(escaped)
    if output:
        return "".join(output)
    return html.escape(element_text(paragraph)).replace("\n", "<br>")


def paragraph_html(paragraph: ET.Element) -> str:
    style = paragraph_style(paragraph)
    text = element_text(paragraph)
    page_break = any(
        node.get(f"{W}type") == "page" for node in paragraph.findall(f".//{W}br")
    )
    before = '<div class="page-break"></div>' if page_break else ""
    if not text.strip():
        return before
    if style == "CodeBlock":
        return before + f"<pre><code>{html.escape(text)}</code></pre>"
    tag = {
        "Title": "h1 class=\"cover-title\"",
        "Subtitle": "p class=\"subtitle\"",
        "Heading1": "h1",
        "Heading2": "h2",
        "Heading3": "h3",
        "Quote": "blockquote",
        "ListBullet": "li",
        "ListNumber": "li class=\"numbered\"",
    }.get(style, "p")
    tag_name = tag.split()[0]
    return before + f"<{tag}>{inline_html(paragraph)}</{tag_name}>"


def table_html(table: ET.Element) -> str:
    rows: list[str] = []
    for row in table.findall(f"./{W}tr"):
        cells: list[str] = []
        for cell in row.findall(f"./{W}tc"):
            content = "".join(paragraph_html(p) for p in cell.findall(f"./{W}p"))
            cells.append(f"<td>{content}</td>")
        rows.append(f"<tr>{''.join(cells)}</tr>")
    return f"<table>{''.join(rows)}</table>"


def build_pdf(document: ET.Element) -> None:
    try:
        from reportlab.lib import colors
        from reportlab.lib.enums import TA_CENTER
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
        from reportlab.lib.units import mm
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        from reportlab.platypus import (
            PageBreak,
            Paragraph,
            Preformatted,
            SimpleDocTemplate,
            Spacer,
            Table,
            TableStyle,
        )
    except ImportError as error:
        raise RuntimeError(
            "Install PDF dependencies first: "
            "python3 -m pip install -r tools/requirements-docs.txt"
        ) from error

    body = document.find(f"{W}body")
    if body is None:
        raise RuntimeError("DOCX has no document body")

    regular_font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    bold_font = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    mono_font = "/usr/share/fonts/truetype/noto/NotoSansMono-Regular.ttf"
    cjk_font = str(ROOT / "assets" / "fonts" / "PCCP-Hangul-Subset.ttf")
    pdfmetrics.registerFont(TTFont("PCCPSans", regular_font))
    pdfmetrics.registerFont(TTFont("PCCPSans-Bold", bold_font))
    pdfmetrics.registerFont(TTFont("PCCPMono", mono_font))
    pdfmetrics.registerFont(TTFont("PCCPCJK", cjk_font))

    base = getSampleStyleSheet()
    styles = {
        "Normal": ParagraphStyle(
            "PCCPNormal",
            parent=base["BodyText"],
            fontName="PCCPSans",
            fontSize=9.2,
            leading=13,
            textColor=colors.HexColor("#172033"),
            spaceAfter=5,
        ),
        "Title": ParagraphStyle(
            "PCCPTitle",
            fontName="PCCPSans-Bold",
            fontSize=25,
            leading=31,
            textColor=colors.HexColor("#0f2f5f"),
            spaceBefore=42 * mm,
            spaceAfter=14,
        ),
        "Subtitle": ParagraphStyle(
            "PCCPSubtitle",
            fontName="PCCPSans",
            fontSize=12,
            leading=17,
            textColor=colors.HexColor("#3b5f8e"),
            spaceAfter=9,
        ),
        "Heading1": ParagraphStyle(
            "PCCPH1",
            fontName="PCCPSans-Bold",
            fontSize=16,
            leading=21,
            textColor=colors.HexColor("#14376b"),
            spaceAfter=7,
            keepWithNext=True,
        ),
        "Heading2": ParagraphStyle(
            "PCCPH2",
            fontName="PCCPSans-Bold",
            fontSize=13,
            leading=17,
            textColor=colors.HexColor("#14376b"),
            spaceBefore=10,
            spaceAfter=5,
            keepWithNext=True,
        ),
        "Heading3": ParagraphStyle(
            "PCCPH3",
            fontName="PCCPSans-Bold",
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#14376b"),
            spaceBefore=6,
            spaceAfter=2,
            keepWithNext=True,
        ),
        "Quote": ParagraphStyle(
            "PCCPQuote",
            parent=base["BodyText"],
            fontName="PCCPSans",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#25456c"),
            backColor=colors.HexColor("#edf4ff"),
            borderColor=colors.HexColor("#2b6cb0"),
            borderWidth=0.6,
            borderPadding=7,
            leftIndent=7,
            rightIndent=7,
            spaceBefore=5,
            spaceAfter=9,
        ),
        "ListBullet": ParagraphStyle(
            "PCCPBullet",
            parent=base["BodyText"],
            fontName="PCCPSans",
            fontSize=9.2,
            leading=13,
            leftIndent=14,
            firstLineIndent=-8,
            spaceAfter=3,
        ),
    }
    code_style = ParagraphStyle(
        "PCCPCode",
        fontName="PCCPMono",
        fontSize=6.7,
        leading=8.8,
        textColor=colors.HexColor("#172033"),
        backColor=colors.HexColor("#f4f7fb"),
        borderColor=colors.HexColor("#d7e0eb"),
        borderWidth=0.5,
        borderPadding=7,
        leftIndent=4,
        rightIndent=4,
        spaceBefore=5,
        spaceAfter=9,
        splitLongWords=False,
    )

    hangul = re.compile(r"([\uac00-\ud7af]+)")

    def pdf_text(text: str) -> str:
        escaped = html.escape(text).replace("\n", "<br/>")
        return hangul.sub(r'<font name="PCCPCJK">\1</font>', escaped)

    def page_breaks(paragraph: ET.Element) -> list[PageBreak]:
        return [PageBreak()] if any(
            node.get(f"{W}type") == "page"
            for node in paragraph.findall(f".//{W}br")
        ) else []

    story = []
    numbered_index = 0
    for child in body:
        if child.tag == f"{W}p":
            story.extend(page_breaks(child))
            text = element_text(child)
            if not text.strip():
                continue
            style_name = paragraph_style(child)
            if style_name == "CodeBlock":
                story.append(Preformatted(text, code_style, maxLineLength=88))
                numbered_index = 0
                continue
            if style_name == "ListNumber":
                numbered_index += 1
                story.append(
                    Paragraph(
                        pdf_text(text),
                        styles["ListBullet"],
                        bulletText=f"{numbered_index}.",
                    )
                )
                continue
            if style_name != "ListNumber":
                numbered_index = 0
            if style_name == "ListBullet":
                story.append(
                    Paragraph(pdf_text(text), styles["ListBullet"], bulletText="•")
                )
                continue
            resolved_style = styles.get(style_name, styles["Normal"])
            story.append(Paragraph(pdf_text(text), resolved_style))
        elif child.tag == f"{W}tbl":
            rows = []
            for row in child.findall(f"./{W}tr"):
                cells = []
                for cell in row.findall(f"./{W}tc"):
                    cell_text = "\n".join(
                        element_text(p) for p in cell.findall(f"./{W}p")
                    )
                    cells.append(Paragraph(pdf_text(cell_text), styles["Normal"]))
                rows.append(cells)
            if rows:
                table = Table(rows, colWidths=None, repeatRows=1)
                table.setStyle(
                    TableStyle(
                        [
                            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
                            ("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 6),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                            ("TOPPADDING", (0, 0), (-1, -1), 5),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                        ]
                    )
                )
                story.extend([table, Spacer(1, 7)])

    def footer(canvas, doc) -> None:
        canvas.saveState()
        canvas.setFont("PCCPSans", 7)
        canvas.setFillColor(colors.HexColor("#64748b"))
        canvas.drawCentredString(A4[0] / 2, 8 * mm, f"PCCP Level 1 • {doc.page}")
        canvas.restoreState()

    pdf = SimpleDocTemplate(
        str(PDF),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=14 * mm,
        bottomMargin=16 * mm,
        title="86 bài phân tích: 84 bài Level 1 + 2 bài mô phỏng PCCP bổ sung",
        author="PCCP learning materials",
    )
    pdf.build(story, onFirstPage=footer, onLaterPages=footer)


def audit(document: ET.Element) -> None:
    blocks = [
        element_text(paragraph)
        for paragraph in document.findall(f".//{W}body/{W}p")
        if paragraph_style(paragraph) == "CodeBlock"
    ]
    if any(".at(" in block for block in blocks):
        raise RuntimeError("Post-ES2021 .at() remains in a code block")
    if any(len(line) > 88 for block in blocks for line in block.splitlines()):
        raise RuntimeError("A formatted code line exceeds the 88-column PDF limit")
    if any("idx[x]+\n+" in block for block in blocks):
        raise RuntimeError("Broken increment token remains")
    for block in blocks:
        check = subprocess.run(
            ["node", "--check"], input=block, text=True, capture_output=True
        )
        if check.returncode:
            raise RuntimeError(f"Invalid JavaScript code block:\n{check.stderr}\n{block}")


def main() -> None:
    document = update_docx()
    audit(document)
    build_pdf(document)
    print(f"Rebuilt {DOCX.name} and {PDF.name} with 86 formatted code blocks.")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:  # Keep CLI failure concise and actionable.
        print(f"error: {error}", file=sys.stderr)
        raise
