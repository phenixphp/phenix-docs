# Phenix Docs

Official documentation site for the [Phenix framework](https://phenixphp.com), built with [VitePress](https://vitepress.dev/).

The repository contains the source code for the documentation portal, including the landing page, the guide pages, and the custom VitePress theme used to publish the site.

## Links

- Website: https://phenixphp.com
- Framework repository: https://github.com/phenixphp/framework
- Aplication repository: https://github.com/phenixphp/phenix
- Documentation repository: https://github.com/phenixphp/phenix-docs

## Stack

- VitePress for the documentation site
- Vite for local development
- Tailwind CSS for styling utilities
- Custom VitePress theme components under `src/.vitepress/theme`

## Getting Started

Clone the repository with HTTPS:

```bash
git clone https://github.com/phenixphp/phenix-docs.git docs
cd docs
```

If you already have GitHub SSH access configured, you can also use:

```bash
git clone git@github.com:phenixphp/phenix-docs.git docs
cd docs
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

By default, VitePress serves the site locally so you can preview content and theme changes while editing.

## Available Scripts

```bash
npm run dev
```

Starts the local VitePress development server.

```bash
npm run build
```

Builds the static documentation site.

```bash
npm run preview
```

Serves the production build locally for verification.

```bash
npm run format
```

Runs `standard --fix` on the project.

## Project Structure

```text
.
├── src/
│   ├── index.md                # Home page
│   ├── guide/                  # Documentation pages
│   ├── public/                 # Static assets
│   └── .vitepress/
│       ├── config.js           # VitePress site configuration
│       └── theme/              # Custom theme components and styles
├── .github/workflows/          # GitHub Actions workflows
├── package.json
└── vite.config.js
```

## Writing Docs

- Edit the home page in `src/index.md`.
- Add or update guide pages in `src/guide/`.
- Update navigation and sidebar entries in `src/.vitepress/config.js`.
- Adjust branding and UI behavior in `src/.vitepress/theme/`.

## Deployment

The repository includes a GitHub Actions workflow at `.github/workflows/deploy-production.yml`.

The workflow currently connects to the production host over SSH, but the actual deployment commands are still placeholders. Before using it in production, configure the required GitHub secrets and replace the example script with the real build and publish steps for your server.

## Contributing

Contributions are welcome. A typical workflow is:

1. Create a branch for your changes.
2. Update or add documentation pages.
3. Run `npm run build` to verify the site compiles correctly.
4. Open a pull request.

## License

MIT
