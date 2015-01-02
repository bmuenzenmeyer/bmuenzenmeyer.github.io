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

<div class="meta">{{ page.date | date: "%x" }} - <a href="https://twitter.com/bmuenzenmeyer">Brian Muenzenmeyer</a></div>

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