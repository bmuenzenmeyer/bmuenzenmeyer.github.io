---
layout: post-code

title: "Pattern Lab Node 0.10.0 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ''
summary: 'Pattern Parameters!'

comments: true
---

A busy time here again - with an uptick in interest in the project and renewed focus from me. Your humble port maintainer wants to get to v1.0.0 like no-other! It was also unlike any release to date - as it started with an incremental feature addition (pattern parameters) and ended with a complete overhaul of how patterns were stitched together with data.

### Waiter, Is That A Parameter I See in My Pattern?
Yes they are finally here! Pattern parameters are a simple mechanism for replacing Mustache variables via attributes on a pattern partial tag rather than having to use a pattern-specific json file. They are especially useful when you want to supply distinct values for Mustache variables in a specific pattern partial instance that may be included multiple times in a molecule, template, or page.

The basic syntax is this:

{% highlight html linenos %}
{% raw %}

{{> molecules-single-comment(description: 'A life is like a garden. Perfect moments can be had, but not preserved, except in memory.') }}

{% endraw %}
{% endhighlight %}

The attributes listed in the pattern parameters should match Mustache variable names in your pattern. The values listed for each attribute will replace the Mustache variables. Again, pattern parameters are a simple find and replace of Mustache variables with the supplied values.

Pattern parameters **do not** currently support the following:

* sub-lists (e.g. iteration of a section),
* and the use of long strings of text can be unwieldy
* nested properties within the parameter data, such as `{{> molecules-single-comment(foo.bar: 'baz') }}`

You can read the full documentation on pattern parameters here: [Using Pattern Parameters](http://patternlab.io/docs/pattern-parameters.html)

### Data Inheritance

I cannot omit what I easily sank the most hours and stress into - the rendering of data correctly. Data inheritance is such a core concept to Pattern Lab that discovering a critical flaw in my algorithm was tough to swallow &mdash; it basically meant the port was never close to emulating the power of its older brother. I learned this during a rather routine comparison of functionality between PHP and Node, by  finally noticing that the home page touts were not rendered at all. Sure enough, they were not defined in the global data; *only* within the `homepage.json`

### CHANGELOG

 - ADD: Added support for [pattern parameters](http://patternlab.io/docs/pattern-parameters.html)! Resolves [#88](https://github.com/pattern-lab/patternlab-node/issues/88)
 - FIX: Data inheritance is now working as advertised. Resolves [#127](https://github.com/pattern-lab/patternlab-node/issues/127). This turned out to be a MAJOR thing, as I realized the home-page was not passing down any of its json data to partials.
 - CHG: Refactored a lot of code out of patternlab.js and into separate files. Doing so should make everything dryer, more unit testable, and easier to understand I hope.
 - ADD: Added proper styling for the homepage-emergency alert that is displayed for demo purposes
 - ADD: Added a new comment organism, the sticky comment, to ship an example of pattern parameters
 - CHG: Start some JS linting of the project. I don't quite agree with a lot of it, so am trying to set some smart configurations
 - CHG: Wrapped some build messages in the patternlab.config.debug flag
 - FIX: Allow users to set a base url path. Resolves [#125](https://github.com/pattern-lab/patternlab-node/issues/125) (testing in the wild requested)
 - THX: Thanks [@scottnath](https://github.com/scottnath) for the proposed base url solution and [@jkbyln](https://github.com/jkbyln) for discussion on the topic too!

### UPGRADE INSTRUCTIONS

Normally one could be safe following the instructions in [here](https://github.com/pattern-lab/website/blob/dev/patternlabsite/docs/node/upgrading.md), but this time we've changed some `source/_patternlab-files/` directory files too. I have opened [an issue](https://github.com/pattern-lab/patternlab-node/issues/133) to make this process smoother in the future. For now, you should be able to upgrade using the follow process:

1. Backup your `source/` directory and `config.json`
2. Overwrite all of `builder/` and `public/` as normal
3. Refer to this [pull request](https://github.com/pattern-lab/patternlab-node/pull/130/files) if you need help, but you'll essentially need to:
   * Add `"baseurl" : ""` to `config.json`
   * Overwrite `source/_patternlab-files/pattern-header-footer/footer.html`
   * Overwrite `source/_patternlab-files/styleguide.mustache`
   * Overwrite `source/_patternlab-files/viewall.mustache`

Sorry for the inconvenience. I know this isn't ideal, but it's far from impossible. Perhaps if you don't need pattern parameter support or the base url you may choose to postpone an upgrade.

I put a lot of hours into this one - essentially rewriting the entire engine -hope you like what you see!

You can view the specific release here: [https://github.com/pattern-lab/patternlab-node/releases/tag/v0.10.0](https://github.com/pattern-lab/patternlab-node/releases/tag/v0.10.0)

### Pattern Lab Node v1.0.0

Partly for my own sanity, and partly at the request of the community, I have organized remaining work into a [roadmap](https://github.com/pattern-lab/patternlab-node/issues/134) for sorts. A person dedicating more hours to the project would churn through like I do a stack of pancakes, but for me it will take months yet. My goals are to be transparent about direction, emphasize the current finish line as the mustache-powered Pattern Lab PHP v1, and motivate myself toward that finish line. Please let me know if your current needs don't jive with the roadmap..  
