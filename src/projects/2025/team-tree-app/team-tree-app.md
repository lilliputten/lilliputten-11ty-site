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
@changed 2025.05.08, 18:41

We've finally launched the first public release of our recent project: a mobile application and a web-site for The March Cat Tales.

-->

{% import "macros.njk" as macros with context %}

[**Team Tree App**](https://team-tree-app.vercel.app) is a  small fullstack Next.js Vercel-hosted application aimed for editing hierarchical data with a nice pack of basic features, could serve as a starting point for a following Next.js project.

At the moment, the data model is limited to working with only one string field, but it can be easily expanded.

And, of course, as it's not a production project, there are still a lot of placeholders (I'll fix them if the app continues to evolve).

The application was created by order of my friends, who needed quick access to hierarchical data in their work.

### Key Features:

- Used [Next.js](https://nextjs.org/) as an application framework.
- [TailwindCSS](https://tailwindcss.com/) based UI, with a minimal amount of SCSS code.
- Autgorization implemented with [next-auth](https://next-auth.js.org/) library (it supports oath logins with GitHub, Google or Yandex accounts).
- Internationalization via [next-intl](https://next-intl.dev/) library.
- Database ORM by [Prisma](https://www.prisma.io/).
- Various supported databases providers: sqlite for a local development, postgresql for a production mode (it's forcibly switching to postgresql in a production deployment, via a custom script [`prisma-switch.mjs`](https://github.com/lilliputten/team-tree-app/blob/main/prisma-switch.mjs)).
- [Vercel](https://vercel.com/) platform integration: CI/CD and hosting.
- An ability to run on a local IIS server (with a IIS launcher script [`iisnode-nextjs-entry.js`](https://github.com/lilliputten/team-tree-app/blob/main/iisnode-nextjs-entry.js)). (Some notes on [IIS and NodeJS on Windows](https://github.com/lilliputten/team-tree-app/blob/main/README.iisnode.md).)
- "Local mode": Using the boolean environment variable [`USER_REQUIRED`](https://github.com/lilliputten/team-tree-app/blob/main/.env.SAMPLE#L10), the application could be switched to a loose local mode when an unauthorized user is allowed to edit "shared" (not belonging to any users) data. Otherwise (for a production mode) any data operations for unathorized users are restricted.

### Screenshots

{{ macros.imgFigure('./images/welcome-screen.png', 'Welcome screen. A placeholder for basic introduction and auick sign-in.') }}
{{ macros.imgFigure('./images/info-screen.png', 'Information screen. A place for future application notes and help.') }}
{{ macros.imgFigure('./images/login-modal.png', 'Sign-in modal dialog.') }}

{{ macros.imgFigure('./images/user-menu.png', 'Authorized user menu (with reserved settings and other service links).') }}
{{ macros.imgFigure('./images/vercel-deployment.png', 'Vercel deployment panel.') }}

{{ macros.imgFigure('./images/data-representation.png', 'Hierarchical data representation.') }}
{{ macros.imgFigure('./images/data-edit-popup.png', 'Particular data entry edit popup.') }}

## Links

Deployed application: https://team-tree-app.vercel.app

Github repository: https://github.com/lilliputten/team-tree-app
