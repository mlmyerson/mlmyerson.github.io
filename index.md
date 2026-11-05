---
layout: splash
permalink: /
title: "Michael Myerson"
header:
  overlay_color: "#0b0f1a"
  overlay_filter: 0.4
  actions:
    - label: "See the projects"
      url: "/projects/"
excerpt: "Software engineer & team leader. I love computers, and I'm most at home where curiosity and creative problem-solving pay off."
intro:
  - excerpt: "Generative AI for developer productivity, software verification, and experiments that model and probe how systems behave."
---

{% include feature_row id="intro" type="center" %}

## Featured work

<div class="entries-grid">
{% assign projects = site.projects | sort: "order" %}
{% for post in projects %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>
