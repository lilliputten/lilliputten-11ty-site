---
layout: article.njk
title: Excel VLOOKUP Function Trainer Application
hasThumb: true
eleventyNavigation:
  key: action-excel-vlookup-emulator
  title: Excel VLOOKUP Function Trainer Application
  parent: projects-2025
date: 2025-07-15
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2025'
  - web
  - application
  - vite
  - react
  - next-intl
  - tailwindcss
  - vercel
  - i18n
---

<!--
@changed 2025.07.15, 18:49

-->

{% import "macros.njk" as macros with context %}

[The VLOOKUP trainer applicaiton](https://action-excel-vlookup-emulator.vercel.app/?en) is implemented via React, Vite, TS, and Tailwind, and deployed to Vercel. Developed for a Russian company [Action Academy](https://academy.action-mcfr.ru/).

The goal is to help to understand a Vertical Lookup or VLOOKUP ("вертикальный просмотр", ВПР, in Russian; the applicaiton supports both English and Russian localizations) function in Miscrosoft Excel.

The application is a step-by-step simulator for practicing actions for comparing and searching for missing values in different columns of Excel tables.

{{ macros.imgFigure('./images/opengraph-image-medium.jpg', 'Application banner.') }}

## Screenshots

{{ macros.imgFigure('./images/initial-invitation.png', 'Initial invitation.') }}

{{ macros.imgFigure('./images/full-screen.png', 'Full application screen view on the Final Stage.') }}
{{ macros.imgFigure('./images/excel-sheet-during-range-selection.png', 'Excel Sheet During Range Selection.') }}

<!-- {{ macros.imgFigure('./images/bottom-buttons-step-13.png', 'Bottom Buttons Step, Stage 13.') }} -->
<!-- {{ macros.imgFigure('./images/bottom-buttons-final.png', 'Bottom Buttons, the Final Stage.') }} -->
{{ macros.imgFigure('./images/cells-with-a-fireworks.png', 'Cells With a Fireworks Indication.') }}
<!-- {{ macros.imgFigure('./images/input-cell-with-fireworks.png', 'Input Cell With a Fireworks Indication, on a Step Completion.') }} -->
{{ macros.imgFigure('./images/error-tooltip.png', 'Error Tooltip with a Hint.') }}
{{ macros.imgFigure('./images/final-results-column.png', 'Final Results Column.') }}
{{ macros.imgFigure('./images/misc-toasts.png', 'Misc Correction Toasts.') }}

## Links

- [Vercel deployed app](https://action-excel-vlookup-emulator.vercel.app/?en)
- [Repository](https://github.com/lilliputten/action-excel-vlookup-emulator/)
