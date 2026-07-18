# orbutbul.dev

Personal website, built with Vite + React. Includes the GEMS generative shader project
(seed-driven Three.js shapes/materials).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs static files to dist/
npm run preview # serve the production build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
uploads `dist/` to cPanel over FTP.
