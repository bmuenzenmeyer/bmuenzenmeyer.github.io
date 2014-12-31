---
layout: post

title: "Pattern Lab Node 1.2 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer

comments: true
---

{{ page.title }}
================

<div class="meta">{{ page.date | date: "%x" }} - <a href="https://twitter.com/bmuenzenmeyer">Brian Muenzenmeyer</a></div>

Just pushed patternlab-node 1.2, check out the release [here](https://github.com/pattern-lab/patternlab-node/releases/tag/v0.1.2)

Here is the changelog:

* ADD: Abstracted template rendering into a function for easier swapping of rendering engine
* ADD: Smarter filtering of files to support other templates Thanks 
* ADD: Help command line agument
* ADD: Version command line argument
* ADD: Patterns only command line argument
* ADD: IshControlsVisible options. Can now hide any ishControls you like.
* ADD: Documented the command line interface
* CHG: Put debug flag in conf.json instead of package.json
* CHG: Aligned styleguide css with patternlab-php
* FIX: Removed node .8 from travis
* FIX: Code and annotation support in patternlab viewer
* THX: thanks @ivanmayes and Shoptology crew for contibutions!

#### More change coming
Interest in patternlab-node is steadily increasing, as as such it needs to mature out of its brute-force port mentality. A notable watcher, [Addy Osmani](https://twitter.com/addyosmani) says on his blog:

> First do it, then do it right, then do it better. This is one fundamental I always keep in mind when developing anything.

Patternlab node needs to do this. Next steps, extract patternlab-node into a core engine and allow different build systems to run it as a module. Grunt/Gulp, here we come!