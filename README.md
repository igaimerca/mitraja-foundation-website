# Mitraja Foundation — Website

Static site for Mitraja Foundation (Sidhabari, Dudhnoi, Goalpara, Assam). Plain HTML/CSS/JS, no build step — deploys straight to GitHub Pages.

## Status

This is a first working build, done without live access to the client's Drive folders (Instagram reference photos, NGO Documentation, "Other material"). Content and structure are drawn from:
- The current site, https://www.mitraja.org/
- The two Summer Camp 2026 docs (Reflections + Completion Report)
- The Manal Foundation reference (separate Story / Governance tabs, per client preference)

**Photos are placeholder color blocks, not stock images** — styled to hold the layout and be swapped for real photography in one step (see "Adding real photos" below). Nothing fake is presented as a real photo.

## Structure

```
index.html            Home
our-story/             Mission, vision, values (+ color-theory explanation), origin timeline
what-we-do/            Apollo Program, APOLLO framework, Apollo Library, Crochet & Knitting
programs/               Summer Camp 2026 showcase (day-by-day) + live "Recent Activities" feed
governance/             Legal structure (Section 8 Company) + team bios
get-involved/           Ways to help + contact form
contact/                Direct contact info + form
css/style.css           Design system: fonts, colors, components
js/main.js              Nav, scroll reveals, counters, back-to-top
js/activities.js        Loads programs/ "Recent Activities" grid from a Google Sheet (see below)
data/activities.sample.csv   Fallback content so the feed is never empty
```

## Design system

- **Fonts:** Bricolage Grotesque (headings) + Inter (body), loaded from Google Fonts — per the client's reference sites.
- **Colors, mapped to values** (explained in full on `our-story/#values`):
  - Marigold `#E88A2E` → *Mitra*, friendship — used for every "join us" moment
  - Terracotta `#B4502A` → rootedness — Goalparia clay, pottery
  - Deep Moss `#1F4D3E` → growth, green skills, sustainability
  - Indigo Ink `#202B45` → trust, leadership, the library
  - Paper Cream `#FBF5EA` → openness, breathing room

## The "client edits, site updates" system

A freeform Google **Doc** can't be parsed reliably — no structure, and formatting varies every time someone edits it. Instead, `programs/#recent-work` reads a Google **Sheet**, published to the web as CSV. This is the standard reliable pattern for "client updates content, static site reflects it, no rebuild" — flagging this since the brief said "Google Document" and we implemented it as a Sheet for reliability.

**One-time setup for the Mitraja team:**
1. Create a Google Sheet with exactly these column headers in row 1:
   `Date, Title, Category, Description, ImageURL, Location, Participants, FeedType`
   - `Date`: e.g. `2026-08-10`
   - `Category`: Art / Health & Hygiene / Library / Pottery / Green Skills / Sports / Community / Livelihood (used for the filter chips)
   - `ImageURL`: a public image link (e.g. an image uploaded to the repo, or a public Drive/Imgur link) — leave blank to show a styled placeholder instead of a broken image
   - `FeedType`: `Camp` or `Update` (not yet used to split views, reserved for a future "past vs. recent" split)
2. **File → Share → Publish to web** → choose the sheet tab → format **CSV** → Publish.
3. Copy that URL and paste it into `SHEET_CSV_URL` at the top of `js/activities.js`.
4. Commit and push — from then on, editing the Sheet is enough. No code change, no redeploy needed.

Until step 3 is done, the page automatically falls back to `data/activities.sample.csv` (already filled with the Summer Camp 2026 days) so the page is never empty.

## Adding real photos

Photo slots are `<div class="photo-block pb-N">` elements with an emoji + label. To swap one for a real photo:
```html
<!-- before -->
<div class="photo-block pb-1" style="aspect-ratio:4/3;"><span class="ph-emoji">🚀</span><span class="ph-label">Apollo Club, Sidhabari</span></div>

<!-- after -->
<div class="photo-block" style="aspect-ratio:4/3;"><img src="../assets/images/apollo-club.jpg" alt="Apollo Club session in Sidhabari"></div>
```
Drop images into `assets/images/`. Once the Drive folders are accessible (Instagram reference set, Documentation, Photos, and the "Other material" folder shared via contact.techpose@gmail.com), the next pass will replace these directly.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `mitraja-foundation/website`).
2. Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
3. If using a custom domain (e.g. `mitraja.org`), add a `CNAME` file with the domain, and point the domain's DNS at GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. `.nojekyll` is already included so GitHub doesn't try to run Jekyll on it.

## Still needed from the client

- Real photography for Summer Camp days, Apollo Library, Apollo Program and the Crochet & Knitting workshop (Instagram reference folder + Photos folder, once Drive access is authorized on our side, or exported locally as with the Documentation folder).
- The Google Sheet, published per the steps above, to go from sample to live activities.
- Confirmation of the "Other material" folder contents once shared via contact.techpose@gmail.com.
