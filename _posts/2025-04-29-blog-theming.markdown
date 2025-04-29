---
title: "Dark Theming My Jekyll Blog the Right Way"
excerpt: "Why trying to shortcut the Minimal Mistakes theme leads to pain, and what finally worked"
date: 2025-04-29
author: koda
tags: [jekyll, scss, minimal-mistakes, blog-dev, portfolio]
categories: [Blog]
layout: single
---

## Introduction

After my friends told me that my blog would burn their eyes like discord light mode, I took the feedback and tried to start work on theming my blog. It just needed to match my portfolio's dark theme. Should’ve been easy, right? 

**Spoiler: it wasn’t.**

This post is a complete breakdown of how I tried to customize the Minimal Mistakes theme, and the mess I had to untangle to make dark mode actually work.

---

## Initial Attempts That Didn't Work

### 1. Repurposing the `neon` Skin

I read the docs. I saw that Minimal Mistakes has a few built-in skins, like `neon`. I thought, “Perfect, I’ll just tweak it.” Copied it, changed a few colors, renamed it.

**Result:** SCSS errors and unexpected styles still leaking through.

Turns out, the skin imports deeply baked-in variables, and half-overriding it messes up more than it fixes.

---

### 2. Declaring SCSS Variables in the Wrong Spot

Next, I thought: I’ll just define my own color variables directly in a file like `assets/css/custom.scss`.

```scss
$background-color: #121212;
$text-color: #ADB7BE;
```

**Result:** Build failed. I assumed it was something simple, like missing `---` front matter at the top of the file  which technically it was, but even fixing that wouldn't have solved the real problem.

The real problems were:

- `assets/css/*.scss` is treated like a full page by Jekyll, not just a snippet to import.
- Full page SCSS files expect front matter `---` at the top, even if it's blank.  
- Even if it *had* compiled, variables defined in `assets/css/` are loaded too late and the Minimal Mistakes theme and skins already import before this point.  

So my nice custom colors would just get ignored anyway
Also, Jekyll doesn't treat files in `assets/css/` the same way as `_sass/` partials. Variables defined there don't get picked up before the theme imports.

So even if it built, my nice custom colors would've been completely ignored anyway.

---

### 3. Partial Overrides in Main SCSS

Next, I brute-forced the styling by editing `main.scss` and trying to override stuff *after* Minimal Mistakes loads.

Then I tried to override the variables in `assets/css/main.scss`:

```scss
@import "minimal-mistakes";

body {
  background-color: #121212;
  color: #ADB7BE;
}
```

**Result:** Mixed success. The body color changed, but the footer and other elements still had the default theme colors. I was overriding the CSS, but not the SCSS variables that Minimal Mistakes uses internally.

---

## Variables and the SCSS Pipeline...

### Moved Colour Variables from My Portfolio into `_sass/custom/variables.scss`

I finally created this clean file variables.scss:

```scss
$background-color: #121212 !default;
$text-color: #ADB7BE !default;
$link-color: #60a5fa !default;
$link-hover-color: #1e40af !default;
$footer-background-color: #121212 !default;
$footer-text-color: #ADB7BE !default;
$footer-link-color: #60a5fa !default;
$footer-link-hover-color: #1e40af !default;

```

### Updated `assets/css/main.scss`

Order matters here:

```scss
@import "custom/variables";              // our stuff
@import "minimal-mistakes/skins/default";
@import "minimal-mistakes";              // theme core
```


### Updated `_includes/head.html`
```html
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
``` 
was needed to load the compiled CSS file and not the remote one inside the theme gem.

Now the footer finally matched the rest of the site.


### Adding a Favicon, Title, Tags, and SEO support to `_includes/head.html`

Dropped a `favicon.ico` in the project root and also added support for titles, meta tags, and SEO

Since we are overwriting the head, we have to manually implement all the stuff that Minimal Mistakes does for us.

> Embedding the code-block here also embeds to the blog post itself, just check the latest git commit for now.

SEO support automatically is handled by the `jekyll-seo-tag` plugin (Do check your plugins section at _config.yml) and is already included in the Minimal Mistakes theme.

Now titles look clean, Font-Awesome icons work great, search engines can find the posts easier and there's a favicon across all pages.


> ⚠️ Overriding `_includes/footer.html` or `_includes/head.html` means **you are now on your own**. If Minimal Mistakes updates upstream, you won't get those changes unless you manually merge them.

### BONUS: Dark Scrollbar & Code Theme

Scrollbar was bright and ugly. Fixed it:

```scss
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: $scrollbar-bg;
}

::-webkit-scrollbar-thumb {
  background-color: $scrollbar-thumb;
  border-radius: 8px;
}
```

And themed code blocks:

```scss
.highlight {
  background: $code-background-color !important;
  color: $code-text-color;
  border-radius: 6px;
  padding: 1em;
  overflow-x: auto;
}

code, tt {
  background-color: $code-background-color;
  color: $code-text-color;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
```

With the colour variables for these elements as

```scss
// Scrollbar colours
$scrollbar-bg: #2b2b2b;
$scrollbar-thumb: #a0a0a0;
$scrollbar-thumb-hover: #c0c0c0;

// Code block colours
$code-background-color: #1e1e1e;
$code-text-color: #d4d4d4;

// Syntax token colours
$token-keyword: #c586c0; // keywords
$token-string: #ce9178; // strings
$token-name: #9cdcfe; // variable and function names
$token-operator: #d4d4d4; // operators
$token-comment: #6a9955; // comments
$token-number: #b5cea8; // numbers
```

---

## In Summary

This was way more involved than expected. The Minimal Mistakes theme is powerful, but customizing it without fully understanding how the skin system and SCSS pipeline work is just asking for frustration.

I tried every shortcut: overriding just colors, patching pieces of CSS, tweaking skins... none of it worked right until I respected the order, structure, and expectations of the theme.

Now that it’s done? Totally worth it. My friends can finally read my blog without sunglasses, and I learned a ton about Jekyll and SCSS in the process.


---
