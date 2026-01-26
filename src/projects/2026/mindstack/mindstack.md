---
layout: article.njk
title: MindStack Memory Trainer
hasThumb: true
eleventyNavigation:
  key: mindstack
  title: MindStack Memory Trainer
  parent: projects-2026
date: 2026-01-26
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2026'
  - nextjs
  - react
  - typescript
  - tailwindcss
  - prisma
  - postgresql
  - next-auth
  - vercel
  - ai
  - stripe
  - i18n
  - memory-training
  - spaced-repetition
  - education
  - webapp
---

<!--
@changed 2026.01.26, 14:38
-->

{% import "macros.njk" as macros with context %}

**[MindStack Memory Trainer](https://mind-stack-trainer.vercel.app/)** is a modern, full-featured web application for memory training and knowledge retention. Built with Next.js 15, it combines spaced repetition algorithms with interactive workouts to help users learn and remember information more effectively.

What started as a simple flashcard app evolved into a comprehensive learning platform with AI integration, multi-language support, and complex payment systems. The journey involved navigating through authentication complexities, database optimizations, and creating an intuitive user experience for a cognitively demanding task.

{{ macros.imgFigure('./opengraph-image-700.jpg', 'MindStack Memory Trainer') }}

## The Challenge: Making Memory Training Actually Work

{{ macros.imgFigure('./shots-v.0.1.0/training-question.jpg', 'Interactive training session with spaced repetition algorithm in action.') }}
{{ macros.imgFigure('./shots-v.0.1.0/training-correct-answer.jpg', 'Immediate feedback after a correct answer with detailed explanation.') }}
{{ macros.imgFigure('./shots-v.0.1.0/training-incorrect-answer.jpg', 'Learning from mistakes with comprehensive answer breakdowns.') }}

Most learning apps focus on content delivery, but MindStack had a different goal: to leverage proven cognitive science techniques (spaced repetition and active recall) in a way that felt seamless and engaging. The technical challenge was twofold:

1. **Implementing effective algorithms** that adapt to individual learning patterns
2. **Creating an intuitive interface** that doesn't get in the way of the learning process

The system needed to track hundreds of data points per user—response times, confidence levels, topic mastery—and use that data to optimize future sessions. All while maintaining a responsive, pleasant user experience.

## Technical Architecture: Next.js 15 Meets Cognitive Science

### The Core Stack

- **Next.js 15 with App Router** -- For server components and optimal performance
- **TypeScript** -- Full type safety across the entire codebase
- **Prisma + PostgreSQL** -- Type-safe database operations with complex relations
- **Tailwind CSS + Radix UI** -- Consistent, accessible design system
- **NextAuth.js** -- Multi-provider authentication (GitHub, Google, Yandex, Email, Telegram)

### Database Challenges

{{ macros.imgFigure('./shots-v.0.1.0/manage-questions-list.jpg', 'Complex question management interface with filtering and bulk operations.') }}
{{ macros.imgFigure('./shots-v.0.1.0/answers-list.jpg', 'Answer management with support for multiple correct answers per question.') }}

Modeling learning data was particularly interesting. A user's progress isn't linear—it decays over time unless reinforced. The database schema had to account for:

- Topic hierarchies and categories
- Question-answer relationships with multiple correct answers
- Workout history with timestamped performance data
- User preferences and learning patterns

## Feature Highlights

### 1. Intelligent Topic Management

{{ macros.imgFigure('./shots-v.0.1.0/topics-categories-filter.jpg', 'Advanced filtering system for finding relevant topics quickly.') }}
{{ macros.imgFigure('./shots-v.0.1.0/topic-manage-list.jpg', 'Topic management dashboard with quick action buttons.') }}
{{ macros.imgFigure('./shots-v.0.1.0/edit-topic-propertes-form.jpg', 'Comprehensive topic editing with metadata and settings.') }}

Creating and organizing learning materials should be as easy as using them. The topic system supports:

- Hierarchical categorization with unlimited nesting
- Multi-language content (questions and answers can be in different languages)
- Public/private sharing controls
- AI-assisted content generation

### 2. AI-Powered Content Creation

{{ macros.imgFigure('./shots-v.0.1.0/ai-generate-questions-form.jpg', 'AI question generation interface with topic context and customization options.') }}
{{ macros.imgFigure('./shots-v.0.1.0/ai-generate-answers-form.jpg', 'AI-powered answer generation with multiple format options.') }}

One of the biggest barriers to using memory training apps is content creation. MindStack solves this with integrated AI:

- Generate questions from text descriptions
- Create answer variations automatically
- Suggest related topics and categories

The AI integration uses multiple providers (GigaChat and Cloudflare Workers AI) with fallback mechanisms to ensure reliability.

### 3. Multi-Provider Authentication

{{ macros.imgFigure('./shots-v.0.1.0/signin-popup-dark.jpg', 'Clean authentication modal with multiple provider options.') }}
{{ macros.imgFigure('./shots-v.0.1.0/top-navigation-wth-opened-user-menu.jpg', 'User menu with role-based options and quick access.') }}

Getting authentication right was crucial. The app supports:

- Traditional OAuth (GitHub, Google, Yandex)
- Email/password with verification
- Telegram bot authentication via OTP
- Guest access with limited functionality

The system maintains session consistency across all providers and handles edge cases like account linking and recovery.

### 4. International Payments Integration

Monetizing a global app means handling different payment ecosystems:

- **Stripe** for international users
- **YooKassa** for Russian users (due to sanctions)
- **Telegram Stars** for future integration (not implemented as on 2026.01)

Each system has different webhook patterns, currency handling, and compliance requirements. The payment system is built to be extensible for future payment methods.

### 5. Workout Engine

{{ macros.imgFigure('./shots-v.0.1.0/training-questions-with-code-blocks.jpg', 'Code snippet support in questions with syntax highlighting.') }}
{{ macros.imgFigure('./shots-v.0.1.0/training-finished.jpg', 'Workout completion screen with performance summary and insights.') }}
{{ macros.imgFigure('./shots-v.0.1.0/training-overview.jpg', 'Training overview dashboard showing progress across all topics.') }}
{{ macros.imgFigure('./shots-v.0.1.0/trainings-list.jpg', 'Training history with filtering and search capabilities.') }}
{{ macros.imgFigure('./shots-v.0.1.0/trainings-item.jpg', 'Detailed view of a single training session with statistics.') }}

The heart of the application is the workout engine, which implements:

- Adaptive difficulty based on performance
- Spaced repetition scheduling
- Progress tracking with detailed analytics
- Support for various question types (multiple choice, free text, code blocks)

## Development Insights

### Internationalization from Day One

{{ macros.imgFigure('./shots-v.0.1.0/settings-page.jpg', 'User settings panel with language selection and theme options.') }}

The app supports English, Spanish, and Russian out of the box, with architecture that makes adding new languages straightforward. Every UI element, category name, and system message is translatable.

### Performance Optimizations

- **Image optimization**: Next.js Image component with automatic format selection
- **Database indexing**: Strategic indexes on frequently queried fields
- **Caching strategy**: React Query for server state, Zustand for client state
- **Code splitting**: Dynamic imports for heavy components like the workout engine

### Testing Strategy

The testing approach evolved as the app grew:

- Unit tests for core algorithms (spaced repetition calculations)
- Integration tests for API endpoints
- E2E tests for critical user flows (signup → create topic → workout)
- Visual regression tests for UI components

## Technical Challenges Overcome

### 1. Real-time Progress Tracking

Updating user progress during workouts while maintaining performance required careful optimization. The solution involved:

- Batch updates for frequent small changes
- Optimistic UI updates for immediate feedback
- Background sync for non-critical data

### 2. Complex State Management

Between workout state, user preferences, and real-time updates, state management got complex. The hybrid approach (React Query + Zustand + Context) provided the right balance of simplicity and power.

### 3. Deployment Pipeline

{{ macros.imgFigure('./shots-v.0.1.0/vercel-deployment-panel.jpg', 'Vercel Deployment Panel.') }}

With multiple environments (development, staging, production) and database migrations, the deployment process needed to be bulletproof. The solution includes:

- Automated database migrations with rollback support
- Environment-specific configuration
- Health checks and monitoring

## Category and Content Management

{{ macros.imgFigure('./shots-v.0.1.0/categories-list.jpg', 'Main categories view with visual indicators and statistics.') }}
{{ macros.imgFigure('./shots-v.0.1.0/categories-filter.jpg', 'Advanced category filtering with multiple criteria.') }}
{{ macros.imgFigure('./shots-v.0.1.0/add-new-category-form.jpg', 'Category creation form with validation and preview.') }}
{{ macros.imgFigure('./shots-v.0.1.0/manage-categories-list.jpg', 'Category management interface for administrators.') }}
{{ macros.imgFigure('./shots-v.0.1.0/topic-for-category-list.jpg', 'Topics organized within a specific category.') }}

Organizing learning materials is half the battle. The category system allows for:

- Custom categorization beyond the 12 default categories
- Tag-based organization for cross-cutting topics
- Bulk operations for content management

## The Results

{{ macros.imgFigure('./shots-v.0.1.0/edit-answer-form.jpg', 'Answer editing interface with rich text formatting options.') }}
{{ macros.imgFigure('./shots-v.0.1.0/esit-question-form.jpg', 'Question editing with support for multimedia attachments.') }}
{{ macros.imgFigure('./shots-v.0.1.0/topics-item.jpg', 'Individual topic view with metadata and quick actions.') }}

MindStack successfully combines:

- **Cognitive science** -- Effective learning techniques
- **Modern web tech** -- Performance and reliability
- **User-centric design** -- Intuitive, pleasant experience

The application handles everything from AI content generation to complex payment processing, all while maintaining a focus on what matters most: helping people learn and remember.

## Lessons Learned

1. **Start with internationalization** -- Adding languages later is painful
2. **Type everything** -- TypeScript caught countless bugs early
3. **Test the hard parts first** -- The workout engine was tested from day one
4. **Design for extension** -- The payment system needed to handle unexpected requirements

## What's Next

The MVP is live, but there's plenty more to build:

- Mobile app with offline support
- Collaborative topic creation
- Advanced analytics and insights
- Social features and community challenges

## Try It Yourself

- **Vercel Deployment**: [https://mind-stack-trainer.vercel.app/](https://mind-stack-trainer.vercel.app/)
- **Live Application**: [https://mindstack.lilliputten.com/](https://mindstack.lilliputten.com/)
- **GitHub Repository**: [https://github.com/lilliputten/mindstack/](https://github.com/lilliputten/mindstack/)

---

_MindStack represents the intersection of modern web development and practical cognitive science. It's not just another flashcard app—it's a system designed to help knowledge actually stick, using technology to enhance human learning capabilities._
