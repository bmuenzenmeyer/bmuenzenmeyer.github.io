---
layout: post

title: "Pattern Lab Node 1.0.0 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ''
summary: 'The big 1.0, signifying significant maturity of the project'

comments: true
---

**[Version 1.0.0 is here!](https://github.com/pattern-lab/patternlab-node/releases/tag/v1.0.0)** It's hard to believe, but it's time to tag this project. With styleModifiers and patternParameters a couple releases ago, Pattern Lab Node has really come up to snuff compared to the original Pattern Lab PHP system. [Exciting work continues even as I write this](https://github.com/pattern-lab/patternlab-node/tree/pattern-engines) on multiple other advancements, but I intend to fork this version and maintain it as the purest subset of original functionality. I feel funny tagging it now, but I figured if I didn't soon I wouldn't feel right continuously pushing it off or making users sign up for big file re-shuffles hidden away in a minor release.

So, this ain't no 'Mission Accomplished' banner, when I know there are a LOT of cool things just down the road. But it is a chance to take stock of where we are and where we can go. Depending on the pace of pattern engine work and reorganizing the file system structure, we might be seeing **2.0.0** sooner than I imagined.

_"What's in a number?"_, you ask. I'll be trying to follow [semver](http://semver.org/) quite closely, as multiple people from companies and agencies are using Pattern Lab Node (which, by the way, is an impossibly humbling experience).

Anyway, the normal excerpt from the Github Release: [Pattern Lab Node 1.0.0](https://github.com/pattern-lab/patternlab-node/releases/tag/v1.0.0)

---

### Changelog
- FIX: Resolve issue with not hiding underscored patterns.
- THX: Thanks @ivancamilov for reporting this regression.
- FIX: Fix misapplied error input class
- THX: Thanks @johngerome for the pull request!
- ADD: Added a note in the README during installation to run with elevated privileges
- THX: Thanks @RichardBray for the heads up
- ADD: Added a Prerequisites section to the README
- ADD: Added unit tests for pattern states and pseudopatterns
- CHG: Changed pseudopattern generation to use config.patterns.source directory instead of hardcode
- CHG: Explicitly sorting patterns by name prior to building the UI
- ADD: Added ability to specify link.* urls inside data objects
- CHG: Incremented version to 1.0.0. Achieved near-parity with PL PHP v1!
- THX: Thanks to each and every person who cared about Pattern Lab Node! - Brian

### Unit Tests / Assertions
[14 more unit tests/assertions](https://travis-ci.org/pattern-lab/patternlab-node/jobs/95736743) were added with this release.

### Upgrade Instructions

Assuming you are on v0.15.X, one should be able to update package.json for either grunt or gulp configurations and run `npm update`.

### Roadmap
Keep an eye on the [roadmap](https://github.com/pattern-lab/patternlab-node/wiki/Roadmap) for a clearer understanding of where the project is going in the next few releases.

---

### Stats
There are some neat things Github tracked for me so far. For example, check out the commit graph here, for a general sense of the ebb and flow of the project over two years.

[![Pattern Lab Commits](/img/pln-commits.png)](https://github.com/pattern-lab/patternlab-node/graphs/contributors)

As you can see, there has been a pretty big uptick in work of late, both by me and from others contributing back to the project.

Next check out the punchcard:

[![Pattern Lab Punchcard](/img/pln-punchcard.png)](https://github.com/pattern-lab/patternlab-node/graphs/punch-card)

It's no secret to me that the bulk of effort has come at the expense of sleep - with most commits straddling midnight. I wonder how that compares to other open source projects...brb...oh it turns out [Dave and Brad aren't as stupid as me!](https://github.com/pattern-lab/patternlab-php/graphs/punch-card).

### And Now For Something Completely Different
Well friends, with Pattern Lab 1.0.0 tagged, what does mean for me? Well, my itch for [other projects remains](http://codepen.io/bmuenzenmeyer/pen/KdYKvB), and I have a number in the works or swimming around in my head. This site could use [a bit more love yet](http://www.brianmuenzenmeyer.com/site-redesign-in-the-open), both in functionality/readability and aesthetics. I plan to write more, [extend posts like these about Pattern Lab into a series](http://www.brianmuenzenmeyer.com/solving-problems-with-pattern-lab-small-team-workflow), and cover what I learned building and maintaining the port, and dive deeper into how to use Pattern Lab in general.

Oh, and most important of all, tomorrow my wife and I find out the gender of our second child, due in April. I have little doubt life will again be recast in a new mold come spring. Until then, and after, I'll keep being a [nightowl](http://crunchyowl.com) whenever I can.

### Thanks
Thanks to all of you for taking time out of your busy work or personal schedules to care about Pattern Lab Node - whether that be via building neat stuff, reporting issues, extending the library or using it as a dependency(!), contributing back, or just providing a word of encouragement. There are too many of you to thank, but you have my gratitude.

To Brad and Dave, I never would have done it without you both providing encouragement, support, guidance, and motivation by building such a great tool to build websites and web applications better in the first place. You know, shoulders of giants stuff.
