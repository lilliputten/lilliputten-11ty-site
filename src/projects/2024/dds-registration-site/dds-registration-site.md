---
layout: article.njk
title: A Django site to manage DdS membership and event registration
thumbDescription: I participated as a hired developer in the creation of a simple site designed to manage DdS membership and event registration. The application is purposed to simplify the conduction of seminars and other events held by the non-profit association Départ de Sentier.
hasThumb: true
eleventyNavigation:
  key: dds-registration-site
  title: DdS Events Site
  parent: projects-2024
date: 2024-04-09
showNavigationBreadcrumbs: true
tags:
  - projects
  - '2024'
  - dds
  - registration
  - application
  - python
  - django
  - bootstrap
  - stripe
  - django-registration
  - fpdf2
  - sendgrid
  - gulp.js
---

<!--
@changed 2024.06.23, 02:58
-->

{% import "macros.njk" as macros with context %}

## The project

In the spring of 2024, I participated as a hired developer in the creation of a simple [Django](https://www.djangoproject.com/) application intended to manage [DdS](https://www.d-d-s.ch/) membership and event registration.

The application was conceived by my upwork client [Chris Mutel](https://chris.mutel.org/) to simplify the conduction of seminars and other events held by his non-profit association [Départ de Sentier (DdS)](https://www.d-d-s.ch/).

## The task

I've developed a simple design based on the [style guides and ideas](https://github.com/Depart-de-Sentier/dds-logo) of DdS and created client pages layout, based on Bootstrap toolkit and Django templating system (using crispy-bootstrap for forms generation).

I developed the first versions of the Django application and participated in the development of some subsystems.

Tasks that I participated in or completed on my own:

- The design and general layout of the site.
- The authorization system, including modification of embedded Django system to identify users by e-mails instead of identifiers ([django-registration](https://django-registration.readthedocs.io/) package has been used).
- Accepting payments via [Stripe](https://stripe.com/) (using Payment Intent method).
- On-the-fly generation of PDF documents for invoicing using [FPDF2](https://pypi.org/project/fpdf2/) library.
- Sending messages to users by email using [Sendgrid](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/django).

I finished my participation in the project in early April 2024 due to some incomprehensible misunderstandings with my partner.

## Technologies used

- [Django](https://www.djangoproject.com/) v.5.0
- [Bootstrap](https://getbootstrap.com/) v.5.3.2
- [Stripe](https://stripe.com/) v.3.1.0
- [django-registration](https://django-registration.readthedocs.io/) v.3.4
- [FPDF2](https://pypi.org/project/fpdf2/) v.2.7.8
- [Sendgrid](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/django) v.6.11.0
- [gulp.js](https://gulpjs.com/) v.4.0.2

## Site screenshots

### Main page

{{ macros.imgFigure('./images/MainWindowView.png', 'The actual view of the main window of the site.') }}
{{ macros.imgFigure('./images/MainPageWithAvailableEvent.png', 'The main page with an available event in development mode.') }}

### Event registration

{{ macros.imgFigure('./images/EventRegistrationForm.png', 'Registration form for the event (demo application).') }}
{{ macros.imgFigure('./images/EventRegistrationMailMessage.png', 'An e-mail message about the registration of the event.') }}

### Profile page

{{ macros.imgFigure('./images/ProfilePageWithNewRegistration.png', 'Profile page with a new registration.') }}
{{ macros.imgFigure('./images/ProfileEditPage.png', 'User profile editing page.') }}

### Admin site (demo)

{{ macros.imgFigure('./images/AdminPageView.png', 'General view of the Django admin page.') }}
{{ macros.imgFigure('./images/AdminSingleRegistrationEdited.png', 'Active registrations list (demo application).') }}
{{ macros.imgFigure('./images/AdminEditRegistration.png', 'Registration record page (demo application).') }}

## Login/logout

{{ macros.imgFigure('./images/ProfileLoginForm.png', 'Profile login form.') }}
{{ macros.imgFigure('./images/ProfileSignupForm.png', 'Profile signup form.') }}
{{ macros.imgFigure('./images/ProfilePasswordResetForm.png', 'Profile password reset form.') }}
{{ macros.imgFigure('./images/MembershipApplyForm.png', 'Membership application form.') }}

## Links

- The public [DdS Events](https://events.d-d-s.ch/) site.
- The [github repository](https://github.com/sentier-dev/dds_registration).
- [Départ de Sentier (DdS)](https://www.d-d-s.ch/)
