# Community missions

A standalone missions, points and rewards board. It covers what a community platform's built-in
gamification usually lacks: mission catalog, proof submission, an approval queue, per-mission
limits and caps, end dates, audience targeting, tiers, a rewards catalog and a ledger.

No build step and no dependencies: static HTML, CSS and JavaScript.

```
index.html          the app (member view + admin console)
data/config.js      brand, colors, segments, tiers, rewards, optional apiBase
data/missions.js    the mission catalog (edit this to change what members see)
worker/             optional Cloudflare Worker that awards points in Gainsight
```

## What's in the admin console

- **Overview:** what needs attention (submissions to review, reward requests, missions ending soon,
  drafts), 30-day totals and the most completed missions.
- **Missions:** a lean table (mission, audience, completed, ends, status) with search, an active/draft
  switch, a submissions page and a row menu (Edit, Duplicate, Copy mission link, Pin, Delete).
- **New mission:** pick a template (Survey, Confirm a task, Submit a link, Submit a review, Automatic) or
  copy an existing mission, then fill in one page. A live "What members see" preview updates as you type.
  The survey builder supports required questions, reordering and conditional logic.
- **Approvals:** select several and approve in one click. Declining asks for a reason inline.
- **Submissions per mission:** Content tab (each member's answers) and Data tab (completed vs not completed),
  plus Export CSV.
- **Incentives:** Rewards (stats, table, create/edit with live preview, pending approvals), Badges (earn by
  mission, points total, level, or by hand; public or private) and Levels (editable thresholds).
- **Deep links:** `?mission=ID` opens a mission; "Copy mission link" builds it.

Members see an **Up next** strip (the three best missions to do now, plus progress to the next reward),
reward cards, and earned or available badges. Starting data comes from `data/config.js` and
`data/missions.js`; admin edits are saved in the browser until you use **Reset demo data**.

## Run it

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

Use the bar at the top to switch between **Member view** and **Admin view** and to pick which
segments the demo member belongs to. Submit a proof-based mission as the member, then approve it
in the admin console.

## Share it as a link (GitHub Pages)

1. Create a repo (for example `community-missions`) and push these files to `main`.
2. In the repo go to **Settings > Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the board is live at `https://YOUR-USER.github.io/community-missions/`.

## Embed it

```html
<iframe src="https://YOUR-USER.github.io/community-missions/?embed=1&segments=Enterprise,Elite"
        title="Community missions" style="width:100%;border:0;min-height:720px" loading="lazy"></iframe>
```

Query parameters:

| Parameter | Effect |
|---|---|
| `embed=1` | Member view only, no demo bar |
| `segments=A,B` | Which segments the member belongs to (controls which missions show) |
| `name=Jordan` | Display name for the member |

To auto-size the frame, add this to the host page. The board posts its height:

```html
<script>
addEventListener("message", e => {
  if (e.data && e.data.source === "mission-board" && e.data.type === "resize")
    document.querySelector("iframe").style.height = e.data.height + "px";
});
</script>
```

The board also posts `submission.created`, `award.granted`, `submission.approved`,
`submission.rejected` and `redemption.*` events to the parent page, so the host can react to them.

## Customize

- **Missions:** edit `data/missions.js`, or use the admin console (New / Edit / Duplicate), then
  **Export JSON** and paste the result into `data/missions.js` to make the change permanent.
  The point values, limits and caps shipped in the file are placeholders.
- **Brand and rules:** edit `data/config.js` (colors, tiers, rewards, segments).
- **Mission types:** `survey` (questions, optional review), `event` completes from a system signal,
  `attest` is member-confirmed (optionally reviewed), `proof` requires a link or text and is always reviewed.

## Images (no emojis)

Missions, rewards and badges use uploaded images instead of emojis. In the admin console:

- **Missions:** New or Edit mission, "Mission image". It shows as the tile on the mission list and as the
  banner at the top of the mission.
- **Rewards:** Incentives, Rewards, Create or Edit reward, "Reward image" (shown on the reward card).
- **Badges:** Incentives, Badges, Create or Edit badge, "Badge image" (shown in a circle, so square images work best).

Pick a file or drag one onto the upload box. PNG, JPG, WebP, GIF and SVG are accepted. The browser resizes
each image to at most 640 px and saves it as WebP, usually 20 to 150 KB. Anything without an image shows a
neutral line icon on the category color.

You can also point at images that live in the repo: add `image: "assets/missions/forums.png"` to a mission
in `data/missions.js`, or `image` on a reward in `data/config.js`.

**In this demo, uploaded images are saved in the browser** (about 5 MB total), and the Settings tab shows
how much is used. In the server-backed version, images go to file storage (for example Supabase Storage) and
only the image URL is saved with the record, so there is no size limit to worry about.

## Branding (matches the Customer Hub)

The board uses the Customer Hub design tokens: Plus Jakarta Sans, navy `#1c1e61`, indigo `#4146e0`,
violet `#9B59B6`, warm page background `#e9e5e1`, a navy to indigo to violet header, 16px cards with
the navy shadow, gradient emoji tiles, and outlined violet pill filters.

- Tokens live in `data/config.js` under `theme`. Tile emoji and gradients live under `categories`.
- **Logo:** copy the approved reverse logo into `assets/` as `momentus-logo-reverse-rgb-864px_72ppi.png`
  (the optional star as `momentus_star_watermark.png`). They are not included in this repo.
  Because the board is served from the same host, the relative path works. Hosted absolute URLs are only
  needed for email.
- Set `brand.hubUrl` to add a "Back to the Customer Hub" link in the footer.
- Embeds (`?embed=1`) hide the demo bar and footer and use a transparent page background so the card
  sits inside the host page.

## Data model

Everything hangs off one **ledger**. One row per submission: member, mission, status
(`pending`, `awarded`, `rejected`), points, proof or survey answers, reason, timestamps. Caps, per-member limits,
tiers, the leaderboard and reporting are all calculated from it.

- **Lifetime points** set the tier and never go down.
- **Spendable balance** is lifetime points minus redemptions. Spending never lowers a tier.

## Important: what this static version is, and isn't

This build keeps data in the visitor's browser (`localStorage`). That makes it a working prototype
and a good internal demo, but not a multi-user system:

- Each browser has its own data. Members don't see each other's activity.
- Anyone could edit points in their own browser, so it can't be the source of truth.
- A static site can't hold API credentials, so it can't call Gainsight directly.

To run it for real, move the ledger and the award decisions server-side:

1. **Store** the ledger and mission catalog in a database or table you control (Airtable, Notion,
   Postgres, Snowflake).
2. **Authenticate** members (SSO, or a signed token in the embed URL) so `memberId` comes from your
   identity provider, not the query string.
3. **Award on the server.** Set `apiBase` in `data/config.js`. The board POSTs events to
   `${apiBase}/events`. `worker/award-worker.js` shows the shape: it checks a token, dedupes by
   ledger entry id, and calls Gainsight to assign points and award badges.
4. **Verify the Gainsight calls.** The worker's endpoint paths, auth URL and payloads are marked
   `TODO verify`. Check them against Gainsight's Customer Communities API documentation, and map
   your member ids to Gainsight user ids.
5. **Automate event missions.** Send Learning Center, Pendo or community webhook events to the same
   service, which writes ledger rows for the `event` missions.

Because the award runs on the server, a retry or duplicate click can't double-award.

## Roadmap ideas

Bulk approve, per-mission badge ids, email notifications on approval/decline, reward budget
tracking (dollar value per reward), and a second ledger view per member for support.
