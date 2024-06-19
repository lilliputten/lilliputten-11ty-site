---
layout: article.njk
title: Randonneour Data Browser
description: Dataflow editing application
eleventyNavigation:
  key: 2401-svelte-randonneur-app
  parent: projects
  title: Randonneour Data Browser
# permalink: /projects/
# eleventyExcludeFromCollections: true
date: 2024-06-20
# tag: false
showNavigationBreadcrumbs: true
tags:
  - projects
  # - DdS
  - Cauldron
  - randonneur
  - application
  - data
  - manipuation
  - svelte
  - svelte-headless-table
  - svelteui
---

<!--
@changed 2024.06.20, 00:52
-->

{% import "macros.njk" as macros with context %}

## What is it?

This application was made as part of a set of data manipulating and visualizing tools for the [Cauldron Solutions](https://www.cauldron.ch/) company.

## What is it intended for?

The main purpose of the application is to edit data processing descriptions.

## Application screenshots

### The main screen

{{ macros.imgFigure('./images/main-page.png', 'The main page of the application with a selection of a demo dataset.') }}

{{ macros.imgFigure('./images/main-page-in-a-dark-theme-with-a-loaded-data.png', 'The main page in a dark theme with an already loaded data.') }}

### The data tables

{#
{{ macros.imgFigure('./images/dataset-update.png', 'Dataset update') }}
#}

{{ macros.imgFigure('./images/dataset-in-a-dark-theme.png', 'Dataset table in a dark theme.') }}

{{ macros.imgFigure('./images/edit-data-record.png', 'Editing data entry in a pop-up dialog box.') }}

### The data filters

{{ macros.imgFigure('./images/filter-simple.png', 'The basic text filter for the column.') }}

{#
{{ macros.imgFigure('./images/filter-selection.png', 'Basic filter selection') }}
{{ macros.imgFigure('./images/filter-selection-large.png', 'Filter selection large.') }}
#}

{{ macros.imgFigure('./images/filter-selection-unit.png', 'Filtering the column of units of measurement.') }}

{{ macros.imgFigure('./images/miltiple-filters.png', 'Several filters have been applied to the data table.') }}

## Used technologies

- [Svelte](https://svelte.dev/)
- [Svelte Headless Table](https://svelte-headless-table.bryanmylee.com/)
- [SvelteUI](https://svelteui.dev/)

## Demo version

The demo version of the application has been [published publicly](https://matchbox.cauldron.ch/) (as of 2024).
