---
layout: article.njk
title: Vanilla Tasks Tracker
hasThumb: true
eleventyNavigation:
  key: vanilla-tasks-tracker
  title: Vanilla Tasks Tracker
  parent: projects-2024
date: 2024-07-25
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - vanilla
  - tasks tracker
  - js
  - css
  - typescript
  - modules
  - browser
---

<!--
@changed 2024.07.25, 19:30
-->

{% import "macros.njk" as macros with context %}

This is a small vanilla javascript/css application designed to demonstrate the capabilities of native technologies in a browser environment. The application does not use any libraries and (almost) third-party resources.

## Features

- Inter-session data storing: using the `localStorage` and firebase cloud database (for authorized users, see below).
- User authorization (using Google OAUTH).
- Caching service worker with abilities to automatically flush the cache on version change and installation of the PWA application.
- Time tracking functionality (even when the apllication is not active).
- Adaptive layout (using native CSS variables), adaptive main menu.
- Data import/export from/to a local json file.
- Minimal UI: Popup dialogs, toasts.
- Change the order of the project/task items by drag-and-drop (with support for mobile devices).
- ES6 JavaScript code.
- ES6 browser modules.
- Internal TypeScript support (via jsdoc tags).

## Resources

The actual version is deployed to:

- https://vanilla-tasks.lilliputten.com/

The source code is located in github repository:

- https://github.com/lilliputten/vanilla-tasks

## Screenshots

{{ macros.imgFigure('./images/authorization-signin-button.png', 'The layout of the application with empty data, the main menu contains a sign-in button (v.0.0.13).') }}

{{ macros.imgFigure('./images/authorized.png', 'The user is signed in, the data is loaded (if it was in the server database) (v.0.0.13).') }}

{{ macros.imgFigure('./images/changed-version-notification.png', 'Notification of a version change (v.0.0.13).') }}

{{ macros.imgFigure('./images/layout-and-task-states.png', 'The main application layout, different task states and active time tracking (v.0.0.10).') }}

{{ macros.imgFigure('./images/toasts.png', 'Notification toast popups (v.0.0.10).') }}

{{ macros.imgFigure('./images/nodes-drag-and-drop.png', 'Drag-and-drop in action (v.0.0.9).') }}

{{ macros.imgFigure('./images/dialog-popup.png', 'The dialog window popup (v.0.0.3).') }}

## Used technologies

This project uses only vanilla css and (almost; see below) vanilla javascript.

Only one 3rd-party resource was used: font-awesome icons library (v.4.5.0).

It's possible to use unicode symbols or local svg resources to completely get rid of external resources.

I've already tried using unicode icons, but they look a bit sloppy. So, I decided to leave this icons pack here.

No other libraries or dependencies are used at all.

The package.json has some dependencies, but they are only used to support the development process:

- eslint (v.8.45.0)
- prettier (v.3.0.0)
- serve (v.14.2.3)
- stylelint (v.15.10.2)
- typescript (v.5.1.6)

It's not required to install anything -- the code is already production-ready.

Not entirely pure javascript is used here. Some exceptions include:

- The code uses typescript support via jsdoc typing syntax.

- There used [modern es modules support](https://www.sitepoint.com/using-es-modules/) in browser. This is not a very good solution in terms of performance, but it is suitable for a demo application.

I've used some of the technologies I used in my client's project.

I've applied here some of the approaches and technologies that I'd developed for my client's [Brightway Matchbox](https://github.com/cauldron/bw_matchbox) project, where we used the lightweight vanilla front-end part.
