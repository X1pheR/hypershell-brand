#!/usr/bin/env python3
"""Guard temporary, per-story native upstream A11y debt without disabling new-story tests."""
from __future__ import annotations
import datetime as dt
import json
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
baseline = json.loads((root / "scripts/a11y-baseline.json").read_text(encoding="utf-8"))
errors: list[str] = []
entries = baseline["exceptions"]
expected = {(row["file"], row["story"]) for row in entries}
if len(expected) != len(entries):
    errors.append("Duplicate baseline entries")
review = dt.date.fromisoformat(baseline["review_by"])
if dt.datetime.now(dt.timezone.utc).date() > review:
    errors.append("A11y native baseline overdue: re-audit upstream references and amend review_by with evidence")
if len(entries) > 12:
    errors.append("Native baseline expanded beyond initially approved 12 affected stories")
if "test: \"error\"" not in (root / ".storybook/preview.ts").read_text():
    errors.append("Global A11y strict/error default missing")
observed: set[tuple[str, str]] = set()
for src in (root / "src/stories").rglob("*.stories.tsx"):
    txt = src.read_text(encoding="utf-8")
    rel = str(src.relative_to(root / "src/stories"))
    if re.search(r"a11y\s*:\s*\{\s*test\s*:\s*['\"]off['\"]", txt):
        errors.append(f"A11y testing turned off: {rel}")
    for name in re.findall(r"export const\s+(\w+)\s*:\s*Story\s*=\s*\{\s*parameters\s*:\s*\{\s*a11y\s*:\s*\{\s*test\s*:\s*['\"]todo['\"]", txt):
        observed.add((rel,name))
if missing := expected - observed:
    errors.append("Missing approved TODO cases: " + repr(sorted(missing)))
if extra := observed - expected:
    errors.append("Unapproved TODO cases: " + repr(sorted(extra)))
for row in entries:
    if row["rule"] != "color-contrast" or row["measured_ratio"] >= row["expected_ratio"]:
        errors.append("Baseline exception lacks a measured sub-threshold contrast violation: " + repr(row))
if errors:
    print("\n".join("ERROR " + s for s in errors), file=sys.stderr)
    sys.exit(1)
print(f"PASS: {len(observed)} traceable upstream-fidelity A11y TODOs, global axe default ERROR, no disabled tests. Review by {review}.")
for row in entries:
    print(f"BASELINE {row['file']}::{row['story']} {row['measured_ratio']}:1 < {row['expected_ratio']}:1 — {row['reason']}")
