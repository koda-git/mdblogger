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

Here, I cover topics ranging from programming and tech tinkering and other things that I find interesting. I hope you find something useful or interesting here.

---
