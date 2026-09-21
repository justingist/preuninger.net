# preuninger.net — source

Plain HTML/CSS/JS for the homepage and projects page; the blog runs on Jekyll (built
into GitHub Pages) so posts are written in Markdown and the post list builds itself.
No separate build step for you to run — GitHub builds it on every push.

## Structure

```
index.html          Home — hero, about, capabilities, experience timeline, certifications, contact
projects.html        Project cards (edit or duplicate the <article class="proj-card"> blocks)
blog/index.html       Blog listing — a Jekyll template, loops over _posts/ automatically
_posts/*.md           Published posts, written in Markdown
_drafts/*.md          Unpublished drafts — invisible on the live site until moved to _posts/
_layouts/post.html    The shared page frame (nav, footer, styling) every post renders inside
css/style.css         All styling (one file, uses CSS custom properties for the palette)
js/main.js            Mobile nav toggle + active-link highlighting
favicon.ico           Browser tab icon, generated from the logo
assets/               Images, the CV PDF, etc.
assets/brand/         Logo assets — see "Brand" below
_config.yml           Site title/description and the /blog/:title/ URL pattern
Gemfile               Pins the same Jekyll version GitHub Pages builds with, for local preview
```

## Brand

The palette and icon are pulled directly from `PREUNINGER_-_P_LOGO_-_BOLD.ai`:

- **Navy `#003764`** — headlines, structure, body text
- **Maroon `#840201`** — the one accent color (links, buttons, the status dot)
- **Warm off-white `#FBF9F4`** — page background

`assets/brand/` holds everything generated from the source file:
- `logo-source.pdf` — the original vector artwork (the `.ai` file is PDF-compatible; open it
  directly in Illustrator, or treat this PDF as the master if you don't have Illustrator handy).
  Excluded from the published site by `_config.yml` — it's a source file, not a web asset.
- `logo-full.png` — the complete mark (the "P" plus both maroon bursts). This is the only
  version used anywhere on the site — nav, footer, and the homepage hero all reference this
  same file at different sizes. The logo is never cropped down to the glyph alone.
- `icon-*.png` and `favicon.ico` — the full mark padded onto a square canvas, at the standard
  favicon sizes

If you update the logo, re-export `logo-full.png` from the `.ai` file (trimmed to its bounding
box) and regenerate the favicon sizes the same way — pad onto a square canvas, don't crop.

## Deploy to GitHub Pages

1. Create a new repo, e.g. `github.com/<you>/preuninger.net`.
2. Push this folder's contents to the `main` branch (no `docs/` subfolder needed).
3. In the repo, go to **Settings → Pages**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. GitHub detects the Jekyll site and builds it automatically — nothing to run yourself.
   Your site will be live at `https://<you>.github.io/preuninger.net/` within a minute or two.

## Using your own domain (preuninger.net)

1. Add a file named `CNAME` at the repo root containing just:
   ```
   preuninger.net
   ```
2. At your domain registrar, point `preuninger.net` at GitHub Pages:
   - `A` records for the apex domain to GitHub's IPs (185.199.108.153, .109.153, .110.153, .111.153), or
   - a `CNAME` record for `www` to `<you>.github.io`.
3. Back in **Settings → Pages**, enter `preuninger.net` as the custom domain and enable
   **Enforce HTTPS** once it's verified.

## Writing a new blog post

1. Add a file to `_posts/` named `YYYY-MM-DD-your-slug.md` — the date sets the publish date
   and sort order; the slug just needs to be URL-friendly.
2. Give it front matter and Markdown body, e.g.:
   ```markdown
   ---
   layout: post
   title: "Your post title"
   excerpt: "One or two sentences — used on the blog list and in the page's meta description."
   read_time: 4 min read
   ---

   Your Markdown content starts here. Headings, `> blockquotes`, `` `code` ``, fenced code
   blocks, and links all pick up the site's styling automatically.
   ```
3. Push it. `/blog/index.html` lists every file in `_posts/` newest-first with no further
   editing — you never touch the listing page by hand.

**Not ready to publish yet?** Put the file in `_drafts/` instead (no date prefix needed there).
Drafts never appear on the live site or in the post list. When you're ready, move the file into
`_posts/` and add the `YYYY-MM-DD-` prefix to its filename.

`_drafts/template-post.md` is a ready-made starting point — copy it into `_posts/` (with a
dated filename) whenever you start a new one.

### Previewing locally (optional)

If you have Ruby installed:
```
bundle install
bundle exec jekyll serve --drafts
```
`--drafts` also shows anything sitting in `_drafts/` so you can proofread before publishing.
Without Ruby, you can just push to a branch and check the result on GitHub Pages directly —
there's no build step required on your end either way.

## Editing content

- **Projects**: edit `projects.html` directly — each project is a self-contained HTML block.
- **Blog posts**: see "Writing a new blog post" above — everything's in Markdown under `_posts/`.
- **CV**: replace `assets/Justin-Preuninger-CV.pdf` with an updated export whenever it changes.
- **Colors/fonts**: all defined as CSS variables at the top of `css/style.css` under `:root`.

## Notes

- The three "real" project cards on `projects.html` are drafted from your CV as a starting point —
  reword them or swap in different projects; the fourth card is a plain placeholder to duplicate.
- The blog has one published example post (`_posts/2026-09-21-from-logs-to-kpis.md`) to show the
  tone/layout, plus a draft template in `_drafts/`. Both are yours to edit or delete.
- `index.html` and `projects.html` are plain static HTML, untouched by Jekyll — no front matter,
  so GitHub Pages copies them through as-is alongside the generated blog pages.
- No contact form — GitHub Pages is static, so contact is via `mailto:`, phone, and LinkedIn links.
  If you want a working form later, Formspree or a similar hosted-form service drops in easily.
