---
layout: article.njk
title: TubeCaster Telegram Bot
hasThumb: true
eleventyNavigation:
  key: tubecaster-telegram-bot
  title: TubeCaster Telegram Bot
  parent: projects-2025
date: 2025-02-01
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2025'
  - telegram
  - bot
  - youtube
  - python
  - flask
---

<!--
@changed 2025.03.20, 01:50
-->

{% import "macros.njk" as macros with context %}

Simple telegram bot aimed to convert youtube videos into audio podcasts for later listening (even in offline mode) inside the Telegram app.

## Key User Features

- Send/share a YouTube link -- receive mp3 file almost immediately (depends on a current processing queue).
- Get detailed information about the YouTube video.
- Download tracks for listening anywhere, anytime.

## Perfect For

- Listen for talk-shows or videos which doesn't contain a lot of video content.
- Listen music tracks.
- Busy users preferring audio over video.
- Ideal for circumventing censorship blocks (like in modern Russia).

## How to Use

1. **Start Chat** with [@TubeCaster](https://t.me/tubecasterbot). Request registration from menu or by `/register` command.
2. **Paste YouTube Link** or share it from YouTube app.
3. **Download MP3** or listen it right from the chat.

## Application Features

- Remote realtime logging via http or syslog. It's possible to receive application logs in the realtime on the developer machine during troubleshooting process.
- Different database providers for local development and production via prisma. (It's the only to way to use db on vercel hosting to switch to Postgres.)
- Actual audio length calculation (via ffprobe packets list command). Sometimes the generated files contain incorrect meta information, in which case the only way out is to get real data using ffprobe.
- Large audio files splitting on-the fly. If the file size exceeds the telegram API limit (50MB), it is split into several smaller files before being sent to the user.
- Testing with partial functional/local resources.
- A simple authorization system (using requests). At some point, we decided to restrict access to the bot only to registered users. Now all the new users are required to send a registration request.
- Detecting delays in the processing queue. In this case, repeated messages are periodically sent indicating that the request is still being processed.

## Tech Insides

- A development branch of yt-dlp used for video processing (fetching info and audio tracks).
- The bot itself is implemented using pyTelegramBotAPI v.4 and flask v.3.

## Screenshots

{{ macros.imgFigure('./images/00-help.jpg', 'Help message') }}

{{ macros.imgFigure('./images/menu.jpg', 'The application menu.') }}

{{ macros.imgFigure('./images/00-start-and-registered.jpg', 'Start screen with a successful registration message.') }}

{# {{ macros.imgFigure('./images/00-start-register.jpg', '00-start-register') }} #}

{# {{ macros.imgFigure('./images/00-start.jpg', 'Start screen.') }} #}

{# {{ macros.imgFigure('./images/01-welcome-and-registered-users-notification.jpg', '01-welcome-and-registered-users-notification') }} #}

{# {{ macros.imgFigure('./images/audio-details.png', 'audio-details') }} #}

{# {{ macros.imgFigure('./images/audio.jpg', 'audio') }} #}

{{ macros.imgFigure('./images/details-1.jpg', 'Fetched video details.') }}

{# {{ macros.imgFigure('./images/details-2.png', 'details-2') }} #}

{# {{ macros.imgFigure('./images/downloaded-audio.jpg', 'downloaded-audio') }} #}

{{ macros.imgFigure('./images/loading-audio-cat.jpg', 'Audio downloading process.') }}


{# {{ macros.imgFigure('./images/sending-audio-full-scrren.jpg', 'sending-audio-full-scrren') }} #}

{# {{ macros.imgFigure('./images/sending-audio.jpg', 'sending-audio') }} #}

{# {{ macros.imgFigure('./images/video-details.jpg', 'video-details') }} #}

{# {{ macros.imgFigure('./images/video-prompt.jpg', 'video-prompt') }} #}

{# {{ macros.imgFigure('./images/wrong-link.jpg', 'wrong-link') }} #}


{# ## The registration #}

{# {{ macros.imgFigure('./images/registered-users-notification.jpg', 'registered-users-notification') }} #}

{# {{ macros.imgFigure('./images/registration-confirmation-request.jpg', 'registration-confirmation-request') }} #}

{# {{ macros.imgFigure('./images/registration-process.jpg', 'registration-process') }} #}

{# {{ macros.imgFigure('./images/registration-required.jpg', 'registration-required') }} #}

{# {{ macros.imgFigure('./images/registered-user.jpg', 'registered-user') }} #}


## Resources

The bot landing:

- https://tubecaster.lilliputten.com/

The source code repository:

- https://github.com/lilliputten/tubecaster-telegram-bot

The bot itself:

- https://t.me/tubecasterbot


## The app is powered by cute animated kitties

{{ macros.imgFigure('./images/fetching-video-details-cat.jpg', 'The kitty is working hard on audio extracting.') }}


