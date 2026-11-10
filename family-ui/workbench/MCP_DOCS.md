# Native UI read-only Storybook MCP — implementation and activation boundary

**Status:** official docs protocol and private bearer guard verified; **NOT deployed** as an agent-accessible service.

## Official native source

The exact official `@storybook/mcp@10.6.6` library handles the MCP protocol; we do not implement or fork the `docs-list`, `docs-show`, or `docs-show-story` tools. It reads the already generated `storybook-static/manifests/components.json`, with optional `docs.json`. Those manifests come from the same Storybook build whose 63 component families, 63 Docs pages and 134 stories are checked by CI. Component sources and the native base-nova theme remain untouched.

The small `scripts/serve_mcp_docs.mjs` HTTP adapter provides only deployment necessities:
- **Loopback bind only** (`127.0.0.1`), configurable port (default 6090). Never add public `0.0.0.0` binding.
- **Mandatory** `STORYBOOK_MCP_TOKEN_FILE` containing a private >=32-character bearer secret; fails closed if missing, invalid or unreadable. No token in source, URL or command line.
- All `/mcp` requests require bearer authentication; other paths 404, unsupported methods 405. Request rate-limits, network segmentation, bearer rotation and service identity are responsibilities of the canonical deployment owner.
- Only the **official** `@storybook/mcp` docs handler; no writable development or test tools, no generated shell runner.
- `STORYBOOK_MCP_MANIFEST_DIR` selects the read-only source path. Requests are allowlisted to `components.json` and optional `docs.json`; no arbitrary file reads.

## Evidence / automated tests

Run `pnpm run check:mcp-docs` to exercise MCP initialize, list exactly three tools, retrieve native component index (63 families), and read Button docs. Run `pnpm run check:mcp-auth` to spawn an ephemeral **loopback-only** service with a one-time private token; validate 401 unauthenticated, 404 elsewhere, authenticated initialize/tool list/native docs. The ephemeral service is stopped after the test and the temporary token is deleted. Both checks run in the normal GitHub CI pipeline.

## Activation to Hypershell agents — intentionally pending

1. Register a dedicated, least-privilege **MCP docs service identity and bearer secret** in the existing Hypershell BSM/SDM owner; store the secret as a file readable only by the service. Do not put it in Git, Docker environment variables, or public Caddy configuration.
2. Package the *official* service using the pinned Node 24 package/lockfile, read-only manifest mount and loopback/network-namespace isolation. Do **not** expose it through the existing `ui-workbench.oci.hypershell.eu` host: human Pocket ID browser sessions do not automatically provide an agent identity.
3. Use the established Hypershell Reach/agent connector owner to authenticate access to the docs-only service. Require agent identity, authorization, per-request logging/traceability and secret rotation. Never silently enable `dev`/`test` toolsets or create a general-purpose network MCP adapter.
4. Validate from the actual agent: `tools/list` returns only `docs-list`, `docs-show`, `docs-show-story`; `docs-list` enumerates 63 families; `docs-show` returns native Button/API docs; anonymous and wrong-identity requests are rejected. Capture Reach Run IDs and verify host boundaries before acceptance.

**No external service, token or endpoint has been activated by the source-only and loopback tests.**
