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
  - DdS
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

<figure >
  {{ macros.img('./images/main-page.png') }}
  <figcaption>
    The main page of the application with a selection of a demo dataset.
  </figcaption>
</figure>

<figure>
  {{ macros.img('images/main-page-in-a-dark-theme-with-a-loaded-data.png') }}
  <figcaption>
    The main page in a dark theme with an already loaded data.
  </figcaption>
</figure>

### The data tables

{#

<figure>
  {{ macros.img('images/dataset-update.png') }}
  <figcaption>
    Dataset update
  </figcaption>
</figure>
#}

<figure>
  {{ macros.img('images/dataset-in-a-dark-theme.png') }}
  <figcaption>
    Dataset table in a dark theme.
  </figcaption>
</figure>

<figure>
  {{ macros.img('images/edit-data-record.png') }}
  <figcaption>
    Editing data entry in a pop-up dialog box.
  </figcaption>
</figure>

### The data filters

<figure>
  {{ macros.img('images/filter-simple.png') }}
  <figcaption>
    The basic text filter for the column.
  </figcaption>
</figure>

{#

<figure>
  {{ macros.img('images/filter-selection.png') }}
  <figcaption>
    Basic filter selection
  </figcaption>
</figure>
<figure>
  {{ macros.img('images/filter-selection-large.png') }}
  <figcaption>
    Filter selection large.
  </figcaption>
</figure>
#}

<figure>
  {{ macros.img('images/filter-selection-unit.png') }}
  <figcaption>
    Filtering the column of units of measurement.
  </figcaption>
</figure>

<figure>
  {{ macros.img('images/miltiple-filters.png') }}
  <figcaption>
    Several filters have been applied to the data table.
  </figcaption>
</figure>

## Used technologies

- [Svelte](https://svelte.dev/)
- [Svelte Headless Table](https://svelte-headless-table.bryanmylee.com/)
- [SvelteUI](https://svelteui.dev/)

## Demo version

The demo version of the application has been [published publicly](https://matchbox.cauldron.ch/) (as of 2024).
