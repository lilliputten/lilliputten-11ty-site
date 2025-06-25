---
layout: article.njk
title: Design & coding of a custom landing page for an existing website
thumbDescription: This page was conceived as a separate advertising campaign on an existing site. It was designed taking into account the already existing style of the site, it was not supposed to look like a separate attractive and stylish advertising page. It was developed using manually created markup and styles and scripts organized into SCSS and TypeScript modules, compiled via webpack.
hasThumb: true
eleventyNavigation:
  key: fsproperty-yupe-landing
  title: FS-Propery landing page
  parent: projects-2024
date: 2024-10-21
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - cms
  - yupe
  - design
  - website
  - coding
  - landing
  - typescript
  - scss
  - webpack
---

<!--
@changed 2024.10.21, 23:09
-->

{% import "macros.njk" as macros with context %}

## The project

This page was conceived as a separate advertising campaign on an existing (Russian) site. It was designed taking into account the already existing style of the site, it was not supposed to look like a separate attractive and stylish advertising page.

It was developed using manually created markup and styles and scripts organized into SCSS and TypeScript modules, compiled via webpack.

## Implemented features

- Stylish and attractive design (used existed site header and footer, in the CMS templates).
- A stylish and attractive design has been created (used existing site headers and footers from theCMS templates).
- Adaptive design that ensures comfortable site browsing on all types of devices.
- Styles and scripts are developed as part of a TypeScript/SCSS project, that allows to painlessly update the code and add new features.
- Integration into the existing CMS infrastructure (it's possible to edit the basic content in the CMS editor).
- Popup dialog window with a feedback form.
- Form fields verification (with custom scripts).
- Google captcha used on the client side to avoid spam and scam treats.
- The server-side PHP script that accepts data from the client, checks it and sends notifications to the site editors. This script checks the validity of the received captcha response, the correctness of the server environment and the correct form data.
- The server script configuration provided as a separated editable module.

## The webpack project

See [the project](https://github.com/lilliputten/fsproperty-landing-compile) on Github.

## Screenshots

### Figma design

{{ macros.imgFigure('./images/00-figma-design-2.jpg', 'The final design layout in Figma.') }}

{{ macros.imgFigure('./images/00-figma-popups.jpg', 'Creating different styles of modal dialogs in figma.') }}

### The editable layout in the CMS editor

{{ macros.imgFigure('./images/01-cms-editor-2.jpg', 'Page layout in the Yupe wysiiswyg editor.') }}

### Real site appearance

{{ macros.imgFigure('./images/02-site-layout.jpg', 'Full page view.') }}

{{ macros.imgFigure('./images/02-site-popup.jpg', 'Feeedback form popup dialog.') }}

## Links

- The [landing page](https://fsproperty.ru/page/services/prodat) on the site (in Russian).
- [Yupe](https://github.com/yupe/yupe) cms.
