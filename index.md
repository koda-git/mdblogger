---
layout: single
title: "Hello, I'm Koda 👋"

author_profile: true
---

Welcome to my blog where I share insights into my hobbies, interests, and projects. Dive into my latest posts, explore tutorials, and follow along as I document my journey in tech.

## Recent Posts

{% for post in site.posts %}

- [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%B %d, %Y" }}
  {% endfor %}

## About This Blog

This blog is powered by Jekyll and styled with the Minimal Mistakes theme. Here, I cover topics ranging from programming and tech tinkering to personal reflections.

---
