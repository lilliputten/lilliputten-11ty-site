---
layout: article.njk
title: Randonneour Data Browser
# description: A web application for managing environmental sustainability data flows
hasThumb: true
eleventyNavigation:
  key: svelte-randonneur-app
  title: Randonneour Data Browser
  parent: projects-2024
date: 2024-01-31
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - cauldron
  - randonneur
  - application
  - data
  - manipuation
  - svelte
  - svelte-headless-table
  - svelteui
---

<!--
@changed 2024.06.21, 21:38
-->

{% import "macros.njk" as macros with context %}

## What is it?

This web application was made as part of a set of data manipulating and visualizing tools for the [Cauldron Solutions](https://www.cauldron.ch/) company.

## What is it intended for?

The application is designed to view and modify data describing changes that will be applied to environmental sustainability processes. It features a graphical, user-friendly interface to navigate and change different types of data. Users can perform various operations, such as creating datasets, deleting entries, disaggregating data, mapping, replacing, and updating information.

## The task

The application must allow the user to view and modify data, describing the changes that will be applied to environmental sustainability processes. It should use graphical user-friendly interface to navigate and change different types of data.

There should be allowed a few types of operations (datasets), which could be described by different data tables:

- Create datasets
- Delete
- Disaggregate
- Mapping
- Replace
- Update

The user could edit this data separately in the form of tables, where each row represented a data object.

A set of editable metadata properties should be also available.

It is necessary to create a user-friendly data editing interface that allows the user to work with various data objects and entities: nested objects, selectors (for categorical data such as units and categories) and plain data entries.

We had to change the table manipulation library to support SSR svelte features, allow multi-level data identifiers (for rows representing nested objects) and provide more detailed statistic information through the API to implement more correct pagination.

We have implemented various types of data filtering: raw text and categorical filters. It was possible to apply several filters at the same time.

The user could upload both his own data and use predefined demo/test datasets.

The user must be able to export the modified data in json format.

## Technologies Used

- [Svelte](https://svelte.dev/) -- A front-end software framework that provides a highly efficient and responsive user interface.
- [SvelteUI](https://svelteui.dev/) -- A UI kit library for a consistent and visually appealing design.
- [Svelte Headless Table](https://svelte-headless-table.bryanmylee.com/) -- A table manipulation library supporting server-side rendering, multi-level data identifiers, and detailed data pagination.

## Scalability

We focused on optimizing front-end performance to ensure scalability. The application employs efficient pagination techniques to manage large datasets smoothly. By modifying the Svelte Headless Table library, we supported multi-level data identifiers and provided a robust API for accurate pagination. These optimizations ensure the application can handle increasing amounts of data and users without compromising performance.

## Application screenshots

### The main screen

{{ macros.imgFigure('./images/main-page.png', 'The main page of the application with a selection of a demo dataset.') }}
{{ macros.imgFigure('./images/main-page-in-a-dark-theme-with-a-loaded-data.png', 'The main page in a dark theme with an already loaded data.') }}

### The data tables

{{ macros.imgFigure('./images/dataset-in-a-dark-theme.png', 'Dataset table in a dark theme.') }}
{{ macros.imgFigure('./images/edit-data-record.png', 'Editing data entry in a pop-up dialog box.') }}

### The data filters

{{ macros.imgFigure('./images/filter-simple.png', 'The basic text filter for the column.') }}
{{ macros.imgFigure('./images/filter-selection-unit.png', 'Filtering the column of units of measurement.') }}
{{ macros.imgFigure('./images/miltiple-filters.png', 'Several filters have been applied to the data table.') }}

## Demo version

The demo version of the application has been [published](https://matchbox.cauldron.ch/) on the Cauldron site (as of Summer 2024).

## Future Improvements

Based on the initial development experience, we plan to implement several enhancements:

- Adding more customization options and advanced filtering capabilities to make data manipulation more intuitive.
- Incorporating different operation types to allow data objects to be arrays.
- Improving the mobile user experience (UX) to ensure versatility and user-friendliness as the application evolves.
