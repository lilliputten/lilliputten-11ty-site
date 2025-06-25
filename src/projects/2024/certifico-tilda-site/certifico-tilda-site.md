---
layout: article.njk
title: Full site designed in Figma and coded within Tilda CMS using custom solutions
thumbDescription: In the Autumn of 2024 I completed the task of a full cycle (excluding (excluding content management tasks) of website creation from design to programming for my Russian partner.
hasThumb: true
eleventyNavigation:
  key: certifico-tilda-site
  title: Certifico Group Tilda site
  parent: projects-2024
date: 2024-10-21
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - cms
  - tilda
  - design
  - website
  - coding
  - typescript
  - scss
  - webpack
  - php
---

<!--
@changed 2024.10.23, 15:00
-->

{% import "macros.njk" as macros with context %}

## The project

In the Autumn of 2024 I completed the task of a full cycle (excluding (excluding content management tasks) of website creation from design to programming for my Russian partner.

Design was completed in Figma.

The site itself was set up in the [Tilda](https://tilda.cc/) constructor, but using custom components, for which the webpack assembly (with typescript and scss) was used.

## Screenshots

### Design

{{ macros.imgFigure('./images/00-figma-design.jpg', 'Design layout in figma.') }}

{{ macros.imgFigure('./images/01-tilda-header.jpg', 'Editing the site header in the Tilda CMS.') }}

### Original site

The following screenshots are presented as they looked immediately after the completion of the design phase.

{{ macros.imgFigure('./images/02-site-main.jpg', 'Main page (as a landing).') }}

{{ macros.imgFigure('./images/02-site-contacts.jpg', 'Contacts page.') }}

{{ macros.imgFigure('./images/02-site-inner-page.jpg', 'Internal page.') }}

{{ macros.imgFigure('./images/02-site-form.jpg', 'Popup feedback form.') }}

## The webpack project

To customize the standard Tilda building blocks, typescript code is used, organized into a project that is compiled using webpack.

See [the project](https://github.com/lilliputten/certifico-tilda-project-2024-10) on Github.

## Links

- The public [certificogroup.ru](https://certifico.tilda.ws/) site (in Russian).
- [Tilda](https://tilda.cc/) site contructor.
