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

The production workflow builds the VitePress site in GitHub Actions and uploads the generated `src/.vitepress/dist/` files to the remote server over SCP.

Configure these GitHub secrets before enabling production deploys: `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PASSPHRASE`, `SSH_PORT`, `SSH_FINGERPRINT`, and `SSH_TARGET_DIR`.

## Contributing

Contributions are welcome. A typical workflow is:

1. Create a branch for your changes.
2. Update or add documentation pages.
3. Run `npm run build` to verify the site compiles correctly.
4. Open a pull request.

## License

MIT
