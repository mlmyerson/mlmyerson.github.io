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
excerpt: "Software engineer & team leader. I build games, simulations, and systems software that make complex ideas tangible."
intro:
  - excerpt: "Evolutionary algorithms, sonified chaos, game-playing agents, and humanitarian software: a decade of building things that spark connection."
---

{% include feature_row id="intro" type="center" %}

## Featured work

<div class="entries-grid">
{% assign projects = site.projects | sort: "order" %}
{% for post in projects %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>
