---
title: "Fixing My Jekyll Blog Styling"
excerpt: "How a simple styling tweak turned into an exploration of the Minimal Mistakes theme internals."
date: 2025-04-29
author: koda
tags: [jekyll, css, web development, troubleshooting]
categories: [Blog]
layout: single
# header:
#   teaser: "/assets/images/sample-teaser.jpg"
#   overlay_image: "/assets/images/sample-header.jpg"
---

## Introduction

After wrapping up my MikroTik setup, I decided to give some attention to my Jekyll blog. What started as a simple styling tweak ended up becoming a deep dive into how the Minimal Mistakes theme works under the hood.

## Initial Problem

- The blog had the base theme running fine, but I wanted a dark theme that matched my portfolio site.
- Tried to override the colors via `custom.scss`, but it caused a SCSS build error (`expected "{"`).
- The icons in the footer (email, GitHub, website) weren’t showing.

## Custom Styling Steps

### 1. Moved Variables to the Right Spot

- Initially had variable declarations in `custom.scss` inside `assets/`, but Jekyll wasn’t reading them properly.
- Created `_sass/custom/variables.scss` to house my custom color variables.

```scss
$background-color: #121212;
$text-color: #ADB7BE;
$link-color: #60a5fa;
$link-hover-color: #1e40af;
```

### 2. Edited `main.scss`

In `assets/css/main.scss`:
```scss
@import "minimal-mistakes/skins/default";
@import "minimal-mistakes";
@import "custom/variables";
```

This ensured my color overrides loaded *after* the base theme.

### 3. Fixed SCSS Compile Error

- The `custom.scss` had `---` front matter, which broke SCSS parsing.
- Removed `---` from any SCSS files that aren’t pages.

### 4. Footer Was Still White

- The rest of the site was themed correctly, but `.site-footer` still had white background and text.
- Turns out, the `footer.html` in `_includes` had hardcoded classes with no reference to global variables.
- Added the following to my `custom.scss`:

```scss
.site-footer {
  background-color: $background-color;
  color: $text-color;
}
```

### 5. Icons Missing — FontAwesome Fix

- The footer icons weren’t rendering, just showing the fallback text ("X").
- Fixed by explicitly adding Font Awesome to my `<head>` in `_includes/head.html`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

## Final Touches

### Title Logic in Head

Cleaned up the tab title logic in the custom `_includes/head.html`:
```liquid
<title>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</title>
```

### Favicon and SEO

- Added `favicon.ico` to the root of the project.
- Included proper `<link rel="icon" href="/favicon.ico">` in head.
- SEO and sitemap plugins are working normally.

## Closing Thoughts

This ended up being a great hands-on refresher with SCSS, Liquid, and how Jekyll themes layer their assets. The Minimal Mistakes theme is flexible, but you do need to understand its structure to override it properly.

Next steps: maybe play around with alternative footer layouts or port the same dark theme to other projects.

