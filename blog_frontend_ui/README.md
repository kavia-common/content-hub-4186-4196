# Content Hub Blog - Astro Frontend

Feature-rich Astro frontend for a blog backed by an Express.js API.

## Features
- Static-first pages with selective hydration:
  - Home listing with search, category and tag filters
  - Post detail pages
  - Interactive Like button (client:load)
  - Interactive Comment widget (client:load)
- Admin dashboard:
  - JWT login
  - Draft/Published filters
  - Create, edit, publish, unpublish, delete posts
- SEO artifacts:
  - RSS feed at /rss.xml
  - Sitemap at /sitemap.xml
- Theming (light/dark) with ThemeToggle

## Getting Started
1) Install deps
   npm install

2) Configure environment
   Copy .env.example to .env and adjust values:
   - PUBLIC_BACKEND_API_BASE_URL
   - PUBLIC_SITE_URL
   - PUBLIC_SITE_NAME
   - PUBLIC_SITE_DESCRIPTION
   - PUBLIC_AUTH_TOKEN_STORAGE_KEY

3) Run dev
   npm run dev
   App runs on http://localhost:3000 (configured in astro.config.mjs)

## Routes
- /               -> Latest posts with search/filters
- /search         -> Search UI
- /categories     -> Filter by category
- /tags           -> Filter by tag
- /posts/[slug]   -> Post detail
- /admin          -> Admin dashboard (login + list)
- /admin/posts/new       -> Create post
- /admin/posts/[id]      -> Edit post
- /rss.xml        -> RSS feed
- /sitemap.xml    -> Sitemap

## Notes
- This frontend expects the backend API specified in the provided OpenAPI file.
- No secrets are stored; only PUBLIC_ variables are used.
- Adjust CORS on the backend if serving across domains.
