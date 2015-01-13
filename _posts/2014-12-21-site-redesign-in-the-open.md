---
layout: post

title: "Site Redesign in the Open"
tags: 'design development'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer

comments: true
---

{{ page.title }}
================

{% include molecules-feature-redesign.html %}

It's time for another reboot of [brianmuenzenmeyer.com](http://brianmuenzenmeyer.com).

I put a lot of time into the current tumblr site - especially in crafting the masthead. But I find it limiting, and reactionary, crafted from one idea with little creative room to grow. It was essentially a one-off idea, not an identity I want to associate myself with or build a brand on. There was no system backing the concept, or allowing a cohesive vision to be designed, iterated on, or maintained. 

So it's time to start over - and this time to [do it in the open](http://bradfrost.com/blog/post/designing-in-the-open/). What comes will be a reflective exercise in branding, atomic design, and process. Along the way I will try to share insights, challenges, and little tips along the way. I encourage a discussion.

My goals include:

* Creating a development environment that is maintainable, flexible, and simple to blog and experiment on top of.
* Establishing a design system that build upon core principles and is representative of me across differing contexts.
* Making a performant, mobile-first web-presence
* Creating a hub for all things I care about

As for now, the site it rather bare-bones - but intentionally so. We'll probably start with a description of the development environment. 

####Update 1: The Development Environment

[brianmuenzenmeyer.com](http://brianmuenzenmeyer.com) is built with Jekyll and hosted on Github Pages. I've enjoyed the simplicity of static-page generators since learning of them. Writing in Markdown is a dream, with its basic styling support keeping everything semantic and clean. Staying simple means I can work fast and keep complexity low. The [Github Pages](https://help.github.com/articles/user-organization-and-project-pages/) user and project structure allows me to build and deploy projects, labs, and smaller sections as fully version-controlled, open source repositories all under my custom domain name.

I'll be using SASS, grunt, and [patternlab node](https://github.com/pattern-lab/patternlab-node) to supplement jekyll. A major part of the redesign will be utilizing atomic design principles to build a sustainable, consistent, and _maintainable_ platform. [This instance of patternlab](https://github.com/bmuenzenmeyer/patternlab) is housed as an ignored sub-directory of the main site. I'll be talking more about this setup soon.

I'm using Sublime Text and the gem [SourceTree](http://www.sourcetreeapp.com/) to develop and manage code.

####Update 2: Pattern Lab + Jekyll FTW
Read how I've integrated [Pattern Lab and Jekyll](http://www.brianmuenzenmeyer.com/using-patternlab-to-design-build-and-maintain-a-website/) with as little coupling as possible yet created a one-way DRY workflow that is driven with atomic design principles. 

####Update 3: Creating a Content Inventory
Read how I've [defined what content I want](http://www.brianmuenzenmeyer.com/creating-a-content-inventory/) to include on the site upfront, with an eye toward relevance and structure.

####Update 4: Style Tile Version 0.0
I've hosted the first version of a style tile on the site, available for viewing [here](http://www.brianmuenzenmeyer.com/styletile/). For the curious, my implementation is a blend of Samantha Warren's http://styletil.es/ and Sparkbox's http://sparkbox.github.io/style-prototype/ &mdash; not as polished as Warren's and not yet as interactive as sparkboxes. I plan to iterate on these style tiles - stay tuned!