---
layout: item
title: On Pattern Lab
summary: Some thoughts after a public conversation on Pattern Lab
date: 2014-04-21T14:53:23.224Z
tags:
  - post
  - opensource
---
[Dave Rupert](https://twitter.com/davatron5000 "‌") sparked a conversation today about Patternlab after some initial usage, which elicited a nice round of feedback from others.

[Brad Frost](https://twitter.com/bradfrost "‌") summed it up nicely:

<blockquote>It's been a process to make Pattern Lab simultaneously flexible and robust</blockquote>

I want to put some thoughts to paper about how this process has played out for me.

Patternlab-PHP was rather feature-rich when I started. I likely missed the conversations Brad and Dave had about what PL should and shouldn't be. It was simultaneously an amazing living reference, but also a skyscraper to understand, deconstruct and finally rebuild with different materials. [Dave Olsen](https://twitter.com/dmolsen "‌") helped immensely in those first steps.

I can feel the desire to turn PL into more than it already is, to turn it into a _platform_ through which an entire project can grow, mature, and finally be deployed. I have also experienced first-hand the complexity that can creep into the solution when attempting to support so many features.

## To me, Pattern Lab is:

- A tool to build reusable, scalable markup and css snippets. As Brad intended, you can decouple atomic design principles altogether if you so choose, but it's also...
- A tool to glue components together in an iterative, incremental fashion.
- One of many ways a web project could be built, but not the only way. A multi-tool, but not the best for every job.
- An alternative to photoshop comps and high-fidelity mockups as an acceptable design deliverable

So, as I reread this, and wonder at which features to implement next against the living spec that is the PHP version, I question what feels missing to me. (Also excited at the prospect of Dave and Brad writing a spec!)

## What pain points have I experienced?

- **Initial project setup is cumbersome.** Hopefully some npm, grunt, dependency maturity in the near-term will help. As others have stated, attempting to obfuscate patternlab internals should be a goal. [Addy Osmani](https://twitter.com/addyosmani "‌") suggested a pure node implementation which would be most agnostic. To me, grunt feels more consumable than pure node. I need to look into Assemble.
- **The iframe-viewer still gets me sometimes.** Living in this responsive age, I naturally try to resize my window instead of using the controls. I'v felt at times that the ish controls are not perfect, but haven't been able to determine if it's my problem or something in the implementation yet. I wonder if this can be configurable.
- **The port is inelegant and immature.** I brute-forced the processing of templates, instead of globbing as the PHP version did initially. While I think this is straight-forward and decently documented, it is not DRY or unit-testable. A refactor would do some good.

As a peripheral member of the community, it's exciting to see other's interested in the same problems that drew me to Patternlab too. I'm also excited to see what ground we can make on PL-PHP :)