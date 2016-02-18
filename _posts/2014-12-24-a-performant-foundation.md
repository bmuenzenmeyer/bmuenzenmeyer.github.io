---
layout: post

title: "A Performant Foundation"
tags: 'design development performance'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
type: Post

comments: true
---

{% include molecules-feature-redesign.html %}

A great thing about writing [brianmuenzenmeyer.com](http://brianmuenzenmeyer.com) from the ground up is the ability to keep an eye on performance from the onset.

[Tim Kadlec reminds us to set a performance budget](http://timkadlec.com/2013/01/setting-a-performance-budget/), and with a new start and bare-bones content, interaction, and styling, there is nothing standing in the way delivering a performant experience to users.

Utilizing the excellent [webpagetest.org service](http://www.webpagetest.org/), I ran [bmuenzenmeyer.github.io/](http://bmuenzenmeyer.github.io/) through a quick run to baseline some initial performance metrics.

![The webpagetest.org results for the site](http://bmuenzenmeyer.github.io/img/webpagetest_foundation.png)

As you can see, I achieve sub-second results, but there are still things that could be improved. I am already taking quite the hit by serving uncompressed assets, and for that matter, I am not always serving them against an optimal rendering path.

I'll be adding [github issues](https://github.com/bmuenzenmeyer/bmuenzenmeyer.github.io/issues) for each thing that comes out of this initial analysis - and I may update this post too.

Oh, and about that budget? I want to keep page load under 1.5 seconds if I can, and requests under 15. These are, for me, a bit arbitrary, but I'd rather have a target to start measuring against. If you want to learn more about performance, measured, or perceived, please watch my slidedeck on this topic at : [https://speakerdeck.com/bmuenzenmeyer/performance-enhancement-testing-positive](https://speakerdeck.com/bmuenzenmeyer/performance-enhancement-testing-positive)!
