---
layout: post

title: "Pattern Lab Node 0.8.0 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
type: Post
class: ''
summary: 'Hey, semver is cool' 

comments: true
---

Just merged the development branch of Pattern Lab Node into master and marked it for release. I am excited about this as it was the direct result of a concerted effort to [document](https://github.com/pattern-lab/patternlab-node/issues/70) the project *against* Pattern Lab PHP, the original reference implementation.

*Note Pattern Lab Node now follows a more logical semver system, with an eventual march toward v1.0.0!*

#### CHANGELOG:

 - CHG: note the change in versioning to proper semver. wanted to do this to inch closer to a 1.0.0 release
 - DEL: deleted most of the lingering PHP sync listener code
 - FIX: support for displaying the HTML and Mustache in the code viewer
 - ADD: pattern link support
 - CHG: updated included mustache templates to reflect pattern links in navigation and compiling pages direct from templates
 - THX: @getsetbro for finding and fixing a typo
 - FIX: fixed a bug preventing pattern states from displaying on the flat template/pages
 - ADD: support for basic pseudo-patterns
 - CHG: cleaned up patternlab.js a bit for future testing, a bit more DRYness.


You can view the specific release here: [https://github.com/pattern-lab/patternlab-node/releases/tag/v0.8.0](https://github.com/pattern-lab/patternlab-node/releases/tag/v0.8.0)

#### Nearing &ldquo;Done?&rdquo;
It's only taken me ~18 months(HOLY COW HOW DID THAT HAPPEN?), but Pattern Lab Node is maturing to the point where it can stand alone as a product, stepping out of the shadow created by Pattern Lab PHP. Hence, stargazers may notices on the [issue tracker](https://github.com/pattern-lab/patternlab-node/issues) an exciting milestone: _v1.0.0_

[Dave Oslen](http://dmolsen.com/) has been crazy hard at work during this time, creating a PHP Twig implementation of "Pattern Lab 2.0" complete with a killer plugin architecture. It's the stuff of beauty. I am unsure what the future holds for me - as I think my efforts might be best contributed there - but I will keep Pattern Lab Node functional and responding to user needs for the foreseeable future.

Thanks to everyone that continues to discover, use, and report feedback to Pattern Lab Node.
