---
layout: post-code

title: "Using Pattern Lab to Design, Build and Maintain a Website"
tags: 'development design patternlab'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
type: Post
class: ''
summary: 'THE how-to for Pattern Lab + Jekyll site design and development' 

comments: true
---

{% include molecules-feature-redesign.html %}

###Why Pattern Lab

Pattern Lab is a collection of tools to help you create atomic design systems. Full disclosure: I've maintained the node fork of [Brad](https://twitter.com/brad_frost) and [Dave's](https://twitter.com/dmolsen) stellar PHP trunk for a while now. Pattern Lab was my third [but] true love, fast on the heels of [pea.rs](http://pea.rs) and an attempt to roll my own style guide that had a decidedly [rough and tumble](https://www.youtube.com/watch?v=X4jF3xTxKWM) feel and outcome. Finding such a mature product was a godsend, and a great learning opportunity.

Piling success upon success just feels right. Building a site up from its atomic interface elements allows you to not only maintain consistency by paving less cow paths, but it allows you to pave over the whole shebang and propagate changes as well structured CSS should. Focusing on core elements like typography, irreverent of layout, is a strength Pattern Lab can bring to a design process. With auto-refresh, annotation, viewport resizing, and more, it's a clear choice for me when considering how I want the redesign to evolve.

###Structured for Success
Pattern Lab and jekyll are both static site generators, so the key is to integrate with as little coupling as possible and create a design and development workflow that promotes [atomic design](http://bradfrost.com/blog/post/atomic-web-design/) concepts. After setting up jekyll, I used npm to pull down the latest version of patternlab-node into _patternlab.

{% highlight bash %}

  npm install patternlab-node;

{% endhighlight %}

After a bit of cleanup, my jekyll directory structure looks as so:

<pre>
<code class="language-bash" data-lang="bash">.
├── _includes
├── _layouts
├── _patternlab
├── _posts
├── _site
├── css
├── img
├── js
├── _config.yml
└── index.html</code>
</pre>

Placing Pattern Lab in an underscored directory ensures the jekyll ignores it during parsing locally. Since this is hosted on Github Pages, an absolutely *key* step for me was to ignore the _patternlab directory. Of course, I still want to version control patterns and style from Pattern Lab, but with the help of Github again one can easily setup another repository. Added bonus is the fact that Pattern Lab, when pushed to the gh-pages branch, will be hosted as a sub-directory of my main site. I didn't do this right the first time, mind you, but luckily you can instruct git to [remove tracked files after they are ignored too](http://stackoverflow.com/questions/1274057/making-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore). For anyone following along, you can see both of the repositories here:

* [https://github.com/bmuenzenmeyer/bmuenzenmeyer.github.io](https://github.com/bmuenzenmeyer/bmuenzenmeyer.github.io) My user repository with a CNAME
* [https://github.com/bmuenzenmeyer/patternlab](https://github.com/bmuenzenmeyer/patternlab) A project repository with Pattern Lab pushed on the gh-pages branch

###Toward Maintainability

A style guide, once written, must preserve its relevance or quickly fall out of favor by stakeholders, designers, and developers. This is a darling you do not want to kill. If the style guide becomes stale and out of sync with the [realities of maintenance](http://csswizardry.com/2013/04/shame-css/), the investment is lost or damaged. A style guide's ability to communicate and focus diverse teams is a function of its parity with production. To this end, I am have created a small utility within [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) to extract select partials and output them where needed. Let's take a look at the `config.json` file at the root of the v0.1.7 install:

{% highlight javascript linenos %}

{
  "patternExportKeys": ["organisms-header"],
  "patternExportDirectory": "./../_includes/"
}

{% endhighlight %}

Simple enough. We specify a directory we want to output partials to, and define an array of pattern keys to export. Exporting _all_ patterns as partials may work for you. For me... early days. If you want to see the implementation of the pattern exporter, you can see it [here on github](https://github.com/pattern-lab/patternlab-node/blob/master/builder/pattern_exporter.js).

It's even easier to [copy](https://github.com/gruntjs/grunt-contrib-copy) the CSS outputted from patternlab a couple level's higher to where jekyll is expecting it. With the CSS and the partials both being injected directly into the jekyll structure, my design _slash_ development workflow is one way and maintainable *starting* at the Pattern Lab style guide. You can see it hosted at [www.brianmuenzenmeyer.com/patternlab/public/index.html](http://www.brianmuenzenmeyer.com/patternlab/public/index.html). From these humble beginnings, iteration and atomic chemistry will run rampant! The final structure, when running Pattern Lab, is as follows:

<pre>
<code class="language-bash" data-lang="bash">.
├── _includes
<span class="p">|</span>   └── organisms-header.html //from Pattern Lab!
├── _layouts
├── _patternlab
├── _posts
├── _site
├── css
<span class="p">|</span>   └── style.css //from Pattern Lab!
├── img
├── js
├── _config.yml
└── index.html</code>
</pre>

The final step, of course, is to reference our partial in our jekyll template:

{% highlight html linenos %}

<body>
<div class="site">
  {{ "{% include organisms-header.html " }}%}
  <div role="main">
    {{ "{% content " }}%}
  </div>
</div>
...
</body>

{% endhighlight %}

This is perhaps a rudimentary implementation, but it works perfectly in the jekyll environment. [Ian Feather](https://twitter.com/ianfeather) outlined a far more robust solution in his [post](http://ianfeather.co.uk/a-maintainable-style-guide/) about Lonely Planet's style guide. One could quite conceivably output partials to a directory that a Drupal or Wordpress installation reads. I may look into that more soon and add it to the patternlab wiki.

> The best writing is rewriting.
> &mdash; E.B. White

E.B. White, of Strunk and White's _The Elements of Style_, knew that a text lives longest past draft form. If anyone's read White's terse handbook, they will understand the efficacy of a well written sentence. So too, in my opinion, do websites, living long past their shower-thought, design brief PDF, or hackathon. A well-structured, maintainable site has little fat, a clear message supported by content and style, and consists of a one-way DRY workflow that does not collapse under its own weight. Stay tuned to see how this goes.

_Please share your thoughts as to how this method could be improved upon or brought to other production web platforms._
