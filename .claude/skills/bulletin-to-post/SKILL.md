---
name: bulletin-to-post
description: Turns a "Bronco Bulletin" newsletter PDF (in BroncoBulletin/) into a matching Jekyll post in _posts/ for teambroncobots.com, including picking and extracting the newsletter's lead photo. Use this whenever the user adds new PDFs to BroncoBulletin/, mentions "bulletin" PDFs needing posts, asks to "catch up" the blog/newsletter archive, or asks to publish/add a specific bulletin issue to the site — even if they don't spell out the exact steps, since the PDF-to-post pipeline (image extraction, front matter, Jekyll rebuild) is easy to get subtly wrong by hand.
---

# Bulletin → Post

Every issue of "The Broncobots Bulletin" (a newsletter PDF the team produces) gets
mirrored on the site as a Jekyll post: a title, a date, a lead photo, and an
`<iframe>` embedding the PDF itself. This skill is the repeatable version of that
pipeline — it was worked out by hand across ~40 bulletins, including a couple of
gotchas that aren't obvious until they bite you (see "Jekyll incremental-build
trap" below).

## Two ways this gets triggered

- **Specific PDF(s)**: the user just added one or more PDFs to `BroncoBulletin/`
  and wants posts for them.
- **Catch-up**: the user isn't sure what's missing. Run:
  ```bash
  python .claude/skills/bulletin-to-post/scripts/bulletin_helper.py find-missing
  ```
  This diffs `BroncoBulletin/*.pdf` against every `<iframe src="...">` already
  in `_posts/`, since post filenames are human slugs of the headline and don't
  correspond to the PDF filename — matching on the embedded PDF path is the
  only reliable check. Process whatever it reports as `missing`.

Do the rest of this workflow **once per PDF** — don't try to batch the visual
judgment calls, but do feel free to fire off all the read-only inspection
commands (render, list-images) for every PDF up front before working through
the picks one at a time.

## Step 1 — Read the issue

Render page 0 (and page 1, only if the headline story visibly continues onto
it) to PNG and look at it:

```bash
python .claude/skills/bulletin-to-post/scripts/bulletin_helper.py render \
  "BroncoBulletin/The Broncobots Bulletin 42.pdf" --out-dir /tmp/bulletin-scratch
```

Then `Read` the resulting PNG. From it you need:
- **The headline title** — the bold red heading of the first story (e.g. "Simulator Showdown!", "1 Down 1 To Go"). Keep it verbatim, typos and all — it's the newsletter's own words, not yours to copy-edit.
- **The date** — the "M/D/YY - ..." line right under the headline.
- **The issue number** — parse it out of the PDF's own filename (e.g. `...Bulletin 39 (Heartland Special).pdf` → `39`); every bulletin filename has one `\d+` in it even when it also carries a special-edition name.
- **A mental map of the photo layout** — which photos belong to the headline story vs. the generic "This Week @ The Shop" section below it, and whether any image slot is rendering as a blank gray box (PyMuPDF renders a missing/broken embed that way — treat that story as photo-less).

## Step 2 — List the embedded images

```bash
python .claude/skills/bulletin-to-post/scripts/bulletin_helper.py list-images \
  "BroncoBulletin/The Broncobots Bulletin 42.pdf" --page 0
```

This returns each image's `xref`, pixel size, byte size, and placement `rect`
(top-left origin, so **a smaller `y0` means the image sits higher/earlier on
the page** — the list is already sorted that way for you), plus a
`probable_banner` guess for the recurring "The Broncobots Bulletin." header
strip that shows up on every issue.

## Step 3 — Pick the lead photo

Apply this in order, but treat it as *guidance for where to look first*, not a
formula — the only way to be sure is to actually look at the candidate (Step
4) before committing to it:

1. **Skip the header banner** (`probable_banner: true`, or just visibly the
   red "The Broncobots Bulletin." strip).
2. **Prefer the headline story's photo(s)** over the shop section's — the
   headline is what the post is about. Fall back to the shop section (or
   whichever section has a real photo) only when the headline's image slot is
   a blank/broken placeholder, or when it's not a candid photo at all (a QR
   flyer, a plain logo, etc. — see next point).
3. **Prefer a candid photo over a promotional graphic**, and always over a
   screenshot that exposes people's names (a Zoom/Meet grid, for instance) —
   privacy matters more than resolution here. A designed graphic is fine to
   use *only* when it's clearly the intended hero image for the story and
   there's no real photo alternative (e.g. an announcement collage).
4. **Among several candid photos in the same section**, a group/team photo
   generally beats a single-person shot when both are reasonably prominent;
   otherwise go with the topmost one (smallest `y0`). But this is a tiebreak,
   not a rule — if a lower photo is obviously the better representative shot,
   use your eyes and pick that one.

## Step 4 — Look before you commit

Extract your top 1-2 candidates and `Read` them as images before finalizing —
sizes and positions only get you close; you still need to eyeball the actual
photo (is it in focus, does it actually show what the caption claims, is
anyone's face turned away, etc.):

```bash
python .claude/skills/bulletin-to-post/scripts/bulletin_helper.py extract-image \
  "BroncoBulletin/The Broncobots Bulletin 42.pdf" 14 --out /tmp/bulletin-scratch/candidate14.png
```

## Step 5 — Save the chosen image

Once you've picked one, save it straight to the site's image folder as a JPEG
named after the issue number (no zero-padding: `bulletin-9.jpg`, not
`bulletin-09.jpg`):

```bash
python .claude/skills/bulletin-to-post/scripts/bulletin_helper.py save-jpeg \
  "BroncoBulletin/The Broncobots Bulletin 42.pdf" 14 \
  images/Posts/weeklyNewsletter/bulletin-42.jpg
```

## Step 6 — Write the post

Create `_posts/YYYY-MM-DD-Title-Slug.markdown` (date from the headline's date
line; slug is just a filesystem-safe version of the title — it doesn't need to
match the title verbatim, e.g. a title of "1 Down 1 To Go" became the filename
`2025-03-22-One-Down-One-To-Go.markdown`). Use this exact front matter shape —
it's what every post in `_posts/` already follows:

```markdown
---
layout: post
title: "Headline Text From Bulletin"
date: YYYY-MM-DD
categories: weeklyNewsletter
image: images/Posts/weeklyNewsletter/bulletin-42.jpg
---

<iframe src="{{ site.baseurl }}/BroncoBulletin/The Broncobots Bulletin 42.pdf" width="100%" height="1300em">
    </iframe>
```

The `<iframe src>` must be the PDF's **exact** filename (including any spaces,
parens, or `- Special Edition` suffix) — that's also what `find-missing` keys
off of for future catch-up runs.

Don't add a `hero_image` field — that was only ever set on 2023/2024 posts
tied to now-unmaintained `top2023.png`/`top2024.png` banners; every 2025+ post
omits it and that's the current convention. And never invent a placeholder
`image` value if you couldn't find a usable photo — omitting the field
entirely is correct and `post-card.html`'s `{% if post.image %}` check already
handles it gracefully (this behavior was added specifically because a fake
placeholder URL there once broke every image on the "All Posts" page).

## Step 7 — Jekyll incremental-build trap (don't skip this)

If the local dev server is running (`docker compose -f docker-compose.yml ps`
shows the `dev` service up), **new posts will not show up** on `/allPosts/` —
or anywhere else that loops over `site.posts` — even after a normal restart.

Why: `docker-compose.yml` runs Jekyll with `--incremental`, and Jekyll's
incremental cache (`.jekyll-metadata`, persisted across restarts) has no idea
that `allPosts.md` depends on the contents of `_posts/`, since that dependency
only exists via a `site.posts` loop, not a Liquid include. So it just never
rebuilds that page. The fix is to force a clean rebuild once, after all new
posts/images for this batch are in place:

```bash
docker compose -f docker-compose.yml exec dev sh -c "rm -f /site/.jekyll-metadata && rm -rf /site/_site"
docker compose -f docker-compose.yml restart dev
sleep 15
```

Then verify before declaring victory — don't just trust that it worked:

```bash
curl -s http://localhost:4000/allPosts/ | grep -o 'bulletin-42\.jpg'
```

If that prints nothing, something's still stale — check
`docker compose -f docker-compose.yml logs --tail 30 dev` for build errors
before assuming the cache-clear didn't take.

If the dev server isn't running, skip this step — a fresh `docker compose up`
later will build cleanly on its own.

## Requirements

`pymupdf` (`fitz`) and `Pillow`. If `import fitz` fails:

```bash
python -m pip install --quiet pymupdf
```

(Pillow is normally already available; install it the same way if not.)
