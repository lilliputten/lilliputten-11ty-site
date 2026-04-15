<!--
@since 2024.05.04, 21:07
@changed 2026.04.15, 06:26
-->

# Personal 11ty-based portfolio site

TODO: Describe workflow here.

- Version: 0.0.22
- Last changes timestamp: 2026.04.15 06:27:00 +0300

TODO: Add the project description.

# Lilliputten Portfolio Site

[![Version](https://img.shields.io/badge/version-0.0.22-blue.svg)](CHANGELOG.md)
[![Eleventy](https://img.shields.io/badge/Eleventy-2.0.1-green.svg)](https://www.11ty.dev/)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

A modern, high-performance personal portfolio website built with [Eleventy (11ty)](https://www.11ty.dev/), showcasing articles, projects, and reviews with advanced static site generation capabilities.

## 🌟 Features

- **Content Management**: Organized articles, projects, and reviews with year-based archiving
- **Tag System**: Comprehensive tagging and categorization for easy content discovery
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Performance Optimized**:
  - Automatic HTML/CSS/JS minification
  - Image optimization with lazy loading and LQIP (Low Quality Image Placeholders)
  - Service Worker for offline support and caching
- **SEO Ready**: Auto-generated sitemap, meta tags, and Open Graph images
- **Developer Experience**:
  - TypeScript support for frontend scripts
  - SCSS with PostCSS and Autoprefixer
  - Hot reload during development
  - Code quality tools (ESLint, Stylelint, Prettier)
  - Git hooks for pre-commit checks

## 📁 Project Structure

```
lilliputten-11ty-site/
├── src/                    # Source files
│   ├── articles/          # Blog articles (organized by year)
│   ├── projects/          # Project showcases (organized by year)
│   ├── reviews/           # Product/content reviews
│   ├── pages/             # Static pages (About, Contacts, etc.)
│   ├── scripts/           # TypeScript source files
│   ├── styles/            # SCSS source files
│   ├── data/              # Global data files (JSON/JS)
│   └── includes/          # Reusable template components
├── _11ty/                 # Eleventy custom configurations
│   ├── plugins/           # Custom Eleventy plugins
│   └── transforms/        # Output transformation pipelines
├── static/                # Static assets (images, fonts, etc.)
├── compiled-assets/       # Webpack output (intermediate)
├── build/                 # Development build output
├── publish/               # Production-ready static site
├── CHANGELOG.md           # Version history
└── TODO.md               # Planned features and improvements
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **pnpm** (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lilliputten/lilliputten-11ty-site.git
cd lilliputten-11ty-site
```

2. Install dependencies:
```bash
pnpm install
```

3. Initialize Git hooks (automatic):
```bash
npx simple-git-hooks
```

### Development

Start the development server with hot reload:

```bash
pnpm run dev
```

This command runs:
- Eleventy dev server (watching for content changes)
- Webpack in watch mode (compiling TypeScript and SCSS)

Access the site at `http://localhost:8080` (default port).

#### Alternative Commands

```bash
# Only start Eleventy server
pnpm run dev-11ty

# Only compile assets (Webpack)
pnpm run watch-assets    # Watch mode
pnpm run compile-assets  # One-time compilation
```

### Building for Production

Build the optimized production site:

```bash
pnpm run build-prod
```

This will:
1. Clean the build directory
2. Set environment to production
3. Compile all assets with optimizations
4. Generate minified HTML, CSS, and JS
5. Optimize images and generate service worker

Preview the production build locally:

```bash
pnpm run prod
```

### Deployment

Deploy to your hosting platform:

```bash
# Build and publish
pnpm run build-and-publish

# Or just publish (assumes build is already done)
pnpm run publish
```

The deployment script (`.utils/publish.sh`) handles pushing to your configured remote branch or server.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server with hot reload |
| `pnpm run dev-11ty` | Start only Eleventy dev server |
| `pnpm run watch-assets` | Watch and compile assets (Webpack) |
| `pnpm run compile-assets` | One-time asset compilation |
| `pnpm run build-prod` | Build production-ready site |
| `pnpm run prod` | Build and preview production site |
| `pnpm run publish` | Deploy to remote server |
| `pnpm run build-and-publish` | Build and deploy in one command |
| `pnpm run lint` | Run ESLint + Stylelint + TypeScript check |
| `pnpm run check-all` | Full code quality check (includes Prettier) |
| `pnpm run format` | Auto-format code with Prettier |

## 🎨 Content Creation

### Adding Articles

Create new articles in `src/articles/[year]/`:

```markdown
---
layout: article.njk
title: Your Article Title
date: 2026-04-15
tags:
  - articles
  - your-tag
  - another-tag
---

Your article content here...
```

### Adding Projects

Create new projects in `src/projects/[year]/`:

```markdown
---
layout: article.njk
title: Project Name
hasThumb: true
date: 2026-04-15
tags:
  - projects
  - '2026'
  - technology-tag
---

Project description and details...
```

### Adding Images

Place images in the corresponding project/article folder and use the Nunjucks macro:

```nunjucks
{{ macros.imgFigure('./image-name.jpg', 'Image description') }}
```

Images are automatically optimized during build with:
- Format conversion (WebP/AVIF where supported)
- Multiple sizes for responsive images
- Lazy loading
- Blur-up placeholders (LQIP)

## 🔧 Technology Stack

### Core
- **[Eleventy (11ty)](https://www.11ty.dev/)** - Static site generator
- **[Webpack](https://webpack.js.org/)** - Module bundler for TS/SCSS
- **[Gulp](https://gulpjs.com/)** - Task runner for additional build steps

### Frontend
- **TypeScript** - Type-safe JavaScript
- **SCSS/Sass** - CSS preprocessor with PostCSS
- **Vanilla JavaScript** - No heavy frameworks

### Build Tools
- **Babel** - JavaScript transpilation
- **Sharp** - Image processing
- **Workbox** - Service Worker generation
- **html-minifier** - HTML optimization

### Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **Stylelint** - CSS/SCSS linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent coding styles
- **simple-git-hooks** - Pre-commit checks

## 📝 Configuration

### Environment Variables

Copy `.env.local.SAMPLE` to `.env.local` and configure:

```bash
cp .env.local.SAMPLE .env.local
```

### Eleventy Configuration

Main configuration is in `.eleventy.js`, including:
- Template engines (Nunjucks, Markdown)
- Custom filters and shortcodes
- Collection definitions
- Plugin integrations

### Webpack Configuration

Customize build behavior in `webpack.config.js`:
- Entry points
- Output configuration
- Loaders (ts-loader, sass-loader, etc.)
- Plugins

## 🐛 Troubleshooting

### Common Issues

**Build fails with image errors:**
- Ensure all referenced images exist in the correct folders
- Check image formats (supported: JPG, PNG, WebP, AVIF, SVG)

**Development server not reloading:**
- Try restarting the dev server: `Ctrl+C` then `pnpm run dev`
- Check for syntax errors in TypeScript/SCSS files

**Git hooks not working:**
- Reinstall hooks: `npx simple-git-hooks`
- Ensure lint-staged is properly configured

### Getting Help

- Check existing issues on GitHub
- Review the [TODO.md](TODO.md) for known limitations
- Examine [CHANGELOG.md](CHANGELOG.md) for recent changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Site**: [https://lilliputten.com/](https://lilliputten.com/) *(update with actual URL)*
- **GitHub Repository**: [https://github.com/lilliputten/lilliputten-11ty-site](https://github.com/lilliputten/lilliputten-11ty-site)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)
- **Todo List**: [TODO.md](TODO.md)
- **Eleventy Documentation**: [https://www.11ty.dev/docs/](https://www.11ty.dev/docs/)

## 👤 Author

**lilliputten**

- Website: [https://lilliputten.com/](https://lilliputten.com/)
- GitHub: [@lilliputten](https://github.com/lilliputten)

## 🙏 Acknowledgments

- [Eleventy Community](https://www.11ty.dev/) for the amazing SSG
- All contributors and plugin authors
- The open-source community
