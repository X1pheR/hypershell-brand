# Hypershell Brand Production

This file owns the mandatory operational production sequence for Hypershell family product marks.

Brand identity decisions, shared visual rules, the canonical Family Template and product semantics remain governed by the Hypershell Brand Identity owner:
https://ignis.hypershell.eu/?vault=hypershell&file=_meta%2Foperating-models%2Fweb-ui%2Fvisual%2Fbrand-identity.md

## Scope

Use this workflow for every new or materially revised Hypershell product/service family mark.

Do not skip a review gate. Do not generate, promote or accept a complete family mark before its standalone center mark has been reviewed and accepted.

## Production workflow

### 1. Create the standalone center mark

Create only the product-specific center symbol.

Requirements:

- Follow the center-mark visual language and semantic motif defined by the canonical Brand Identity owner.
- Produce a standalone, transparent, square center-mark candidate.
- Keep the symbol compact, simple and legible at small UI sizes.
- Do not include the Hypershell Tri-Spike Arc, Family Template, masterbrand H or any outer family geometry.
- Keep the candidate outside `assets/` while it is under review.

Stop here for human review.

### 2. Promote the accepted center mark

Only after explicit human acceptance:

1. Promote the exact accepted center-mark PNG into:
   `assets/products/<product>/<product>-center-mark.png`
2. Store its prompt or deterministic derivation/provenance sidecar beside it as:
   `assets/products/<product>/<product>-center-mark.md`
3. Verify that the promoted PNG is byte-identical to the accepted review asset where applicable.
4. Record the accepted asset hash in the sidecar when available.

The PNG is the production authority for the accepted center mark.

### 3. Compose the family-mark review candidate

Only after Step 2 is complete:

1. Use the exact canonical Family Template:
   `assets/masterbrand/hypershell-family-template.png`
2. Place the accepted center mark at the optical center of that template.
3. Allow only deterministic sizing and positioning required to fit the center mark. Do not redesign its internal form.
4. Do not regenerate, redraw, recolor or otherwise alter the accepted Tri-Spike Arc family geometry.
5. Keep the completed family-mark candidate outside `assets/` while it is under review.

Stop here for a second human review.

### 4. Promote the accepted family mark

Only after explicit human acceptance of the composed family mark:

1. Promote the exact accepted family-mark PNG into:
   `assets/products/<product>/<product>-mark.png`
2. Store its composition/derivation sidecar beside it as:
   `assets/products/<product>/<product>-mark.md`
3. Verify the promoted PNG against the accepted review asset.
4. Record the accepted asset hash in the sidecar when available.

The final PNG is the production authority for that product mark.

## Non-negotiable gates

- Center mark review happens before family-mark composition.
- An unaccepted center mark never enters `assets/`.
- An unaccepted family mark never enters `assets/`.
- The canonical Family Template is reused; it is not regenerated for a product.
- Accepted production PNGs are not silently replaced by later prompts or regenerations.
- Candidate/review assets remain outside the production asset tree.
