---
layout: article.njk
title: Sankey Diagram Vizualizer
hasThumb: true
eleventyNavigation:
  key: sankey-graph-app
  title: Sankey Diagram Vizualizer
  parent: projects-2024
date: 2024-02-10
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - cauldron
  - application
  - data
  - sankey
  - diagram
  - vizualizer
  - react
  - plotly
  - mui
  - javascript
  - typescript
---

<!--
@changed 2024.06.22, 22:36
-->

{% import "macros.njk" as macros with context %}

## The application

The application is designed to offer a comprehensive and interactive way to visualize data flows using [sankey diagrams](https://en.wikipedia.org/wiki/Sankey_diagram). This tool is perfect for data analysts, researchers, and professionals who need to understand and present complex data relationships in an intuitive format.

This application provides a powerful yet user-friendly platform for visualizing complex data flows, enabling users to gain insights and make informed decisions quickly and effectively.

This web application was made as part of a set of data manipulating and visualizing tools for the [Cauldron Solutions](https://www.cauldron.ch/) company.

## Key Features

**Flexible Data Loading:**

- Load data programmatically from external data files using URL parameters.
- Upload data directly from your local disk.
- Utilize a predefined demo dataset for quick visualization and testing.

**Interactive Diagram Layouts:**

- Easily relayout diagram nodes (it's a built-in functionality from the charting library).

**In-Application Help:**

- Access a brief help reference in a convenient popup window for guidance and troubleshooting.

**Live Visualization Server:**

- The application provides an interactive server implemented in both Python and Node.js, for visualizing data using external requests and redirects.

**Customizable Interface:**

- Adjust settings in side panels: application settings on the left and selected node properties on the right.
- Save settings between sessions, ensuring a seamless user experience.

**Theming and Layout Options:**

- Choose between dark and light themes.
- Select horizontal or vertical layouts for optimal data presentation.

**Node Management:**

- Automatically or manually hide nodes to simplify the diagram.
- Apply different color modes to nodes: monochrome, random colors, or gradient (progressive) colors.
- Manually select specific colors for individual nodes to highlight important data points.
- Edit node names.

## Technologies used

- [React](https://react.dev/)
- [Plotly javascript graphing library](https://plotly.com/javascript/)
- [MUI](https://mui.com/)

## The Plotly library

The cornerstone of the application is the [Plotly javascript graphing library](https://plotly.com/javascript/).

We had to incorporate this library in the project's codebase to make debugging difficult moments easier, and later slightly patch the library code itself to eliminate some of the problems that arose.

For example, chart re-rendering capabilities have been added when updating colors and node names.

## Application screenshots

{{ macros.imgFigure('./images/dataLoadScreen.png', 'Data load screen. It\'s possible to load custom data from local drive or to use predefined demo data set here. User can see general statistics on the loaded data.') }}

{{ macros.imgFigure('./images/mainPageBlackDemo.png', 'Simple demo graph data on the main application screen.') }}

{{ macros.imgFigure('./images/mainWindow.png', 'The main chart window with sample data visualization of medium complexity.') }}

{{ macros.imgFigure('./images/helpWindow.png', 'Help dialog window with an explanantion of some basic application features.') }}

## Links

- The [github repository](https://github.com/lilliputten/sankey-graph-app) is available.
