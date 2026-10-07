# ChatGPT App Icon Family

## Status

Accepted identity specification. Individual specialist media remain candidates until human visual acceptance.

## Authority

- `../assets/masterbrand/hypershell-masterbrand.png` — canonical Hypershell H-core masterbrand and outer-family geometry authority.
- `hypershell-tri-spike-exploration.png` — Tri-Spike Arc geometry reference.
- `hypershell-visual-identity.png` — palette authority.
- Hypershell vault `_meta/operating-models/web-ui/DESIGN.md` — canonical family identity and visual-governance owner.

## Shared family contract

All five ChatGPT app icons use one recognizable Hypershell family system:

- preserve the accepted open Tri-Spike Arc outer form exactly;
- preserve the masterbrand proportions, ring geometry, spike positions, spacing and orientation;
- preserve the positional spike accents: top pink, lower-left violet, lower-right cyan;
- preserve the established blue/violet/pink/cyan brand treatment;
- use a transparent square canvas with no text, badge, panel or background;
- keep the center symbol compact, light-neutral and readable at very small UI sizes;
- do not create separate per-domain color schemes; domain identity comes from the center symbol;
- do not reuse an already-owned family motif when that would blur product identity.

## Canonical app identities

| ChatGPT app | Center symbol | Rationale |
|---|---|---|
| `Hypershell General` | Canonical capital `H` | Primary/general Hypershell entry point; uses the parent H-core masterbrand unchanged. |
| `Hypershell Infrastructure` | Compact server/rack | Hosts, containers, networking, cloud and platform operations. Avoid the connected-node motif because it is already owned by HomeSight. |
| `Hypershell Personal` | Minimal person/user | Broad personal and household workflows without reducing the domain to only smart-home/home imagery. |
| `Hypershell Development` | Compact `</>` code brackets | Clear small-size signal for coding, repositories, CI/CD, browser automation and development tooling. |
| `Hypershell Health` | Compact pulse/ECG | Clear health/medical identity without relying on a red-cross symbol or a separate semantic-health color palette. |

## ChatGPT delivery profile

- Preferred format: transparent PNG.
- Preferred working output: 256 × 256 px when the 10 KB limit can be met without visible degradation; otherwise use the largest square size that remains visually clean and below 10 KB.
- Maximum upload size: 10 KB for the current ChatGPT custom-app icon field.
- Preserve transparent anti-aliased edges and sufficient clear padding around the mark.
- Compression/quantization is a delivery optimization only and must not redesign the accepted mark.

## Candidate and promotion lifecycle

1. Produce candidates outside the production `assets/` tree.
2. Review them together at actual small-icon scale, not only enlarged.
3. Human-accept the geometry, center-symbol readability and family consistency.
4. Promote only accepted media into `assets/products/chatgpt-apps/`.
5. Store each accepted PNG next to a Markdown sidecar containing its source, derivation/prompt, delivery dimensions and compression notes.
6. The accepted PNG remains the visual authority; sidecars document provenance and reproduction intent only.

## Intended accepted filenames

```text
assets/products/chatgpt-apps/
├── hypershell-general.png
├── hypershell-general.md
├── hypershell-infrastructure.png
├── hypershell-infrastructure.md
├── hypershell-personal.png
├── hypershell-personal.md
├── hypershell-development.png
├── hypershell-development.md
├── hypershell-health.png
└── hypershell-health.md
```
