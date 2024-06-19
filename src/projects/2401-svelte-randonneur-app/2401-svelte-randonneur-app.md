---
title: Randonneour Data Browser
layout: article.njk
# permalink: /projects/
# eleventyExcludeFromCollections: true
description: Dataflow editing application
date: 2024-01-31
# tag: false
tags:
  - projects
  # - DdS
  - cauldron
  - randonneur
  - application
  - data
  - manipuation
  - svelte
  - svelte-headless-table
  - svelteui.dev
---

<!--
@changed 2024.06.19, 20:53
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
