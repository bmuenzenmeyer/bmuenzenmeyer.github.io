---
layout: post

title: "Pattern Lab Node 0.9.0 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
type: Post
class: ''
summary: 'Some frontend improvements to the styleguide' 

comments: true
---

Pattern Lab 0.9.0 is shipped! In the span of a day or two, I received three pull requests, two of which provide major new functionality to Pattern Lab Node. Here is the CHANGELOG:

 - FIX: Added grunt-contrib-copy args to copy all found source/css/*.css
 - ADD: Added upgrade instructions to README
 - FIX: Fix issue with styleguide accordions not closing upon click of a sibling menu.
 - THX: @getsetbro for reporting more issues :)
 - ADD: Added support for pattern search. This is 'in beta' and should have more testing applied to it.
 - ADD: Added support for all keyboard shortcuts found in PL-PHP-v1.0.0
 - FIX: Fixed an issue where Hay mode and Disco mode did not stop one another when using keyboard shortcuts
 - FIX: Fix location of paragraph closing tag to wrap citation
 - THX: @laurendorman for the pull request!
 - FIX: Removed some dead code.
 - ADD: Added View All links in each menu subsection
 - THX: BIG THANKS TO @walmokrani for this work!

THANK YOU THANK YOU THANK YOU TO the super people that made this release possible, [@getsetbro](https://github.com/getsetbro) [@laurendorman](https://github.com/laurendorman) and [@walmokrani](https://github.com/walmokrani) for finding time to use pl node, report issues, and even help code solutions. You all have no idea how energized this made me. You are all superheroes.

#### Upgrade Instructions
__If upgrading this time, you may need to run an `npm update` to get the new grunt-contrib-copy tool.__
To upgrade, you can find some yet-unreleased documentation here: https://github.com/pattern-lab/website/blob/dev/patternlabsite/docs/node/upgrading.md

You can view the specific release here: [https://github.com/pattern-lab/patternlab-node/releases/tag/v0.9.0](https://github.com/pattern-lab/patternlab-node/releases/tag/v0.9.0)

Onward, to [v1.0.0](https://github.com/pattern-lab/patternlab-node/milestones/v1.0.0)!
