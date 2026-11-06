#!/usr/bin/env python3
"""Verify every native shadcn module has a Storybook family, documentation and variants.

Uses source filenames plus the compiled Storybook index, so a file alone cannot
silently satisfy the gallery contract when Storybook omits or fails to index it.
"""
from __future__ import annotations

import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sources = sorted((ROOT / "src/components/ui").glob("*.tsx"))
stories = sorted((ROOT / "src/stories/catalog").glob("*.stories.tsx"))
source_names = {p.stem for p in sources}
story_names = {p.name.removesuffix(".stories.tsx") for p in stories}
errors: list[str] = []
if len(sources) != 63:
    errors.append(f"Registry drift: expected 63 native modules, found {len(sources)}; review upstream changes before updating coverage.")
if missing := source_names - story_names:
    errors.append(f"Missing catalog families: {', '.join(sorted(missing))}")
if extra := story_names - source_names:
    errors.append(f"Orphaned catalog families: {', '.join(sorted(extra))}")

index_path = ROOT / "storybook-static/index.json"
manifest_path = ROOT / "storybook-static/manifests/components.json"
if not index_path.is_file():
    errors.append("Missing compiled Storybook index; run the Storybook build first.")
else:
    entries = json.loads(index_path.read_text(encoding="utf-8"))["entries"]
    catalog = [e for e in entries.values() if e.get("title", "").startswith("Catalog/")]
    titles = {e["title"] for e in catalog}
    docs = {e["title"] for e in catalog if e.get("type") == "docs"}
    counts = {title: sum(e.get("type") == "story" and e["title"] == title for e in catalog) for title in titles}
    if len(titles) != len(source_names):
        errors.append(f"Indexed catalog families {len(titles)} != native modules {len(source_names)}")
    if absent_docs := titles - docs:
        errors.append("Missing generated Docs pages: " + ", ".join(sorted(absent_docs)))
    if short := {k: v for k, v in counts.items() if v < 2}:
        errors.append("Expected at least 2 renderable examples per family: " + str(short))
    print(f"Storybook catalog: {len(titles)} families; {len(docs)} docs; {sum(counts.values())} renderable examples.")
if not manifest_path.is_file() or manifest_path.stat().st_size < 100:
    errors.append("Missing/nonfunctional Storybook AI component manifest.")
if errors:
    for error in errors:
        print("ERROR:", error, file=sys.stderr)
    raise SystemExit(1)
print(f"PASS: {len(source_names)} native modules each have dedicated, documented, multi-variant Storybook coverage and AI manifest.")
