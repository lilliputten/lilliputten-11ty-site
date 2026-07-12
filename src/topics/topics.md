---
layout: article.njk
permalink: /topics/
title: Topics
eleventyNavigation:
  key: topics
  title: Topics
date: 2025-05-05
hideMeta: true
tag: false
tags:
  - site
  - topics
showHero: true
---

<!--
@changed 2026.07.12, 18:00
-->

{% import "macros.njk" as macros with context %}

Welcome to my digital workshop — a space where I set down the fragments of code, curiosity, and daily discovery that surface in the course of my work. Whenever time and inspiration align, I try to capture the practical quirks, improvised solutions, and small epiphanies that emerge from the usual chaos of full-stack development. More than anything, this is a notebook for my future self — a way to hold onto insights that might otherwise slip away.

Here you’ll also find a curated trail of outside voices: articles that made me pause, rethink, or argue with the page — each accompanied by a few modest reflections of my own.

And, if nothing else, expect at least one mildly offbeat essay per year. I’d be disappointed if I didn’t manage that much.

## Here are some of them, behold!

{{ macros.ArticleThumb('./2025/2025-09-27-hollis-robbins-how-to-tell-if-something-is-ai-written/', 'How to Tell if Something is AI-Written', 'Review on an article by Hollis Robbins, published on Aug 2025') }}

{{ macros.ArticleThumb('./2025/2025-09-21-martin-fowler-articles-expert-generalist/', 'Expert Generalists', 'Review on an article by by Martin Fowler (et al), published on July 2025') }}

{{ macros.ArticleThumb('./2025/2025-05-04-gulp-lqip-plugin/', 'Gulp LQIP small image placeholder generator plugin', 'Just created a gulp plugin which generates HTML image placeholders using LQIP technique and allows to embed them into the image background.') }}

{{ macros.ArticleThumb('./2025/2025-04-05-django-flatpages-based-cms/', 'A way to turn Django into a full-fledge CMS platform via advanced FlatPages', 'A recipe for adding a Django flatpages application with context passing support, internationalization and a full-feature rich content editor.') }}

{{ macros.ArticleThumb('./2024/2024-06-27-mongodb-service-toggle-windows-shortcut/', 'A handy way to quickly toggle MongoDB Windows background service', 'A small trick to create a powershell script companied with a desktop shortcut to quickly toggle MongoDB Windows background service.') }}
