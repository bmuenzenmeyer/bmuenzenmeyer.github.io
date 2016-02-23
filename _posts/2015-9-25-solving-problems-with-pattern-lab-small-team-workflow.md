---
layout: post-code

title: "Solving Problems with Pattern Lab - Small Team Workflow"
tags: 'patternlab development design workflow'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ''
summary: 'Find out how Pattern Lab is useful even as a UX/UI team of one'

comments: true
---

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I've had a soft-spot for style guides, ever since seeing [http://pea.rs/](http://pea.rs/) at An Event Apart a couple years back. When [Pattern Lab](http://patternlab.io/) emerged soon after, I was hooked. Since, I've maintained the [Node version](https://github.com/pattern-lab/patternlab-node) of Brad Frost's and Dave Olsen's Pattern Lab and used it in a number of personal and professional projects. At the company I work for, I use Pattern Lab as the style guide for our next-phase web applications.

### So I said to myself, &ldquo;self&rdquo;
My company employs less than 20 people. In addition to being rank-and-file software developer, I am what the [crazy-insightful](https://vimeo.com/139025298) [Leah Buley](http://leahbuley.com/) calls a &ldquo; [User Experience Team of One](http://rosenfeldmedia.com/books/the-user-experience-team-of-one/)&rdquo;. This is not without its freedoms and its challenges. Consistency and stakeholder alignment are paramount, and so far exposing the style guide to the company has been met with encouragement and collaboration. Still, many of the core benefits of style guide are diminished when I fill multiple roles a style guide is meant to mediate between.

### Growing Pains
While I am able to quickly use Pattern Lab to explore, build and tune patterns, the team stumbled when I included a direct reference to our style guide in implementation details of a planned feature. Really good questions cropped up:

* Can I copy-paste the markup in the style guide?
* Should the style guide document every possible state of the control/widget?
* Am I expected to keep the style guide up to date?
* Is the style guide the de-facto spec?
* Is the style guide going to house every content-iteration of a control, like different confirmation modals?

It was then I realized I was unprepared to answer most of these questions, and that my internal understanding of what Pattern Lab is *and could be* vastly differed from my coworkers.

And so when I saw this, I couldn't help but ask:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/brad_frost">@brad_frost</a> Should the new artifacts built with a style guide live on as part of it, or only new patterns extracted from them?</p>&mdash; Brian Muenzenmeyer (@bmuenzenmeyer) <a href="https://twitter.com/bmuenzenmeyer/status/645984298697256960">September 21, 2015</a></blockquote>

I had all my ammo prepared, slung right back in the face of the man himself. *Little did Brad know I was just deflecting my own troubles.*

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/brad_frost">@brad_frost</a> ditto! We came up with a decent compromise, but it&#39;s a longer-form explanation and not perfect.</p>&mdash; Brian Muenzenmeyer (@bmuenzenmeyer) <a href="https://twitter.com/bmuenzenmeyer/status/645997566430064640">September 21, 2015</a></blockquote>

Still, I found hope in our exchange (click on the cards to see some additional Tweets) - because it revealed to me that we are all very much still working on how best to incorporate style guides into our workflows. I know we can figure it out together. Brad rejoindered:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/bmuenzenmeyer">@bmuenzenmeyer</a> Sounds like a blog post! hahaha</p>&mdash; Brad Frost (@brad_frost) <a href="https://twitter.com/brad_frost/status/645998332020686849">September 21, 2015</a></blockquote>

### Starting Small, Staying Small
Pattern Lab can do many things, like build a content-driven website using increasingly more complex structured widgets, first with placeholder content and then actual content. But perhaps I cannot do many things with it under limited circumstances. First and foremost, what we needed was a clear, upfront definition of my three-fold uses of Pattern Lab.

1. Style guide
2. Pattern Library
3. Laboratory

I went so far as to make the first pattern you see in Pattern Lab a welcome of sorts, explaining these three uses.

So primarily, Pattern Lab is our living reference of the visual design elements that make up the application. Via gulp running on our source code, the CSS is automatically pushed to Pattern Lab with every save. Now I an see a 10,000 ft view of our interface elements decoupled from the application itself. This satisfies the most basic definition of a style guide.

Pattern Lab is also, secondarily, our pattern library. I hope this doesn't come as too much of a surprise. Common markup patterns can be combined to illustrate interactions between components. My goal is to make this someday something copy-pastable, so if you need to know how to create a new modal, or the data table, or the card - you can take the generic one from here that comprises all the right elements.

The last stated use of Pattern Lab is as a personal laboratory for me while designing new solutions. Pattern Lab's feature-set, whether it be [pattern parameters](http://patternlab.io/docs/pattern-parameters.html), swappable json files, or just the browser frontend itself, make it an invaluable tool to design a responsive web application in the browser. But I recognize and concede the fact that we are not big enough to keep this thing perfectly in sync with all source code. No, it ain't [Lonely Planet's Rizzo](http://engineering.lonelyplanet.com/2014/05/18/a-maintainable-styleguide.html), but it's enough for us, for now. So I call attention to this explicitly with the team. I may use some of the more advanced features of Pattern Lab during design, showing it to others, testing against it, and so on. But when we start to solidify, the more evolved "organisms" are deconstructed into any new patterns that have emerged. It's for the best, as they evolve too fast once in the wild anyway, but their ancestral patterns remain. By doing this, we limit the "unDRYness," reduce the responsibilities of other developers, and mitigate a lot of the original concerns, freeing us to focus more on the benefits than the downsides.

------

I hope sharing this faceted application of Pattern Lab as a styleguide helps you as much as it helps me. I also hope that this posts title becomes a series of posts. We'll see. Perhaps you can help. What are you solving with Pattern Lab?
