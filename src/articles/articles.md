---
layout: article.njk
permalink: /articles/
title: Articles
eleventyNavigation:
  key: articles
  title: Articles
date: 2025-04-05
hideMeta: true
tag: false
tags:
  - site
  - articles
showHero: true
---

<!--
@changed 2025.04.05, 08:00
-->

{% import "macros.njk" as macros with context %}

I recently started trying to write down some of the work practices and workarounds that I encounter during my regular work, when I have enough time and passion for that. Probably mostly just for myself, so as not to forget them.

One silly article a year. At least.

## Here are some of them, behold!

{{ macros.ArticleThumb('./2025/gulp-lqip-plugin/', 'Gulp LQIP small image placeholder generator plugin', 'Just created a gulp plugin which generates HTML image placeholders using LQIP technique and allows to embed them into the image background.') }}

{{ macros.ArticleThumb('./2025/django-flatpages-based-cms/', 'A way to turn Django into a full-fledge CMS platform via advanced FlatPages', 'A recipe for adding a Django flatpages application with context passing support, internationalization and a full-feature rich content editor.') }}

{{ macros.ArticleThumb('./2024/mongodb-service-toggle-windows-shortcut/', 'A handy way to quickly toggle MongoDB Windows background service', 'A small trick to create a powershell script companied with a desktop shortcut to quickly toggle MongoDB Windows background service.') }}
