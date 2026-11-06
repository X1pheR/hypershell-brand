#!/usr/bin/env python3
"""Externalize generated Storybook HTML bootstrap code for a strict same-origin CSP.

Only disposable storybook-static output changes. Official components, theme tokens
and the site's CSP header remain untouched. Run after each Storybook build.
"""
from __future__ import annotations

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "storybook-static"
TAG_RE = re.compile(r"<(script|style)\b([^>]*)>([\s\S]*?)</\1>", re.I)


def patch(name: str) -> tuple[int, int]:
    target = ROOT / name
    html = target.read_text(encoding="utf-8")
    bundle = ROOT / "_csp-bootstrap"
    bundle.mkdir(exist_ok=True)
    counters = {"script": 0, "style": 0}

    def replace(match: re.Match[str]) -> str:
        kind = match.group(1).lower()
        attrs = match.group(2)
        body = match.group(3)
        if not body.strip():
            return match.group(0)
        if kind == "script" and re.search(r"\bsrc\s*=", attrs, re.I):
            return match.group(0)

        counters[kind] += 1
        ext = "js" if kind == "script" else "css"
        if kind == "script" and 'type="module"' in attrs:
            body = body.replace("import './", "import '../").replace('import "./', 'import "../')
        if kind == "style":
            body = body.replace("url('./", "url('../")
            body = body.replace('url("./', 'url("../')
            body = body.replace("url(./", "url(../")

        digest = hashlib.sha256(body.encode("utf-8")).hexdigest()[:12]
        out = f"{name.removesuffix('.html')}-{kind}-{counters[kind]}-{digest}.{ext}"
        (bundle / out).write_text(body + "\n", encoding="utf-8")
        if kind == "style":
            return f'<link rel="stylesheet" href="./_csp-bootstrap/{out}" />'
        return f'<script{attrs} src="./_csp-bootstrap/{out}"></script>'

    target.write_text(TAG_RE.sub(replace, html), encoding="utf-8")
    return counters["script"], counters["style"]


if __name__ == "__main__":
    for filename in ("index.html", "iframe.html"):
        js_count, css_count = patch(filename)
        print(f"{filename}: extracted {js_count} scripts and {css_count} styles")
