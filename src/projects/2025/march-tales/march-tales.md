---
layout: article.njk
title: The March Cat Tales. Mobile Application, Web Interface, REST API Server
hasThumb: true
eleventyNavigation:
  key: march-tales
  title: The March Cat Tales. Mobile Application, Web Interface, REST API Server
  parent: projects-2025
date: 2025-06-19
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2025'
  - flutter
  - mobile
  - application
  - python
  - django
  - web
  - website
  - audio
  - ffmpeg
  - ffprobe
  - i18n
  - rest
  - authorization
  - mysql
  - webpack
  - sqlite
---

<!--
@changed 2025.06.21, 09:20

We've finally launched the first public release of our recent project: a mobile application and a web-site for The March Cat Tales.

-->

{% import "macros.njk" as macros with context %}

[**The March Cat Tales**](https://tales.march.team/) is a multi-component project designed to deliver author-narrated fairy tales and stories through a **mobile application**, **web interface**, and **REST API server**. Built with modern technologies, it prioritizes seamless cross-device experiences, internationalization, and user-centric design.

The project goal is to provide the user with a convenient way to listen to fairy tales, legends, and short stories, narrated by the artist, — in one place. (Currently only in Russian.)

{{ macros.imgFigure('./combo-700x340.png', 'Mobile application screens\' previews.') }}

Both the mobile app and the web server are still in MVP status. See TODO section at the end.

## Web Interface

The web interface is a **Django-powered frontend** that serves as a companion to the mobile app and as an administrative interface to the database. It uses Django template system with **Webpack** for client-side asset building (via SCSS and TypeScript).

The administrative panel is implemented using the built-in django admin functional and is complemented by **django-unfold**.

The public web site is available at: [https://tales.march.team/](https://tales.march.team/).

### Web Interface Screenshots

{{ macros.carouselBegin('shots-slider full-width', type='browserScreenshotsWide') }}
{{ macros.carouselItem('./images/web-2/author-details.jpg', 'Author details.') }}
{{ macros.carouselItem('./images/web-2/authors-list.jpg', 'Authors list.') }}
{{ macros.carouselItem('./images/web-2/language-menu.jpg', 'Language menu.') }}
{{ macros.carouselItem('./images/web-2/page-header.jpg', 'Page header.') }}
{{ macros.carouselItem('./images/web-2/track-details.jpg', 'Track details.') }}
{{ macros.carouselItem('./images/web-2/user-menu.jpg', 'User menu.') }}
{{ macros.carouselEnd() }}

### Key Features:

- **Simple Navigation**: Intuitive and easy viewing of fairy tales.
- **Local Favorites**: Users can save favorite tracks without an account.
- **Internationalization**: Supports multiple (English and Russian at the moment) languages for global accessibility.
- **Authorization Integration**: Syncs favorites (and potentially other essential data) with the API server if the users has been already logged in. Implemented with **django-allauth** and **django-registration**. Supports third-party oauth accounts (only Google at the moment has implemented).
- **Administrative Panel**: A convenient custom website control panel implemented with **django-unfold**.
- **Processing of uploaded audio files**: All uploaded audio files are processed using ffmpeg and ffprobe to fetch the audio metadata, and stores duration and file size into the database.
- **Internationalization**: All the models and database are translated internally using **django-translated-fields**, other translations are supported by django native i18n/l10n system.
- **Adaptive preview sizes**: **django-imagekit** is involved to generate audio tracks' author' preview on-the-fly. LQIP ("Low-quality image placeholders") previews are implemented via a dedicated middleware templatetag, which does almost the same as my [Gulp LQIP small image placeholder generator](https://github.com/lilliputten/gulp-embed-lqip-as-background) plugin: generates the image preview in the `style: backgound` with a svg-wrapped thumbnail.

## Mobile Application

The **Flutter-based mobile app** is the main component of the project, and offers an immersive listening experience with robust audio controls.

The application has been already published on the [Google Play Store](https://play.google.com/store/apps/details?id=team.march.march_tales_app).

### Mobile Application Screenshots

{{ macros.carouselBegin('shots-slider full-width', type='phoneScreenshotsWide') }}
{{ macros.carouselItem('./images/phone/tracks-list-2.jpg', 'Tracks list.') }}
{{ macros.carouselItem('./images/phone/author-screen-light.jpg', 'Author screen (light theme).') }}
{{ macros.carouselItem('./images/phone/author-tracks-light.jpg', 'Author tracks (light theme).') }}
{{ macros.carouselItem('./images/phone/authors-list-light.jpg', 'Authors list (light theme).') }}
{{ macros.carouselItem('./images/phone/notification-pane-player.jpg', 'Notification pane player (dark theme).') }}
{{ macros.carouselItem('./images/phone/rubric-info-light.jpg', 'Rubric info (light theme).') }}
{{ macros.carouselItem('./images/phone/settings-page.jpg', 'Settings page (dark theme).') }}
{{ macros.carouselItem('./images/phone/tag-info-light.jpg', 'Tag info (light theme).') }}
{{ macros.carouselItem('./images/phone/track-details.jpg', 'Track details (dark theme).') }}
{{ macros.carouselItem('./images/phone/tracks-list-light.jpg', 'Tracks list (light theme).') }}
{{ macros.carouselItem('./images/phone/tracks-list-with-a-player.jpg', 'Tracks list with a player (dark theme).') }}
{{ macros.carouselItem('./images/phone/tracks-list-without-panels-furing-scroll.jpg', 'Tracks list without panels during scroll (dark theme).') }}
{{ macros.carouselEnd() }}

### Key Features:

- **Audio Playback**: Powered by **Just Audio**, with background service support for notification controls. It's possible to control the playback from the lockscreen and notifications drawer.
- **Restoring the playback position**: Each track can be paused at any position and playback can start from the last stop.
- **Endless playback** allows to listen to all the available tracks infinitely.
- **Pinned hideable player** at the bottom of the screen.
- **Favorites Management**: Local storage or cloud sync via the API server.
- **Synchronization**: Favorites and playback positions can be synchronized across all the user's devices and browsers (if authorized).
- **Internationalization & Theming**: Multi-language support and basic customization options.
- **API/app version control**: For the safety purposes, the application version is always comparing with the expected API version on the server, and in case of an inconsistency there is a warning message displayed to the user.

## REST API Server

The API server, also built with **Django** and it's **djangorestframework**, **django-registration**, and other plugins, provides endpoints for both the web interface and mobile application. It handles database requests, user authentication, data synchronization, audio metadata management and media files hosting.

### Account Control Screenshots

{{ macros.carouselBegin('shots-slider full-width', type='browserScreenshotsWide') }}
{{ macros.carouselItem('./images/web-admin/successfully-logged-in.jpg', 'Successfully logged in.') }}
{{ macros.carouselItem('./images/web-admin/signin-screen.jpg', 'Signin screen.') }}
{{ macros.carouselItem('./images/web-admin/account-control.jpg', 'Account control.') }}
{{ macros.carouselItem('./images/web-admin/deleting-account.jpg', 'Deleting account.') }}
{{ macros.carouselEnd() }}

### Key Features:

- **User Authorization**: Secure authentication for syncing favorites across devices.
- **Data server**: serves all the essential application data.
- **RESTful Endpoints**: Efficient data exchange between clients and server.
- **Audio Processing**: Leverages **FFmpeg** and **FFprobe** for track metadata extraction and quality assurance.
- **Administration panel**: provides all the administration tools to manage data and maintenance.

See also: Notes about [Django FlatPages integration](/articles/2025/django-flatpages-based-cms/) on the project.

### Administrative Panel Screenshots

{{ macros.carouselBegin('shots-slider full-width', type='browserScreenshotsWide') }}
{{ macros.carouselItem('./images/admin-2/content-editor.jpg', 'Flat pages content editor.') }}
{{ macros.carouselItem('./images/admin-2/author-details.jpg', 'Author details.') }}
{{ macros.carouselItem('./images/admin-2/authors-list.jpg', 'Authors list.') }}
{{ macros.carouselItem('./images/admin-2/track-edit-page.jpg', 'Track edit page.') }}
{{ macros.carouselItem('./images/admin-2/tracks-list.jpg', 'Tracks list.') }}
{{ macros.carouselEnd() }}

## Audio Playback

Both the website and the mobile device have relatively identical audio player behavior:

- The hideable pinned player at the bottom of the page.
- Both the website and the mobile application remembers the playback position of each track so that playback can be resumed at any time.
- Playback positions are stored locally or on the server if the user is logged in.
- It supports endless playback when tracks are played one after the other. (Since the application is still in MVP status, it uses fairly simple logic to determine the next track to play.)
- Infinite playback support.

{#

## Mobile Tablet Screenshots

{{ macros.carouselBegin('shots-slider full-width', type='browserScreenshotsWide') }}
{{ macros.carouselItem('./images/tablet/author-details-light.jpg', 'Author details (light theme).') }}
{{ macros.carouselItem('./images/tablet/author-details.jpg', 'Author details (dark theme).') }}
{{ macros.carouselItem('./images/tablet/settings-page-light.jpg', 'Settings page (light theme).') }}
{{ macros.carouselItem('./images/tablet/track-details.jpg', 'Track details (dark theme).') }}
{{ macros.carouselItem('./images/tablet/tracks-list-with-a-search-light.jpg', 'Tracks list with a search (light theme).') }}
{{ macros.carouselEnd() }}
#}

## Seamless Cross-Device Experience

- **Local vs. Synced Data**:
  - **Web/Mobile**: Favorites can be stored locally without an account.
  - **Authorized Users**: Sync preferences across devices via the API server.
- **Unified Backend**: Both web and mobile clients share the same API server for data consistency.

## Technology Stack

| Component                | Technologies Used                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Web Interface**        | Django Templates, Webpack (SCSS/TypeScript)                                                                   |
| **API Server**           | Django REST Framework, FFmpeg/FFprobe for audio processing                                                    |
| **Mobile App**           | Flutter, Just Audio                                                                                           |
| **Internationalization** | i18n Support (Web + Mobile)                                                                                   |
| **Authorization**        | django-allauth and django-registration                                                                        |
| **Databses**             | MySQL on the server-side (through Django ORM), sqlite on the dev-server and to store mobile application data. |

## Project summary

[**The March Cat Tales**](https://tales.march.team/) demonstrates full-stack expertise, blending Django’s robust backend capabilities with Flutter’s cross-platform flexibility. By separating concerns between the web interface, API server, and mobile app, the project ensures scalability and a cohesive user experience across devices. Whether accessed via browser or mobile, the platform delivers an enchanting storytelling journey with modern tech under the hood.

## TODO

At the moment, the project is at the MVP stage. So now we have a lot of tasks for further development, like monetization, more advanced user cabinets, E-mail and push notifications, etc. And we will be grateful for any suggestions and feedback.

## Resources

Web site: https://tales.march.team/

Web-site and server source code repository: https://github.com/lilliputten/march-tales

Flutter mobile application source code repository: https://github.com/lilliputten/march-tales-flutter-app
