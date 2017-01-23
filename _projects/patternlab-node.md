---
layout: project

title: 'Pattern Lab Node'
summary: 'A workshop where one builds modular web solutions. The Node version of Pattern Lab is, at its core, a static site generator. It combines platform-agnostic assets, like the Mustache-based patterns, the JavaScript-based viewer, and the self-contained webserver, with a Node-based "builder" that transforms and dynamically builds complex solutions from ever-smaller patterns.'
class: ''
order: 1
part: molecules-patternlab-logo.html
---

{% include {{page.part}} %}

Go ahead, check out [www.brianmuenzenmeyer.com/patternlab/public/index.html](www.brianmuenzenmeyer.com/patternlab/public/index.html), the public Pattern Lab instance used to create the site you are now on.

![An image of Pattern Lab used to create this site](http://www.brianmuenzenmeyer.com/img/pl-bmz.png)

Go check out the [Pattern Lab Node repository on Github](https://github.com/pattern-lab/patternlab-node) for more information, like how to install. Full documentation can be found there and at [http://patternlab.io](http://patternlab.io).

#### My Writing About Pattern Lab

##### [Using Pattern Lab to Design Build and Maintain a Website](http://www.brianmuenzenmeyer.com/using-patternlab-to-design-build-and-maintain-a-website)

In this article I detail the configuration that makes this Jekyll site work alongside Pattern Lab Node, and then be easily deployed to Github Pages.

##### [Solving Problems with Pattern Lab - Small Team Workflow](http://www.brianmuenzenmeyer.com/solving-problems-with-pattern-lab-small-team-workflow)

#### Additional Pattern Lab Resources

##### [Pattern Lab Side Nav](https://github.com/roydanenterprises/pattern-lab-side-nav)

An alternative style guide navigation developed and open-sourced at [Roydan](http://www.roydan.com).

##### Pattern Lab Node As Dependency Reference Repositories

Since Pattern Lab [v1.1.0](https://github.com/pattern-lab/patternlab-node/releases/tag/v1.1.0) you may more easily [add Pattern Lab as a dependency](https://github.com/pattern-lab/patternlab-node/wiki/Running-Pattern-Lab-Node-as-an-npm-Dependency) in your workflow. I created some reference repositories for grunt and gulp toolchains that illustrate this concept. Hope it is useful to you.

* [Grunt](https://github.com/bmuenzenmeyer/patternlab-node-grunt-dependency-example) Example
* [Gulp](https://github.com/bmuenzenmeyer/patternlab-node-gulp-dependency-example) Example
