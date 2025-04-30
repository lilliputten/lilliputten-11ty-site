---
layout: article.njk
title: A recipe for adding a Django flatpages application with context change support, i18n and a rich content editor
hasThumb: true
eleventyNavigation:
  key: django-flatpages-based-cms
  title: Windows shortcut to toggle MongoDB service
  parent: articles
date: 2025-04-05
showNavigationBreadcrumbs: true
tags:
  - articles
  - '2025'
  - django
  - python
  - flatpage
  - ckeditor
  - internalization
  - custom
---

<!--
@changed 2025.04.30, 16:50
-->

{% import "macros.njk" as macros with context %}

Here is a short guide on converting a django application into a kind of cms editor that supports internalization and advanced editing. Perhaps it will be necessary only for myself, so as not to forget in the future.

Of course, it is absolutely possible to turn your django application into something cms-like, similar to a cms editor, using the stock django [flatpages app](https://docs.djangoproject.com/en/5.1/ref/contrib/flatpages/).

But it's not very convenient for the end user if you use it "as is".

So, we'll try to do the following:

- Add flatpages app.
- Add [django-ckeditor-5](https://pypi.org/project/django-ckeditor-5/).
- Extend the data model to support internationalization of the cms database via [django-translated-fields](https://pypi.org/project/django-translated-fields/).
- Override some code fragments to allow passing the context to a flatpage renderer (as it isn't supported byu default at the moment, for some reason).

So, in general, we can follow the instructions in the [flatpages app](https://docs.djangoproject.com/en/5.1/ref/contrib/flatpages/) manual, with some differencies and additions.

As an example, I will consider my recent django project, [The March Cat Tales](/projects/2025/march-tales/). See also the project's [repository](https://github.com/lilliputten/march-tales/) and deployed [public site](https://tales.march.team/).


## The result

Finally, you'll have got a neat and user-friendly user interface like this:

{{ macros.imgFigure('./images/flat-pages-list.jpg', 'Flat pages list in the admin panel.') }}

{{ macros.imgFigure('./images/admin-ui-with-an-editor.jpg', 'Nice and neat twin internationalized editors.') }}

## Adding the flatpages app and the ckeditor extension

Add [flatpages](https://docs.djangoproject.com/en/5.1/ref/contrib/flatpages/) and [ckeditor](https://pypi.org/project/django-ckeditor-5/) as described in their manual.

So, you'll have to add smth like this into your `settings.py` (you can take a look at [mine](https://github.com/lilliputten/march-tales/blob/main/tales_django/settings.py) for reference):

```python
INSTALLED_APPS = [
    ...
    'django.contrib.flatpages',
    'django_ckeditor_5',

...

MIDDLEWARE = [
    ...
    # Instead of stock 'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware', see below
    'tales_django.entities.flatpages.middleware.FlatpageFallbackMiddleware',
]

...

# Pointing to the context getter, see below
FLATPAGE_CONTEXT_GETTER = 'tales_django.get_flatpages_context.get_flatpages_context'
# Default flatpage template
FLATPAGE_DEFAULT_TEMPLATE = 'tales_django/flatpage.html.django'

...

# File storage class, see below
CKEDITOR_5_FILE_STORAGE = 'tales_django.ckeditor_storage.ckeditor_storage'
# Permissions, possible values are: 'staff', 'authenticated', 'any'
CKEDITOR_5_FILE_UPLOAD_PERMISSION = 'staff'
# Allow to dynamically change ckeditor locale
CKEDITOR_5_USER_LANGUAGE = True

CKEDITOR_5_CONFIGS = {
    'default': {
        # Set your toolbars and other stuff here
```

(Also ensure that `django.contrib.sites` is included and `SITE_ID` has been set up.)

[ckeditor_storage](https://github.com/lilliputten/march-tales/blob/main/tales_django/ckeditor_storage.py) provides only a folder path to store uploaded files.

Keep in mind that it's impossible to use server browser features in a free version of ckeditor v.5 as all of therequired plugins ([ckbox](https://ckeditor.com/docs/ckeditor5/latest/features/file-management/ckbox.html) or [ckfinder](https://ckeditor.com/docs/ckeditor5/latest/features/file-management/ckfinder.html)) aren't be included in the build, because they're a part of premium features. See the section "Includes the following ckeditor5 plugins..." in the [django-ckeditor-5 quick reference](https://pypi.org/project/django-ckeditor-5/).

See the "Using file managers" section in the [CKEditor Ecosystem Documentation](https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/using-file-managers.html): _"CKBox and CKFinder are both premium features. Contact us to receive an offer tailored to your needs."_

But if you have a license key, you can create your own configuration and use it in a js-based initalization. See the "Creating a CKEditor5 instance from javascript" section in the [django-ckeditor-5 reference](https://pypi.org/project/django-ckeditor-5/).

## Extending the FlatPage data model

We're going to add a [tales_django/entities/App/models/FlatPage.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/App/models/FlatPage.py) in order to add translated title and content fields:

```python
class FlatPage(BaseFlatPage):
    class Meta:
        db_table = 'tales_django_flatpage'
        verbose_name = _('Flat page')
        verbose_name_plural = _('Flat pages')

    page_title = TranslatedField(models.CharField(_('Page title'), max_length=200, default=''))
    page_content = TranslatedField(CKEditor5Field(_('Page content'), blank=True, default=''))

    updated_at = models.DateField(verbose_name=_('Updated at'), auto_now=True)

```

We use different fields names (those ones will be automatically translated by [django-translated-fields](https://pypi.org/project/django-translated-fields/)) and a db name, and also added a field `updated_at` to provide time stamps for sitemap generation.

Of course, it's possible to add any other required fields here.

Also added admin model [FlatPageAdmin.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/flatpages/admin/FlatPageAdmin.py) and form [FlatPageForm.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/flatpages/forms/FlatPageForm.py).

## Overriding stock flatpages components

We'll use our own implementation of flatpages' [views.py](https://github.com/django/django/blob/stable/5.2.x/django/contrib/flatpages/views.py) module to allow passing a `FLATPAGE_CONTEXT_GETTER` parameters form the application settings.

Also we'll have to use our own versions of `middleware.py` and `urls.py` to support these changes.

These files will be located in the [tales_django/entities/flatpages](https://github.com/lilliputten/march-tales/tree/main/tales_django/entities/flatpages) folder.

The [middleware.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/flatpages/middleware.py) module will contain almost exact copy of the stock `FlatpageFallbackMiddleware` to process page rendering queue and process flat pages. Also, the [urls.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/flatpages/urls.py) will point the router to our own `flatpage` view, contained in the [views.py](https://github.com/lilliputten/march-tales/blob/main/tales_django/entities/flatpages/views.py).

The main change -- is a `get_context` function, which dynamically retrieves additional context data for flatpage templates:

```python
def get_context(request: HttpRequest, flatpage: FlatPage):
  ...
```

This function provides a flexible way to add dynamic context data to flatpage
templates without modifying the core flatpage rendering logic. It works by:

1. Reading the `FLATPAGE_CONTEXT_GETTER` setting, which should be a string path to a callable that generates context data.
2. Dynamically importing and calling that function with the current `request` and `flatpage` objects.
3. Returning the resulting context dictionary to be merged with the base context in the `render_flatpage` function.

Parameters:

- `request (HttpRequest)`: The current HTTP request object.
- `flatpage (FlatPage)`: The flatpage object being rendered.

Two additional settings' parameters are introduced:

- `FLATPAGE_CONTEXT_GETTER`: An optional string path to a callable that
  provides additional context for flatpage templates. It follows Django's
  pattern of dynamic imports for configuration. The function should accept the
  current request and flatpage objects (`request: HttpRequest, flatpage:
FlatPage`) as parameters and return a context dictionary. Example:
  `tales_django.flatpages_context.get_flatpages_context`.

- `FLATPAGE_DEFAULT_TEMPLATE`: A default template used to render flatpages when
  the FlatPage model does not specify a specific template for a page. This
  serves as a site-wide default template for all flatpages. The template should
  be located in the templates directory and follow Django's template naming
  conventions. Example: `app/flatpage.html`. Default value: `flatpages/default.html`.

We'll have to add `FlatpageFallbackMiddleware` to the `MIDDLEWARE` list in the `settings.py`, as it was exposed above (our app name is `tales_django`, for a record):

```python
MIDDLEWARE = [
    ...
    'tales_django.entities.flatpages.middleware.FlatpageFallbackMiddleware',
```

And next, we have to add the router entry for a url pattern entry (in `tales_django/entities/App/app_urlpatterns.py`):

```python
app_urlpatterns = [
    ...
    path(r'/', include('tales_django.entities.flatpages.urls'), name='django.contrib.flatpages.views.flatpage'),
```

(Our flatpages will be served directly from the root of the site.)

## Another minor additions

Also were added:

- Custom [styles](https://github.com/lilliputten/march-tales/blob/main/static/unfold-fixes/unfold-fixes.css) and [JS codes](https://github.com/lilliputten/march-tales/blob/main/static/unfold-fixes/unfold-fixes.js) to modify stock flatpage ones.

## Pass a context to template

Use smth like this to pass your data to a template (see the usage below):

```python
def get_flatpages_context(request: HttpRequest, flatpage: FlatPage):
    return {'your_data': 'Ok'}
```

This module mentioned in a `FLATPAGE_CONTEXT_GETTER` settings parameter as `tales_django.flatpages_context.get_flatpages_context`

## Create a template for the flat pages

You can specify the template location in the settings parameter `FLATPAGE_DEFAULT_TEMPLATE` or in your data model on a per-page basis.

To access the database properties you can use:

```django
{% verbatim %}<h1 class="page-title">
  {{ flatpage.flatpage.page_title }}
</h1>

<div class="data-example">
  Your context data: {{ your_data }}
</div>

<div class="text-content">
  {{ flatpage.flatpage.page_content|safe }}
</div>{% endverbatim %}
```

This template set with a `FLATPAGE_DEFAULT_TEMPLATE` settings parameter.

## Sitemap support

You can use the following recipe to add your flatpages with timestamps to the sitemap:

```python
from django.contrib.flatpages.sitemaps import FlatPageSitemap

class CustomFlatPageSitemap(FlatPageSitemap):
    changefreq = 'weekly'

    def lastmod(self, obj):
        return obj.flatpage.updated_at

sitemaps = {
    ...
    'flatpages': CustomFlatPageSitemap,

app_urlpatterns = [
    ...
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),

...
```

See django [sitemap framework reference](https://docs.djangoproject.com/en/5.1/ref/contrib/sitemaps/) for more details.

## A PR into the Django project

I also created a [pull request](https://github.com/django/django/pull/19344) into the django project to allow
passing a context and setting a default template with the stock django flatpage application.

## Links

- [django-ckeditor-5](https://pypi.org/project/django-ckeditor-5/)
- [CKBox Plugin](https://ckeditor.com/docs/ckeditor5/latest/features/file-management/ckbox.html)
- [CKFinder Plugin](https://ckeditor.com/docs/ckeditor5/latest/features/file-management/ckfinder.html)
- [django-translated-fields](https://pypi.org/project/django-translated-fields/)
- [Flatpages App](https://docs.djangoproject.com/en/5.1/ref/contrib/flatpages/)
- [Sitemap framework reference](https://docs.djangoproject.com/en/5.1/ref/contrib/sitemaps/)
- [Django Project Repository](https://github.com/django/django/)
