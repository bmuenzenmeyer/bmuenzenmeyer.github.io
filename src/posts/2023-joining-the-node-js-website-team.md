---
layout: post
title: Joining the Node.js Website Team
summary: Open source engagement comes in many forms
date: 2023-07-08T07:06:35.776Z
tags:
  - opensource
  - nodejs
  - post
---
T﻿his week I joined the [Node.js website team](https://github.com/nodejs/nodejs.org). It's been a fantastic way, however small, to contribute toward something larger. I believe that [open source](https://brianmuenzenmeyer.com/hubs/opensource/) contribution takes many forms. In my short time here, I've triaged issues, discussed future plans, fixed some small things, and reviewed pull requests. 

Above all else, I've been learning. 

Here's a short list of things I kept track of in the past couple weeks:

- eslint and prettier are compatible, but prettier's maintainers [don't recommend](https://prettier.io/docs/en/integrating-with-linters.html) direct consumptions of all prettier logic within eslint. They mention it might be too noisy. For me, I format on save, but it's an interesting empathy consideration for newer contributors that might have different editors.
- [changesets](https://github.com/changesets/changesets) truly is the final form of semantic versioning.
- dependabot released their [grouped update beta](https://github.blog/changelog/2023-06-30-grouped-version-updates-for-dependabot-public-beta/), reducing noise for maintainers
- my first use of Node.js's [high-resolution time module](https://nodejs.org/api/process.html#processhrtimetime), and that its deprecated
- in a large software project, almost every single line of code is commented. we are designing software across timezones and language barriers. the more context, the better

A large takeaway is that knowledge is unevenly distributed. I know some things that others don't. The opposite is also true. But what's so cool about this is that jumping into a project means that I have a high likelihood of being able to contribute _something_, and I have an equal opportunity to learn from others. This learning is often directly attributable back to my team and my next work.
