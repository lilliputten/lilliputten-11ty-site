---
layout: article.njk
title: Vanilla tasks list manager
hasThumb: true
eleventyNavigation:
  key: vanilla-tasks-manager
  title: Vanilla tasks list manager
  parent: projects-2024
date: 2024-07-07
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - vanilla
  - tasks manager
  - js
  - css
  - typescript
  - modules
  - browser
---

<!--
@changed 2024.07.07, 21:20
-->

{% import "macros.njk" as macros with context %}

This is a small vanilla javascript/css application designed to demonstrate the capabilities of native technologies in a browser environment. The application does not use any libraries and (almost) third-party resources.

## Features

- Inter-session data storing (in the `localStorage`).
- Adaptive layout, adaptive main menu.
- ES6 JavaScript code.
- ES6 browser modules.
- Internal TypeScript support (via jsdoc tags).
- Changing the order of project/task items by dragging (with mobile support).
- Change the order of the project/task items by drag-and-drop (with support for mobile devices).
- Data import/export from/to a local json file.
- Basic PWA funcitonality (cache, ability to install on a mobile desktop; temporarily disabled, in progress)
- Time tracking functionality.

## Resources

The source code is located in github repository:

- https://github.com/lilliputten/vanilla-tasks

The actual version is deployed to:

- https://vanilla-tasks.lilliputten.com/

## Screenshots

{{ macros.imgFigure('./images/layout-and-task-states.png', 'The main application layout, different task states and active time tracking (v.0.0.10).') }}

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

