---
layout: article.njk
title: TubeCaster Telegram Bot
hasThumb: true
eleventyNavigation:
  key: tubecaster-telegram-bot
  title: TubeCaster Telegram Bot
  parent: projects-2025
date: 2025-09-27
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2025'
  - telegram
  - bot
  - python
  - flask
  - youtube
  - audio
  - video
  - ffmpeg
  - ffprobe
  - convert
  - online payment
---

<!--
@changed 2025.09.27, 13:25
-->

{% import "macros.njk" as macros with context %}

Tubecaster is a simple telegram bot aimed to convert youtube videos into audio podcasts for later listening (even in offline mode) inside the Telegram app.

## It's a Perfect Solution, if you...

- ...Like to listen to talk shows, music, or even videos, if they contain more conversational content, than action scenes.
- ...Are a pretty busy person, who prefer audio over video or who find it more convenient to listen to podcasts on the go.
- ...Are in a country that blocks YouTube due to censorship or other reasons, but Telegram is still available there (for some reason).

If it's about you, then...

{{ macros.imgFigure('./splash-700.jpg', 'Meet the TubeCaster!', '', '', 'https://tubecaster.lilliputten.com/') }}

## How to use

- **Start chatting** with [@TubeCasterBot](https://t.me/tubecasterbot), use `/start`, `/help` or `/plans` commands if you're there for the first time.
- **Select usage plan.** Use default guest mode or request free plan via the `/become_user`, or buy an advanced usage plan via the `/get_full_access` command.
- **Send YouTube link to the bot.** Share a YouTube clip link from the application or just paste it into the chat. Use `/cast` command to download, or `/info` command to get the clip details.
- **Download and listen.** Download generated MP3 file or listen it right from the chat. Check your status and statistics with `/status` and `/stats` commands.

# Paid/free tariff plans

The user can use a **GUEST** usage plan, available by default, request an experimental **FREE** plan (also free at the moment), or pay for an unlimited **PAID** plan. All the plains details are available in the bot via `/plans` command, or on the bot landing page.

## Key User Features

- Send or share the YouTube link and receive the mp3 file almost immediately (depends on the current processing queue).
- Start downloading or request detailed video information by sharing it directly from the YouTube app or by pasting the video URL manually.
- Get detailed information about the YouTube video.
- Download tracks for listening anywhere, anytime.

## Application Features

- A simple authorization system (via requests and semi-automated confirmation). At some point, we decided to restrict access to the bot only to registered users. Now all the new users are required to send a registration request.
- There is also exists an ability to to pay (via telegram stars) for unlimited access. See pricing details.
- Actual audio length calculation (via ffprobe packets list command). Sometimes the generated files contain incorrect meta information, in which case the only way out is to get real data using ffprobe.
- Large audio files splitting on-the fly. If the file size exceeds the telegram API limit (50MB), it is split into several smaller files before being sent to the user.
- Detecting delays in the processing queue. In this case, repeated messages are periodically (each minute) sent indicating that the request is still being processed.
- Remote realtime logging via http or syslog. It's possible to receive application logs in the realtime on the developer machine during troubleshooting process.
- Different database providers for local development and production via prisma. (It's the only to way to use db on vercel hosting to switch to Postgres.)

## And the most important:

{{ macros.imgFigure('./loading-audio-cat-circle.jpg', 'The kitties is working hard on audio extracting (under the hood).', '', 'max-w-300px rounded-full') }}

- The app is powered by mighty cute animated kitties.

## Tech Insides

- A development branch of yt-dlp used for video processing (fetching info and audio tracks).
- Ffmpeg/ffprobe are used to process audio files.
- The bot itself is implemented using pyTelegramBotAPI v.4 and flask v.3.
- The bot's [landing page](https://tubecaster.lilliputten.com/) is a playground for another tiny toy: the [Gulp LQIP small image placeholder generator](https://github.com/lilliputten/gulp-embed-lqip-as-background) plugin.

## Warnings

The bot accepts only YouTube links at the moment. No TikTok, Vimeo, or any other links are accepted.

The bot allows to retrieve just a few (currently, 3) audio files or video details in the guest state, by default. It's possible to obtain unlimited paid access, or ask for free test mode.

The bot is working in experimental mode and that Google may change its algorithms and API, which may lead to temporary disruptions in the application.

Downloading and processing audio files takes time and may require up to several minutes (it depends on the video size, the active queue size and youtube delays). If the bot has accepted your command for processing and it seems to you that the process has been delayed, please be patient. In case of long-term operations, the bot will send you notifications about the active process every minute.

## Resources

The bot promotional landing: https://tubecaster.lilliputten.com/

The source code repository: https://github.com/lilliputten/tubecaster-telegram-bot

The bot itself: https://t.me/tubecasterbot
