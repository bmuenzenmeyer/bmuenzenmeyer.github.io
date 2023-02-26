---
layout: post
title: eleventy-plugin-inline-favicon
summary: I just released a new plugin for 11ty, I hope you like it.
date: 2023-02-04T13:38:58.297Z
tags:
  - post
  - project
  - opensource
---

After scouring the {%ai "https://www.11ty.dev/docs/plugins/"%}11ty plugins page{%endai%} for something similar, I thought to myself, "_self, it's about time you tried writing a plugin_".

And so here it is!

{%ai "https://www.npmjs.com/package/eleventy-plugin-inline-link-favicon" %}eleventy-plugin-inline-favicon{% endai %}

With a little shortcode magic, you can add an inline image of any link. The favicon of the host will be displayed before your link.

I have more plans for this... such as configuration, a11y investigations, and most importantly seeing if I can integrate 11ty image into it. For now, it's a bit of a custom-made toy / tool / dubious idea, inspired by a blog post by {% ai "https://blog.jim-nielsen.com/2021/displaying-favicons-for-any-domain/" %}Jim Nielson{% endai %}.

Let me know what y'all think!
