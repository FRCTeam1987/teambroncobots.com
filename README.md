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
docker-compose up dev
```

Production build (Jekyll + nginx):
```powershell
docker build -t broncobots-site .
```

Site runs on `http://localhost:4000` for dev and port `80` for the production image.

## Deployment

GitHub Actions builds and deploys automatically:
- **master** branch → teambroncobots.com (GitHub Pages)
- **qa** branch → dev.teambroncobots.com (SFTP)

## Project Structure

```
_config.yml          # Jekyll configuration
_data/               # YAML data sources (team info, sponsors, etc.)
_includes/           # Reusable HTML partials
_layouts/            # Page layouts
*.md in root         # Standalone Markdown pages
_posts/              # Blog posts
_sass/               # SASS styles (extends Bulma)
assets/              # Static files and images
```

## License

MIT
