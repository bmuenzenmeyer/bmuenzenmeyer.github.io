---
layout: post-code

title: "Pattern Lab Node 1.1.0 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
type: Post
class: ''
summary: 'More than meets the eye. This minor version ships with configurable paths and is structured to be better consumed as a true npm depedency.'

comments: true
---

Pattern Lab Node 1.1.0 is here, not to be outdone by v1.0.0!

In terms of relative change, it's bigger than v1.0.0 in fact, with a good mix of fixes, enhancements, and a lot of work put into the shipped grunt/gulp harness you've almost undoubtedly customized already. Switching to configurable paths and making the core library require()-able is a huge win, opening the doors to [running Pattern Lab Node as an npm dependency](https://github.com/pattern-lab/patternlab-node/wiki/Running-Pattern-Lab-Node-as-an-npm-Dependency). If you've ever had to struggle through an upgrade, I suggest you check this out, as it should greatly lessen future maintenance costs and allow us to do some other cool stuff soon!

Reference examples of a parent projects running Pattern Lab Node as a dependency can be found here:

* [Grunt Example](https://github.com/bmuenzenmeyer/patternlab-node-grunt-dependency-example)
* [Gulp Example](https://github.com/bmuenzenmeyer/patternlab-node-gulp-dependency-example)

I want to take special note to @geoffp and @EvanLovely who were integral in crafting the major paths and require() work this release. Pattern Lab Node is a more reliable, more maintainable tool now.
*Thank you*

View the [full version diff here](https://github.com/pattern-lab/patternlab-node/pull/243/files).

### CHANGELOG
* FIX: Fixed issue where partials containing styleModifiers with integers were not found correctly under all circumstances
* FIX: Fixed issue where excluded patterns were still rendered on the Pattern Lab site. Now they do not directly get rendered via the menu, view all links, or the styleguide, but are accessible for inclusion as pattern partials, and can be accessed via lineage.
* THX: Thanks @theorise for reporting these issues.
* THX: Thanks @dmolsen for input on desired behavior.
* FIX: Fixed issue where style modifier partials within list item blocks where not uniquely being applied. this seems like a regression. added a unit test with fix
* ADD: Added fuzzy pattern matching support based on patternType-substring(patternName) to align with PL PHP
* FIX: Fixed issue with gulpfile not copying style.css and watching the wrong directory
* THX: Thanks @robinsonaaron for the issue and pull request!
* FIX: Prefer exact pattern key match over fuzzy matches inside getpatternbykey()
* THX: Thanks @EvanLovely for the suggestion
* ADD: Make all paths configurable
* THX: HUGE Thanks to @geoffp and @EvanLovely for their thoughts, time, and talent to make this a reality!
* FIX: Fix issue where absolute paths in the config path object would not resolve
* THX: Thanks to @geoffp and @EvanLovely for reporting, fixing and testing the issue in the dev branch.
* FIX: Typo in gulp instructions in README.
* THX: Thanks @simonknittel for the watchful eyes
* CHG: Changed locations of ./public/styleguide to ./core/styleguide to make ./public/ a cleaner distribution directory
* CHG: Removed scss files and config from project. This is in preparation for including the default asset repo in the future
* FIX: Fix issue where partials were not being sent to Mustache during pattern parameter parsing.
* THX: Thanks to @e2tha-e for reporting this issue.
* ADD: Now patterns and pseudopatterns can be linked from global or file data.json
* THX: Thanks @kylewelsby for the thoughtful enhancement

### UNIT TESTS/ASSERTIONS
[20 more unit tests/assertions](https://travis-ci.org/pattern-lab/patternlab-node/jobs/107946383) were added with this release.

### UPGRADE INSTRUCTIONS

Assuming you are on v1.0.0, one should be able to follow the [standard upgrade instructions]() along with the following addenda:

* Major changes have occurred in the shipped `Gruntfile`/`Gulpfile`. It's recommended to take the new versions's file and manually merge any customizations you have. The good news is configurable paths make for a ton more flexibility into the future.
* Add the following to the `config.json`:

{% highlight javascript linenos %}

  "paths" : {
    "source" : {
      "root": "./source/",
      "patterns" : "./source/_patterns/",
      "data" : "./source/_data/",
      "styleguide" : "./core/styleguide/",
      "patternlabFiles" : "./source/_patternlab-files/",
      "js" : "./source/js",
      "images" : "./source/images",
      "fonts" : "./source/fonts",
      "css" : "./source/css/"
    },

{% endhighlight %}

* All `.scss` files have been removed from the filesystem and `Gruntfile`/`Gulpfile`. They caused confusion of sorts and added complexity for little benefit, as the styleguide doesn't change significantly and the shipped pattern styling is not intended to be used. With the [roadmap](https://github.com/pattern-lab/patternlab-node/wiki/Roadmap) point to other kits, for patterns and the styleguide, this feels like good preparation and aligned with the theme of this release to be about future-consumption.

All this change may warrant some to consider this a major upgrade, but the API hasn't really changed, just the shipped harness around `patternlab.js.` If you are worried about upgrading, your best bet might be to start anew just this once.

### ROADMAP
Keep an eye on the [roadmap](https://github.com/pattern-lab/patternlab-node/wiki/Roadmap) for a clearer understanding of where the project is going in the next few releases.

[Tell me on Twitter what you are building with Pattern Lab Node!](https://twitter.com/bmuenzenmeyer)
