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
---

<!--
@changed 2024.06.22, 00:14
-->

{% import "macros.njk" as macros with context %}

## What is it?

This application is designed to visualize data flows using [sankey diagrams](https://en.wikipedia.org/wiki/Sankey_diagram).

This web application was made as part of a set of data manipulating and visualizing tools for the [Cauldron Solutions](https://www.cauldron.ch/) company.

## Features

Some of the application features:

- Data load: (1) programmatically from url parameters, (2) from local drive, (3) from demo data set.
- Drag and drop
- Help reference
- Live visualization server (python and nodejs implementations)
- Applicaiton settings and node properties side hideable panels
- Possibility to choice: dark/light theme, horizontal/vertical layout
- Automatic/manual node hiding
- Different color modes: single color, random colors, gradient colors
- Possibility to manual color selection for particular nodes

## Modifications

- Plotly library patches (TODO: Provide the list of changes)

## Technologies Used

- [React](https://react.dev/)
- [Plotly javascript graphing library](https://plotly.com/javascript/)
- [MUI](https://mui.com/)

## Application screenshots

### Basic screens

{{ macros.imgFigure('./images/dataLoadScreen.png', 'Data load screen. It\'s possible to load custom data from local drive or to use predefined demo data set here. User can see general statistics on the loaded data.') }}
{{ macros.imgFigure('./images/mainPageBlackDemo.png', 'Simple demo graph data on the main application screen.') }}
{{ macros.imgFigure('./images-help/mainWindowHalf.png', 'The main chart window with data visualization of medium complexity.') }}
{{ macros.imgFigure('./images/helpWindow.png', 'Help dialog window with an explanantion of some basic application features.') }}

{#

### Help page images

{{ macros.imgFigure('./images-help/colorModeProgressive.png', 'Color Mode Progressive.') }}
{{ macros.imgFigure('./images-help/colorSelectionInAction.png', 'Color Selection In Action.') }}
{{ macros.imgFigure('./images-help/colorSelector.png', 'Color Selector.') }}
{{ macros.imgFigure('./images-help/dataLoadedSuccessfully.png', 'Data Loaded Successfully.') }}
{{ macros.imgFigure('./images-help/dataLoadSlots.png', 'Data Load Slots.') }}
{{ macros.imgFigure('./images-help/dataLoadSuccessfulButtons.png', 'Data Load Successful Buttons.') }}
{{ macros.imgFigure('./images-help/edgeHovering.png', 'Edge Hovering.') }}
{{ macros.imgFigure('./images-help/nodeHovering.png', 'Node Hovering.') }}
{{ macros.imgFigure('./images-help/propertiesPanel.png', 'Properties Panel.') }}
{{ macros.imgFigure('./images-help/settingsAutoHideNodes.png', 'Settings: Auto Hide Nodes.') }}
{{ macros.imgFigure('./images-help/settingsColorMode.png', 'Settings: Color Mode.') }}
{{ macros.imgFigure('./images-help/settingsLayout.png', 'Settings: Layout.') }}
{{ macros.imgFigure('./images-help/settingsPanel.png', 'Settings: Panel.') }}
{{ macros.imgFigure('./images-help/settingsRestoreHiddenNodes.png', 'Settings: Restore Hidden Nodes.') }}
{{ macros.imgFigure('./images-help/settingsTheme.png', 'Settings: Theme.') }}

{{ macros.imgFigure('./images/sampleDiagram.png', 'A little more complex demo diagram visualization.') }}
{{ macros.imgFigure('./images-help/chartArea.png', 'Chart Area.') }}
{{ macros.imgFigure('./images-help/topAppMenu.png', 'Top App Menu.') }}
{{ macros.imgFigure('./images-help/topChartPanel.png', 'Top Chart Panel.') }}
#}

## Links

- The [github repository](https://github.com/lilliputten/sankey-graph-app) is available.
