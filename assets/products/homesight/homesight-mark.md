# HomeSight Product Mark

## Status

Accepted canonical product mark.

## Inputs

- Canonical Family Template: `../../masterbrand/hypershell-family-template.png`
- Family Template SHA-256: `292ee5d1dcdd0b7dd4e190d0c25bd71a6dbc73f2c69e86775da2e32396138cc1`
- Accepted center mark: `homesight-center-mark.png`

## Original composition provenance

The accepted product mark was produced deterministically from the accepted corrected Family Template and the accepted HomeSight center mark.

The exact human-reviewed candidate `homesight-mark-review-v4.png` was promoted without further visual modification.

Review v4 was derived from review v3 by enlarging the exact v3 center-change region by 50% while keeping it optically centered over the unchanged Family Template.

- v3 changed-pixel bbox: `[462,510,805,829]`
- v3 changed-pixel size: `343×319`
- v4 scaled size: `514×478`
- v4 placement origin: `[376,430]`

## 2026-10-07 Family Template noise repair

The previously accepted HomeSight raster inherited detached alpha-noise pixels from the former Family Template.

The accepted repair candidate removed only pixels that were proven byte-for-byte identical to detached noise pixels in that former Family Template.

- previous HomeSight SHA-256: `553318c2075d89ad07168e9c1610dcf0607e85ed78e7000e2176be6ae36b83ee`
- repaired HomeSight SHA-256: `26b15fd06babefdb4e1f7183f7a0798c22c20291e88ddf0f3607ae9bfa6f88c1`
- proven inherited noise pixels cleared: `6717`
- every other HomeSight pixel remained byte-for-byte unchanged
- the repaired raster was explicitly human-reviewed and accepted before canonical promotion

## Validation

- Canonical SHA-256: `666d3059246597db1db080a3e0e4352b69f241679ea48e87d178d91f34559a9a`
- Canvas: 1254×1254 RGBA
- Accepted Family Template geometry is unchanged.
- The accepted PNG is the production visual authority.

## 2026-10-07 center placement adjustment

After the Family Template noise repair, the center artwork was manually repositioned for improved optical centering and explicitly accepted before public publication.

- previous repaired HomeSight SHA-256: `26b15fd06babefdb4e1f7183f7a0798c22c20291e88ddf0f3607ae9bfa6f88c1`
- adjusted canonical HomeSight SHA-256: `666d3059246597db1db080a3e0e4352b69f241679ea48e87d178d91f34559a9a`
- changed-pixel bbox: `[332,405,910,885]`
- changed pixels: `78483`
- changed Family Template pixels: `0`
- current Family Template pixel mismatches: `0`

The adjustment changes only center-region artwork placement; every visible canonical Family Template pixel remains byte-for-byte identical.

## Center-mark reproduction intent

See `homesight-center-mark.md` for the full accepted center-generation prompt.
