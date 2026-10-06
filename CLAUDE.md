# Community missions board

Standalone missions, points, rewards and badges board that replaces Zealot (UserEvidence Advocacy) next to
Gainsight Community. Static site: no build step, no dependencies. Hosted on GitHub Pages and embeddable in an iframe.

## Layout
- `index.html`: the whole app (CSS + JS inline). Member view and admin console.
- `data/config.js`: brand, theme tokens, segments, tiers, rewards, optional `apiBase`.
- `data/missions.js`: starting mission catalog (survey, event, attest, proof types).
- `assets/`: put the approved logo files here (see `assets/README.txt`). They are NOT in the repo.
- `worker/award-worker.js`: optional Cloudflare Worker that awards points in Gainsight. Endpoint paths are marked
  `TODO verify` and must be checked against Gainsight's Customer Communities API docs.
- `tests/smoke_test.py`: Playwright checks for the main flows.

## Run and test
- Open `index.html`, or `python3 -m http.server 8000`.
- Tests: `pip install playwright && playwright install chromium`, then `python3 tests/smoke_test.py` (expects "0 failed").

## Design rules (Momentus Customer Hub)
- Plus Jakarta Sans, navy `#1c1e61`, indigo `#4146e0`, violet `#9B59B6`, page `#e9e5e1`, 16px cards, navy shadow.
- Header gradient `linear-gradient(120deg,#1c1e61,#4146e0 60%,#9B59B6)`. Outlined violet pill filters.
- Logo: only `assets/momentus-logo-reverse-rgb-864px_72ppi.png`. Never redraw, recolor, retype or substitute it.
- No emojis. Missions, rewards and badges use uploaded images; the fallback is a neutral line icon.
- Plain, friendly copy in sentence case. Every notice is shown inline in the sheet and as a toast.

## Data model
Everything hangs off one ledger (one row per submission: member, mission, status pending/awarded/rejected, points,
proof or survey answers). Lifetime points set the tier (never decrease). Spendable balance = lifetime minus redemptions.
Customer and account data stays in Gainsight and the product; the board stores IDs only.

## Current state and next steps
- State is saved in `localStorage` (key `mission-board.v2`), so this is a prototype, not multi-user.
- Next: move the ledger and catalog to a shared database (Supabase/Postgres recommended), add SSO identity
  (email plus Salesforce account ID), store uploaded images in file storage, write completions to Gainsight Timeline,
  and finish `worker/` once the Gainsight API calls are verified.
- Never put secrets in `data/config.js` or any file served to the browser.
