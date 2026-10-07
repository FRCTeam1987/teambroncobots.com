# teambroncobots.com

Website for [FRC Team 1987 — The Broncobots](https://teambroncobots.com).

## Architecture

Static site built with [Jekyll](https://jekyllrb.com/) using the [bulma-clean-theme](https://github.com/chrisrhymes/bulma-clean-theme). Content is driven by Markdown pages and YAML data files in `_data/`. Custom layouts and includes live in `_layouts/` and `_includes/`. Styles are written in SASS with Bulma CSS as the base framework.

### Key Dependencies

| Language | Dependency | Purpose |
|----------|-----------|---------|
| Ruby | jekyll (>= 3.9) | Static site generator |
| Ruby | jekyll-feed, jekyll-sitemap, jekyll-seo-tag | Feed, sitemap, SEO |
| Ruby | jekyll-redirect-from | URL redirects |
| Ruby | kramdown-parser-gfm | GitHub-flavored Markdown |
| JS | bulma | CSS framework |

## Development

### Prerequisites

- Ruby 3.1+ with Bundler
- Node.js (managed by Volta: node 24.13.0)

### Quick Start

```powershell
bundle install
npm install
bundle exec jekyll serve --incremental
```

Or the all-in-one npm script (also cleans `_site` and `.jekyll-cache`):

```powershell
npm start
```

### Docker

Development with live-reload:
```powershell
docker compose up dev
```

Production build (Jekyll + nginx):
```powershell
docker compose build jekyll
```

Run the production container with published ports:
```powershell
docker compose up jekyll
```

Site runs on `http://localhost:4000` for dev and `http://localhost:4000` for the production image (`jekyll` service is mapped as `4000:80` in docker-compose).

### Dev Container (VS Code)

Quick one-click Jekyll development with automatic reload in VS Code.

Prerequisites:
- Docker Desktop
- Dev Containers extension for VS Code (`ms-vscode-remote.remote-containers`)

Usage:
1. Open this repository in VS Code.
2. Run `Dev Containers: Reopen in Container` from the Command Palette.
3. Wait for the container build/start to complete.
4. Open `http://localhost:4000` in your browser.

Expected behavior:
- Jekyll starts automatically in the container (same as `docker compose up dev`).
- Changes to Markdown, layouts, includes, and Sass trigger rebuilds automatically.
- Browser refresh is automatic through LiveReload on port `35729`.

### Docker Verification (Same As CI PR Checks)

These are the same checks run in GitHub Actions on pull requests.

Build the `dev` service image:
```powershell
docker compose build dev
```

Build and smoke-test the `jekyll` service image with Playwright:
```powershell
docker compose build jekyll
docker compose up -d jekyll
npm install --no-save playwright
node -e "const { chromium } = require('playwright'); (async () => { const browser = await chromium.launch({ headless: true }); const page = await browser.newPage(); const response = await page.goto('http://localhost:4000', { waitUntil: 'domcontentloaded', timeout: 30000 }); await browser.close(); if (!response || !response.ok()) { process.exit(1); } })();"
docker compose down
```

## Deployment

GitHub Actions builds and deploys automatically:
- **main** branch → teambroncobots.com (GitHub Pages)
- **qa** branch → dev.teambroncobots.com (SFTP)

## Events System

The site uses a Jekyll collection (`events`) to manage upcoming and past team events. Adding an event automatically populates the Events page and the homepage countdown timer.

### Adding an Event

Create a Markdown file in `_events/` with the following front matter:

```yaml
---
title: "Event Name"
start: "2026-01-01T09:00:00"
end: "2026-01-01T17:00:00"
location: "Venue Name"
address: "Full Address"
layout: event
hide_hero: true
---
```

Add body content below the front matter for event-specific details.

### Events Page

The `events.md` page lists all events in three tables: happening now, upcoming, and past. Events are sorted by date.

### Dynamic Countdown

The homepage countdown (`_includes/countdown.html`) is generated dynamically from the `site.events` collection. It selects the next upcoming event or an event happening now and builds the countdown entries automatically — no manual updates needed when dates change.

## Posts (Bronco Bulletin)

The site publishes each issue of "The Broncobots Bulletin" newsletter (PDFs in `BroncoBulletin/`) as its own post. Posts are a regular Jekyll collection (`_posts/`), listed as cards on the [Bronco Bulletin](/allPosts/) nav page, with each post's own page embedding the source PDF.

### Adding a Post (manual steps)

1. **Add the PDF.** Drop the bulletin PDF into `BroncoBulletin/`, keeping its issue number in the filename (e.g. `The Broncobots Bulletin 42.pdf`, or `The Broncobots Bulletin 42 (Special Name).pdf` for a special edition).
2. **Pick a lead photo.** Open the PDF and find its best "hero" photo — usually the photo next to the top headline story (fall back to the "This Week @ The Shop" photo only if the headline doesn't have a real one). Save it as a JPG to `images/Posts/weeklyNewsletter/bulletin-NN.jpg`, where `NN` is the bulletin's issue number (no leading zero — `bulletin-42.jpg`, not `bulletin-042.jpg`).
3. **Create the post file** in `_posts/`, named `YYYY-MM-DD-Post-Title-Slug.markdown`. Use the bulletin's own headline date, not today's date — the slug just needs to be filesystem-safe, it doesn't need to match the title word-for-word.
4. **Fill in the front matter and PDF embed:**

   ```yaml
   ---
   layout: post
   title: "Headline Text From The Bulletin"
   date: YYYY-MM-DD
   categories: weeklyNewsletter
   image: images/Posts/weeklyNewsletter/bulletin-NN.jpg
   ---

   <iframe src="{{ site.baseurl }}/BroncoBulletin/EXACT PDF FILENAME.pdf" width="100%" height="1300em">
       </iframe>
   ```

   - `title` — the bulletin's own headline, typos and all — it's the newsletter's words, not yours to edit.
   - `date` — from the "M/D/YY - ..." line under the headline.
   - `categories` — always `weeklyNewsletter`.
   - `image` — the file from step 2. **Only set this if you have a real photo.** Never point it at a placeholder image or a URL that might go away — a dead placeholder default previously broke every post card on the site at once. If there's genuinely no usable photo, omit the `image:` line entirely; the post will render as a plain title card instead of a broken image.
   - The `<iframe src>` must exactly match the PDF's filename from step 1, including spaces, dashes, and parentheses.

5. **Preview it.** If the dev server is already running, Jekyll should pick up the new file within a few seconds. If the post isn't showing up on `/allPosts/`, Jekyll's incremental build cache can get stuck on that page (it doesn't know `/allPosts/` depends on `_posts/`) — stop the container, delete `_site/` and `.jekyll-metadata` at the repo root, and start it again to force a clean rebuild.

### Using the `bulletin-to-post` skill

If you're working with Claude Code, the [`bulletin-to-post`](.claude/skills/bulletin-to-post/SKILL.md) skill automates steps 2–4 above — it opens the PDF, finds and extracts the lead photo, and writes the post file for you. Just ask it to add a post for a new bulletin PDF, or to "catch up" and find any bulletins that don't have a post yet.

## Project Structure

```
_config.yml          # Jekyll configuration
_data/               # YAML data sources (team info, sponsors, etc.)
_includes/           # Reusable HTML partials
_layouts/            # Page layouts
*.md in root         # Standalone Markdown pages
_events/             # Event pages
_posts/              # Bronco Bulletin posts (see "Posts" section above)
_sass/               # SASS styles (extends Bulma)
assets/              # Static files and images
```

## License

MIT
