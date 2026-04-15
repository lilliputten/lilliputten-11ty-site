---
layout: article.njk
title: MindStack - Personal Knowledge Training Platform
hasThumb: true
eleventyNavigation:
  key: mindstack
  title: MindStack - Personal Knowledge Training
  parent: projects-2026
date: 2026-04-15
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2026'
  - ai
  - knowledge training
  - spaced repetition
  - personal learning
  - question generation
  - memory training
  - ai-powered learning
  - dataset creation
  - next.js
  - next-auth
  - next-intl
  - react
  - typescript
  - prisma
  - postgresql
  - stripe
  - vercel
  - langchain
  - gigachat ai
  - cloudflare ai
  - tailwind css
  - radix ui
  - cosmos
  - zod schemas
  - wasm
  - porter stemmers
  - typescript
---

nextjs
react
typescript
tailwindcss
prisma
postgresql
vercel
ai
stripe
i18n
knowledge-training
spaced-repetition
personal-learning
dataset-creation
webapp

<!--
@changed 2026.04.15, 05:30
-->

{% import "macros.njk" as macros with context %}

**[MindStack](https://mindstack.lilliputten.com/)** is a personal knowledge training platform that helps you turn your own expertise into repeatable, AI-assisted learning systems. Built with Next.js 15, it combines in-place editing, duplicate detection, and generation control to create high-quality training datasets from your work materials, study subjects, or technical references.

Unlike generic memory training apps, MindStack emphasizes **you control the workflow**—from initial idea through AI-assisted generation to final approved training content. The platform provides structured hierarchy (Categories → Topics → Questions → Answers), privacy-first design, and multi-language support for creating personal or shareable knowledge bases.

{{ macros.imgFigure('./opengraph-image-700.jpg', 'MindStack - Personal Knowledge Training Platform') }}

## The Vision: Turn Your Knowledge Into Repeatable Trainings

MindStack was built around a core principle: **your knowledge deserves better than generic flashcards**. Instead of using pre-made courses, you build personal training systems from your real materials. The platform balances powerful AI assistance with complete user control:

1. **Create from your own data** - Work documents, study notes, technical docs, or any subject matter
2. **Generate with AI, approve manually** - AI drafts questions and answers, but nothing saves without your explicit approval
3. **Maintain quality with smart tools** - Duplicate detection, in-place editing, and structured workflows keep datasets clean
4. **Train effectively with spaced repetition** - Practice what matters with algorithms that adapt to your performance

The result is a platform that feels like a personal knowledge assistant—helping you capture, structure, and master your own expertise.

## Technical Architecture: Modern Stack for Personal Learning

### The Core Stack

- **Next.js 15 with App Router**—Server components for optimal performance and SEO
- **TypeScript**—Full type safety across frontend, backend, and database layers
- **Prisma + PostgreSQL**—Type-safe database operations with complex topic-question-answer hierarchies
- **Tailwind CSS + Radix UI**—Accessible, consistent design system with dark mode support
- **React Query + Zustand**—Efficient server state management and client-side stores
- **Cloudflare Workers AI + GigaChat**—Multi-provider AI generation with fallback mechanisms

### Database Design for Learning Hierarchies

{{ macros.imgFigure('./features-v.0.1.3/categories.jpg', 'Category system for organizing topics by subject area. (v.0.1.3)') }}
{{ macros.imgFigure('./features-v.0.1.4/topics-list.jpg', 'Topics list showing private/public status and metadata. (v.0.1.4)') }}
{{ macros.imgFigure('./features-v.0.1.4/topic-categories.jpg', 'Topic-category relationships for flexible organization. (v.0.1.4)') }}

Modeling personal knowledge required careful schema design:

- **Hierarchical structure**: Categories contain Topics, which contain Questions, which have multiple Answers
- **Privacy controls**: Each topic has public/private visibility settings
- **Multilingual support**: Content language tracking for filtering and discovery
- **Performance tracking**: Workout history with timestamped results and spaced repetition data
- **User ownership**: Clear relationships between creators, topics, and generated content

## Feature Highlights

### 1. In-Place Editing with HeadlessEditor

{{ macros.imgFigure('./features-v.0.1.4/edit-topic-questions-and-answers.jpg', 'In-place editing with HeadlessEditor - edit questions and answers without context switching. (v.0.1.4)') }}
<!--
{{ macros.imgFigure('./features-v.0.1.0/settings-page.jpg', 'Settings with the opened theme selector. (v.0.1.0)') }}
-->

Editing shouldn't require modal dialogs or context switches. The HeadlessEditor provides:

- Rich text formatting (bold, lists, code blocks, links)
- Drag-and-drop reordering of questions and answers
- Real-time preview of changes
- GitHub Flavored Markdown support
- Keyboard shortcuts for power users

**Benefit:** Reduces friction in the refinement process, making it easy to iterate on content quality.

### 2. AI Generation with Full Control

{{ macros.imgFigure('./features-v.0.1.4/generate-questions-dialog.jpg', 'AI-powered question generation with full review and approval workflow. (v.0.1.4)') }}

AI assists but never replaces your judgment. The generation workflow:

1. Provide a brief description of what you want to cover
2. AI generates draft questions and answers
3. Review each item individually:
   - ✅ Approve to save to your topic
   - ✏️ Edit before approving
   - 🔄 Regenerate if unsatisfied
   - ❌ Delete irrelevant items
4. Only approved items are saved to your database

**Key difference:** Generated content stays in "draft" mode until you explicitly approve it. You maintain full editorial control.

### 3. Duplicate Detection (Beta)

{{ macros.imgFigure('./features-v.0.1.4/questions-comparison.jpg', 'Duplicate detection (beta) helps maintain dataset quality by flagging similar items. (v.0.1.4)') }}

When adding or generating new questions, MindStack compares them against existing items:

- Uses n-gram similarity algorithms with multilingual lemmatization
- Flags items with ≥25% similarity score
- Shows you potential duplicates before saving
- You decide: merge, rephrase, or keep both

**Current limitations:** Detects lexical similarity (same/similar words), not semantic meaning (same idea, different words). Improvements planned with vector embeddings.

### 4. Privacy-First Design

{{ macros.imgFigure('./features-v.0.1.4/topics-list.jpg', 'Topics show privacy status - private by default, public only when you choose. (v.0.1.4)') }}

Your knowledge is yours unless you choose to share:

- **Private by default** - New topics are only visible to you
- **Optional sharing** - Make topics public to contribute to the community
- **Change anytime** - Toggle privacy settings as needed
- **Ideal for sensitive content** - Work materials, proprietary knowledge, personal notes

Use cases for private topics:
- Job-related training materials
- Proprietary technical knowledge
- Personal study notes
- Sensitive subject matter

### 5. Multi-Language Support

MindStack supports global users from day one:

- Interface translations: English, Russian, Spanish
- Content language tracking per topic
- Filter trainings by preferred language
- AI generation in supported languages
- Easy addition of new interface languages

Perfect for language learners or studying materials in different languages.

### 6. Structured Organization

{{ macros.imgFigure('./features-v.0.1.0/add-new-category-form.jpg', 'New category suggestion popup. (v.0.1.0)') }}

Keep your knowledge base manageable at any scale:

```python
Categories (broad subjects)
  └─ Topics (specific areas within categories)
      └─ Questions (individual queries)
          └─ Answers (one or more per question)
```

Example:
```python
Programming Languages
  └─ Python Basics
      ├─ What is a list comprehension?
      │   └─ A concise way to create lists in Python...
      └─ How do you handle exceptions?
          └─ Using try-except blocks...
```

This hierarchy works whether you have 10 or 1000 items.

## Development Insights

### Internationalization Architecture

Built i18n from the ground up with next-intl:

- Server-side locale detection
- Client-side language switching
- All UI elements translatable via JSON files
- Category names and system messages fully localized
- Easy to add new languages (just add JSON file)

### Performance Optimizations

- **Image optimization**: Next.js Image component with automatic format selection and lazy loading
- **Database indexing**: Strategic indexes on frequently queried fields (user_id, category_id, language)
- **Caching strategy**: React Query for server state with automatic refetching, Zustand for client state
- **Code splitting**: Dynamic imports for heavy components (workout engine, editors)
- **PWA capabilities**: Offline training sessions with service worker caching

### Authentication Flexibility

{{ macros.imgFigure('./features-v.0.1.0/signin-popup-dark.jpg', 'Signin popup window with all the auth-providers (OAuth and OTP) suggested. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/top-navigation-wth-opened-user-menu.jpg', 'User menu with user info, settings, delete account and sign out buttons. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/settings-page.jpg', 'Settings with the opened theme selector. (v.0.1.0)') }}

Multiple login options for different user preferences:

- **OAuth providers**: Google, GitHub, Yandex
- **OTP methods**: Email verification codes, Telegram bot authentication
- **Guest access**: Browse public topics without account (limited functionality)
<!--
- **Account linking**: Connect multiple auth methods to same account
-->

### Payment System Integration

{{ macros.imgFigure('./features-v.0.1.0/payments-pricing.jpg', 'Pricing for the different tarif plans. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/payments-choose-payment-system.jpg', 'Choosing payment method. (v.0.1.0)') }}

Global monetization requires regional payment support:

- **Stripe** for international users (credit cards, Apple Pay, Google Pay)
- **YooMoney** for Russian market (local cards, Sberbank Online, Tinkoff)
- **Subscription management**: Monthly/annual billing, prorated upgrades/downgrades
- **Webhook handling**: Robust payment confirmation and cancellation processing

## Technical Challenges Overcome

### 1. Nested Data Operations with Prisma

Creating/updating topics with nested questions and answers required careful Prisma usage:

- Filter out temporary IDs before submission
- Use `include` to fetch real IDs after creation
- Map temporary IDs to real IDs for frontend updates
- Incremental updates: combine `deleteMany`, `create`, and `update` in single calls
- Avoid full delete-recreate to preserve answer IDs and improve performance

### 2. State Management Complexity

Between workout state, editor state, user preferences, and real-time updates:

- **React Query**: Server state with caching, background refetching, request aborting
- **Zustand**: Client state for UI interactions and temporary data
- **Context API**: Theme, locale, authentication state
- **Custom hooks**: Encapsulate complex logic (useHeadlessEditorState, useWorkoutSession)

### 3. Spaced Repetition Algorithm

{{ macros.imgFigure('./features-v.0.1.0/training-overview.jpg', 'Training progress and statistics window. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/trainings-list.jpg', 'Active trainings list. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/training-correct-answer.jpg', 'Training step: displayed progress bar, a question, two answers, one of them marked as correctly answered. (v.0.1.0)') }}
{{ macros.imgFigure('./features-v.0.1.0/training-questions-with-code-blocks.jpg', 'Question with code examples in suggested answers. (v.0.1.0)') }}

Implementing effective learning schedules:

- Track answer accuracy and response time
- Calculate optimal review intervals based on performance
- Adjust difficulty dynamically
- Handle edge cases (long gaps, rapid success/failure streaks)
- Store workout history for analytics

### 4. Deployment Pipeline

{{ macros.imgFigure('./features-v.0.1.0/vercel-deployment-panel.jpg', 'Vercel deployment panel. (v.0.1.0)') }}

Multi-environment setup with database migrations:

- Automated migrations with rollback support
- Environment-specific configuration (dev, staging, production)
- Health checks and error monitoring
- Zero-downtime deployments on Vercel

## The Results

At its core, MindStack delivers on its promise:

- **Personal-first approach** - Create from your own knowledge, not generic courses
- **Generation control** - Review and approve every AI-generated item
- **Quality maintenance** - Duplicate detection and in-place editing keep datasets clean
- **Privacy by default** - Your data stays private unless you choose to share
- **Structured hierarchy** - Organized knowledge that scales from 10 to 1000+ items

The application handles everything from AI content generation to complex payment processing, all while maintaining focus on what matters: helping you capture and master your own expertise.

## Lessons Learned

1. **Positioning matters** - Clear value proposition ("turn your knowledge into trainings") resonates more than generic features
2. **Control builds trust** - Users want AI assistance, not AI automation. Always let them review and approve
3. **Start with i18n** - Adding languages later is exponentially harder
4. **Type everything** - TypeScript caught countless bugs in nested data structures
5. **Design for extension** - Payment system needed to handle unexpected regional requirements
6. **Document beta features** - Be honest about limitations (duplicate detection) and future plans

## What's Next

The foundation is solid, with exciting features planned:

- **Mobile app** with offline support for training on the go
- **Advanced analytics** with visualizations and personalized recommendations
- **Collaborative features** for team knowledge bases
- **Vector similarity search** for improved duplicate detection
- **API access** for programmatic topic management
- **Community challenges** and social learning features

## Try It Yourself

- **Live Application**: [https://mindstack.lilliputten.com/](https://mindstack.lilliputten.com/)
- **Vercel Deployment**: [https://mind-stack-trainer.vercel.app/](https://mind-stack-trainer.vercel.app/)
- **GitHub Repository**: [https://github.com/lilliputten/mindstack/](https://github.com/lilliputten/mindstack/)
- **Documentation**: [https://mindstack.lilliputten.com/docs](https://mindstack.lilliputten.com/docs)

---

**Technologies:** Next.js 15, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Cloudflare Workers AI, GigaChat, Stripe, YooMoney, Radix UI, React Query, Zustand, next-intl

**Role:** Full-stack development, architecture design, AI integration, payment systems, internationalization

**Timeline:** January 2026 - Present (ongoing development)
