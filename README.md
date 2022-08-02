<p align="center">
  <a href="https://afosto.com"><img src="https://content.afosto.io/5719193282412544/brand/AFO-Logo-compleet-kleur-RGBat4x.png?w=268" alt="Afosto" /></a>
</p>

<h1 align="center">Afosto Instant Search Widget</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/@afosto/instant-search-widget"><img src="https://img.shields.io/npm/v/@afosto/instant-search-widget.svg" alt="npm version"></a>
    <a href="https://github.com/afosto/instant-search-client/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>

<p>
This library is an Afosto instant search javascript widget. With this widget you can easily implement Afosto instant search on your website.
</p>

## Installation

### Yarn / NPM

```sh
# Install with Yarn
yarn add @afosto/instant-search-widget

# Install with NPM
npm install @afosto/instant-search-widget
```


### Browser

This library supports the **last two** versions of major browsers (Chrome, Edge, Firefox, Safari).

```html
<!-- Styles -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@afosto/instant-search-widget@latest/dist/afosto-instant-search-widget.min.css" />

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/@afosto/instant-search-widget@latest/dist/afosto-instant-search-widget.min.js"></script>
```

## Getting started

> To use the widget you will need an Afosto Instant Search search engine. Don't have one yet? Sign up on [Afosto.com](https://afosto.com/register/) and follow [the guides in our documentation](https://afosto.com/docs/apps/instant-search/). 

First you initialize the Afosto search widget with your **search engine key**. This search engine key can be found in the Afosto app.

### ES6

```js
import { AfostoInstantSearchWidget } from '@afosto/instant-search-widget';
import '@afosto/instant-search-widget/dist/afosto-instant-search-widget.min.css';

AfostoInstantSearchWidget.init('my-search-engine-key');
```

### CJS

```js
const { AfostoInstantSearchWidget } = require('@afosto/instant-search-widget');

AfostoInstantSearchWidget.init('my-search-engine-key');
```

### Browser

```html
<script>
    document.addEventListener('DOMContentLoaded', function() {
      AfostoInstantSearchWidget.init('my-search-engine-key');
    });
</script>
```

## Usage

Add an element to your website with a data attribute as shown below.

```html
<button data-af-instant-search>Toggle widget</button>
```

## I18n

The default language used for this widget is English. To use other languages you need to include/import the i18n locale files or add custom messages.

**Important: Load the i18n locale files after the widget.**

### ES6

```js
import { AfostoInstantSearchWidget } from '@afosto/instant-search-widget';
import nl from '@afosto/instant-search-widget/i18n/nl';
import en from '@afosto/instant-search-widget/i18n/en';

AfostoInstantSearchWidget.addMessages('nl', nl);
AfostoInstantSearchWidget.addMessages('en', en);
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/@afosto/instant-search-widget@latest/dist/afosto-instant-search-widget.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@afosto/instant-search-widget@latest/dist/i18n/en.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@afosto/instant-search-widget@latest/dist/i18n/nl.js"></script>
```

### Configure locale

Setup the locale on widget initialization.

```js
// Set the locale for the widget. For this to work properly you need to include the i18n locale files.

AfostoInstantSearchWidget.init('my-search-engine-key', {
  locale: 'en',
});
```

Or change the locale of the widget dynamically.

```js
AfostoInstantSearchWidget.setLocale('en');
```

### Custom messages

If you would like to use your own translation messages, use the addMessages functionality.

**Note:** For the available messages check the [DEFAULT_TRANSLATIONS](https://github.com/afosto/instant-search-widget/blob/master/src/constants.js#L7) constant.

```js
// Don't forget to pay attention to the variables in the translation messages.

AfostoInstantSearchWidget.addMessages('en', {
  close: 'Close',
  filters: {
    noResults: 'No results',
    reset: 'Clear filters',
    showMore: 'Show more',
    showLess: 'Show less',
    title: 'Filters',
  },
  hitsPerPage: {
    optionsLabel: '{value} results',
  },
  search: {
    placeholder: 'Search...',
    resetTitle: 'Clear your search query.',
    submitTitle: 'Submit your search query.',
  },
  stats: {
    resultsLabel: '{value} results found',
  },
});

```

### Customizing the design

The widget is fully customizable with CSS. The layout is built with CSS grid and grid-areas. That means you can move parts of the widget to different place or hide them completely. Check out this article for more explanation on how to customize the widget: [Lightning fast search widget with Afosto Instant Search](https://medium.com/afosto/lightning-fast-search-widget-with-afosto-instant-search-d9391b01ec02)

You can also check this demo from the article. It has a different layout and a dark theme.   
[Afosto Instant Search Widget customization demo](https://codepen.io/gijsbotje/pen/oNppGqj)

## Built with Afosto Instant Search Widget

https://plantcareforbeginners.com/


## Compatibility

- Node >= 14

## License

This project is licensed under the terms of the [MIT license](https://github.com/afosto/instant-search-client/blob/master/LICENSE).
