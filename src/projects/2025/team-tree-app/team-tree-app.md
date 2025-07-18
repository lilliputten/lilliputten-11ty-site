---
layout: article.njk
title: Team Tree. A simple hierarchical data editor
hasThumb: true
eleventyNavigation:
  key: team-tree-app
  title: Team Tree. A simple hierarchical data editor
  parent: projects-2025
date: 2025-05-08
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2025'
  - web
  - application
  - nextjs
  - react
  - next-auth
  - next-intl
  - tailwindcss
  - vercel
  - iis
  - i18n
  - oauth
  - prisma
  - authorization
  - postgresql
  - webpack
  - sqlite
---

<!--
@changed 2025.05.17, 21:14

We've finally launched the first public release of our recent project: a mobile application and a web-site for The March Cat Tales.

-->

{% import "macros.njk" as macros with context %}

[**Team Tree App**](https://team-tree-app.vercel.app) is a small fullstack Next.js Vercel-hosted application aimed for editing hierarchical data with a nice pack of basic features, could serve as a starting point for a following Next.js project.

At the moment, the data model is limited to working with only one string field, but it can be easily expanded.

The application was created by order of my friends, who needed quick access to hierarchical data in their work process.

### Key Features:

- [Next.js](https://nextjs.org/) is used as an application framework.
- [TailwindCSS](https://tailwindcss.com/) based UI, with a minimal amount of SCSS code.
- Authorization implemented with [next-auth](https://next-auth.js.org/) library (it supports oath logins with GitHub, Google or Yandex accounts).
- Internationalization via [next-intl](https://next-intl.dev/) library.
- Color theme supports (with Tailwind).
- Database ORM by [Prisma](https://www.prisma.io/).
- Various supported databases providers: sqlite for a local development, postgresql for a production mode (it's forcibly switching to postgresql in a production deployment, via a custom script [`prisma-switch.mjs`](https://github.com/lilliputten/team-tree-app/blob/main/prisma-switch.mjs) -- as prisma doesn't support various database sources, we have to change them manually).
- [Vercel](https://vercel.com/) platform integration: CI/CD and hosting.
- An ability to run on a local IIS server (with a IIS launcher script [`iisnode-nextjs-entry.js`](https://github.com/lilliputten/team-tree-app/blob/main/iisnode-nextjs-entry.js)). (Some notes on [IIS and NodeJS on Windows](https://github.com/lilliputten/team-tree-app/blob/main/README.iisnode.md).)
- "Local mode": Using the boolean environment variable [`USER_REQUIRED`](https://github.com/lilliputten/team-tree-app/blob/main/.env.SAMPLE#L10), the application could be switched to a loose local mode when an unauthorized user is allowed to edit "shared" (not belonging to any users) data. Otherwise (for a production mode) any data operations for unathorized users are restricted.

Illustrations by [freeicons.io](https://freeicons.io).

### Screenshots

{{ macros.imgFigure('./images/welcome-screen.png', 'Welcome screen. A placeholder for basic introduction and a quick sign-in form.') }}
{{ macros.imgFigure('./images/info-screen.png', 'Information screen. A place for future application notes and help.') }}
{{ macros.imgFigure('./images/login-modal.png', 'Sign-in modal dialog.') }}

{{ macros.imgFigure('./images/user-menu.png', 'Authorized user menu (with reserved settings and other service links).') }}
{{ macros.imgFigure('./images/vercel-deployment.png', 'Vercel deployment panel.') }}

{{ macros.imgFigure('./images/data-representation.png', 'Hierarchical data representation.') }}
{{ macros.imgFigure('./images/data-edit-popup.png', 'Particular data entry edit popup.') }}

## Links

Deployed application: https://team-tree-app.vercel.app

Github repository: https://github.com/lilliputten/team-tree-app
