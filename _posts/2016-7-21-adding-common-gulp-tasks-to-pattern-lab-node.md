---
layout: post-code

title: "Adding Common Gulp Tasks to Pattern Lab Node"
tags: 'patternlab development gulp integration'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ''
summary: 'I run through from start to finish how to add a common gulp task into the default Pattern Lab Node Gulp Edition'

comments: true
---

With [Pattern Lab 2](https://www.smashingmagazine.com/2016/07/building-maintaining-atomic-design-systems-pattern-lab/) released, you can now integrate with the core Pattern Lab library via [Editions](http://patternlab.io/docs/advanced-ecosystem-overview.html). These pre-canned project configurations are meant to be consumed, riffed off of, and made your own: unique to each project or team's workflow.

At the [Atomic Design / Pattern Lab Workshop at WebDesignDay](webdesignday.com/atomic-design-workshop.html), one attendee asked how to integrate Sass compilation into the [off-the-shelf gulp edition](https://github.com/pattern-lab/edition-node-gulp).

> History: Pattern Lab Node has for a while now not shipped any .scss files. Making decisions like this in a design system tool as configurable as Pattern Lab only boxes in users and makes it harder for them to work their own way.

With Editions, Pattern Lab becomes, as [Dave Olsen](https://twitter.com/dmolsen) put it, "just another task." This means integration with a tool like sass is no different than integration you'd encounter elsewhere. This example is applicable to all sorts of tasks you might want to integrate as part of your toolchain. Let's get started.

## Adding Sass Compilation

The code we'll be augmenting is within [`gulpfile.js`](https://github.com/pattern-lab/edition-node-gulp/blob/master/gulpfile.js). The gulp tasks are organized into three big chunks:

* Copy Tasks - responsible for shuttling front-end assets from [`source/`](http://patternlab.io/docs/editing-source-files.html) to `public/`
* Pattern Lab Tasks - responsible for configuring and interfacing with the core pattern rendering library
* Server and Watch Tasks - responsible for controlling the [self-hosting of the Pattern Lab front end](http://patternlab.io/docs/viewing-patterns.html#node) and re-generating the site on `source/` changes

We will be adding to and editing the copy tasks.

To add sass compilation capabilities, you must first include the [gulp-sass](https://github.com/dlmanning/gulp-sass) library from [npm](http://npmjs.com/). From a command prompt open to the root of your edition:

```bash
npm install gulp-sass
```

Once this completes, add the gulp-sass library via a require statement at the top of the gulpfile:

```javascript
var gulp = require('gulp'),
  path = require('path'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  argv = require('minimist')(process.argv.slice(2));
```

With sass included, we turn our attention to getting the `.scss` files compiled. For the sake of the demo I'll be assuming you store the `.scss` files alongside `.css` files inside `./source/css/`. Our sass task will compile the `.scss` from this location _back into this location_ so the existing css copy task picks it up.

```javascript
// SASS Compilation
gulp.task('pl-sass', function(){
  return gulp.src(path.resolve(paths().source.css, '**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.resolve(paths().source.css)));
});
```

> Note: Read more about Gulp Sass configuration [at its Github repository](https://github.com/dlmanning/gulp-sass).  

You can test the task from the command line:

```bash
gulp pl-sass
```

> Another Note: I namespace most tasks with `pl-` in an attempt to avoid naming conflicts.

If everything is setup right - we see the `scss` compile into `css`. We are not done yet, however. We need to integrate our `pl-sass` task into the main toolchain. Critically, sass compilation needs to occur before copy of the css. Let's look at the `pl-assets` task:

```javascript
gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css'
  ),
  function(done){
    done();
  })
);
```

This task uses the new gulp 4.X syntax to clearly define what tasks must run in sequential order (series) versus in parallel. This task reads in plain English as: _When I'm told to run `pl-assets`, first run all the `pl-copy` tasks in whichever order you like, and then tell the caller when I'm done._

Something you might notice from the example is that `gulp.series()` and `gulp.parallel()` calls are "nestable." Armed with that knowledge, we augment the task as follows:

```javascript
gulp.task('pl-assets', gulp.series(
  gulp.parallel(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:favicon',
    'pl-copy:font',
    gulp.series('pl-sass', 'pl-copy:css', function(done){done();}),
    'pl-copy:styleguide',
    'pl-copy:styleguide-css'
  ),
  function(done){
    done();
  })
);
```

We've now ensured that `pl-sass` is called before `pl-copy:css` - while maintaining as much asynchronous processing as possible. We can test `pl-assets` individually if we like. Or since it's included in the `patternlab:build` task, we know the task will run with existing Pattern Lab commands.

The last thing we have to do is still gulp to re-run our `pl-sass` task after every `.scss` file change. Add the following to the `watch()` function:

```javascript
gulp.watch(path.resolve(paths().source.css, '**/*.scss')).on('change', gulp.series('pl-sass'));
```

With this in place the entire build chain will fire every time you save a sass file.

For simplicity's sake, the complete altered gulpfile can be found here: [https://gist.github.com/bmuenzenmeyer/7a6ec54dc1ea720a61497a75ea88e3b4](https://gist.github.com/bmuenzenmeyer/7a6ec54dc1ea720a61497a75ea88e3b4) and is current as of Edition Node Gulp ~`1.3.0`

I hope that this short post demystifies what it takes to grab a copy of Pattern Lab 2 and hack it up! We've spent a lot of time making an ecosystem that is flexible, extensible, and ready for you and your teams to make it your own.

And as always, please give us feedback, no matter how small. Spot a typo in the docs, or this post, or think a feature would be killer? Let us know.

* [Chat with us gitter](https://gitter.im/pattern-lab/general).
* [Tell me on Twitter what you are building with Pattern Lab Node!](https://twitter.com/bmuenzenmeyer)
* [Follow the official Pattern Lab account for the latest news](https://twitter.com/patternlabio)
