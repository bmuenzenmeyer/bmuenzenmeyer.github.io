---
layout: post
title: CSS-IN-JS
summary: A tweet, a bus ride, an "it depends."
date: 2018-05-08T15:13:00.413Z
tags:
  - post
---

<strong>This post is an opinion about CSS-IN-JS. There are many like it but this one is mine.</strong>

It started on my bus home.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How 'bout that CSS-in-JS? <a href="[https://t.co/mcR9scUhQq](https://t.co/mcR9scUhQq "‌")">[pic.twitter.com/mcR9scUhQq](http://pic.twitter.com/mcR9scUhQq "‌")</a></p>— Brad Frost (@brad_frost) <a href="[https://twitter.com/brad\_frost/status/993920969990397952?ref\_src=twsrc^tfw](https://twitter.com/brad_frost/status/993920969990397952?ref_src=twsrc%5Etfw "‌")">May 8, 2018</a></blockquote>
<script async src="[https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js "‌")" charset="utf-8"></script>

I cannot help but be slightly triggered by the tweet. The code snippet demonstrates a fundamental misunderstanding of React and how to apply styles to React components. Anyone seasoned in front end cringes. But to package this up and say "How ’bout that CSS-IN-JS?" really misses the mark for me. This is not Brad’s code (he knows better): it’s a strawman. Perhaps a throwaway joke. But what it also does is dangerously conflate CSS-IN-JS with inline styles. To associate that code with CSS-IN-JS is disingenuous. Some readers of that tweet may misunderstand Brad's intent and come to the conclusion that _this code_ is representative "state-of-the-art" CSS-IN-JS. We aren’t constructively furthering the conversation this way. Most CSS-IN-JS solutions now output classes. Full stop.

#### We Drive into the Future Using Only Our Rearview Mirror

We all take for granted at this point how wrong the above code looks. We (I liberally assign myself in the following camp) come up in a world where CSS became more and more powerful and standardized. We can make CSS do [some](https://codepen.io/thebabydino/pen/paAJw "‌") [truly](https://codepen.io/davidkpiano/pen/wMqXea "‌") [magical](https://codepen.io/jakealbaugh/pen/qNrZyw "‌") [things](https://codepen.io/davidkpiano/pen/xLKBpM "‌"). I revel in making CSS do amazing things just as much as the next developer. I’ve sweated the details within custom keyframe animations, crafted complex responsive layouts, built whole component libraries from scratch atop a BEM `block--element__modifier` tower. It felt great.

Now, the product I work on at my job helps other teams write products quickly. It’s primarily a React application, so a modern front-end stack is expected. It can be complicated. We use a CSS-IN-JS technical solution as part of this product. [JSS](https://github.com/cssinjs/jss "‌") to be exact ,though the specifics do not matter to me for the purposes of this post.

When onboarding new teams, we often stumble into a styling discussion. This is in addition to Javascript, ES6, React, and our proprietary componentry. It’s a lot at once. Those with prior CSS knowledge seem to pick it up pretty quickly. Many still wish to leverage CSS or Sass. I’ve started sharing out [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660 "‌") by Mark Dalgleish as a superbly balanced look at the landscape. He goes into much deeper detail than I do here. Please go read it.

I find it useful to look at a simple styled React component as a gentle introduction to a lot of concepts.

```js
import React from "react"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"

function Button(props) {
  const { children, classes, text } = props
  return (
    <Button className={classes.button}>
      {children} {text}
    </Button>
  )
}

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
    color: "currentColor",
    background: theme.myCompany.primary,
    "& svg": {
      marginLeft: theme.spacing.unit / 2,
    },
  },
})

export default withStyles(styles)(Button)
```

#### In-file Collocation

I have a co-worker that is not cut from the same cloth as I—he has little prior front-end experience. The muscle memory of dev tool inspection, source maps, `.scss` @imports, and the like is not present in him. Hunting for a static class name in a file somewhere, or worse, a descendant selector feels daunting. Same-file collocation allows the styles that affect the component in question to be next to the markup and functionality. On purpose. Contained. As a single portable component.

Rather than forcing him to learn and follow a convention, the styling is right there for the reading alongside the component he implements.

#### Consume the Primitives

CSS-IN-JS (as the second step of React’s HTML-IN-JS approach) makes sense because it puts the most primitive functionality inside the most powerful, allowing for the powerful features to augment the primitive. This is what the smartphone did to clocks, contact lists, calendars, notepads, ad nauseum. Now my smartphone can schedule a meeting with someone halfway across the country at the right time for both of us—by helping me string together a bunch of separate concerns into a single flow.

Let’s look closely at the styles in the above snippet. Yes, it’s simple.

```js
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
    color: "currentColor",
    background: theme.myCompany.primary,
    "& svg": {
      marginLeft: theme.spacing.unit / 2,
    },
  },
})
```

`margin`,` color`,` background`. All properties we are familiar with. But look at the value for `margin` or `background`. It relies on a theme object supplied at the top-level application to reference a size or color. A single place to handle design-tokens. Notice that escendant selectors work. I think this is cool. Because it’s all still Javascript at the end of the day, we can do math, or really reference any arbitrary logic we want (color the app Green on March 17th?).

Media queries work.

```js
const styles = (theme) => ({
  root: {
    margin: `0 ${theme.spacing.unit * -3}px`,
  },
  "@media (max-width: 1250px)": {
    root: {
      margin: `0 ${theme.spacing.unit * 2}px`,
    },
  },
})
```

Pseudoclasses work.

```js
const styles = {
  paragraph: {
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
}
```

`@supports` work.

```js
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  "@supports (display: grid)": {
    root: {
      display: "grid",
      gridTemplateColumns: "1fr 800ch 1fr",
    },
  },
})
```

CSS fundamentals are required—but we have some powertools in our workshop now. Got lots of classes to manage? Look no further than [classnames](https://github.com/JedWatson/classnames "‌").

And yes, we still need progressive web applications. We still need `@supports` feature detection, we still need to cut the mustard. We still need _web design_. CSS-IN-JS does not significantly erode or impede these necessities should someone need to build for them. I hope none of this persuades you otherwise!

#### CSS Yes

Guess what? Your CSS badassery translates into a CSS-IN-JS solution. Teams still need an expert to own the craft of applying visual styles to markup. Doing so correctly and in a scalable manner is still key. All those years of accrued knowledge fighting browser quirks, consulting caniuse, learning CSS grid, clip-paths, gradients, etc, has only made me more powerful in a CSS-IN-JS world. It has translated just fine. I still need to know CSS in order to make something look the way I want to.

There is a time and place for every tool. CSS-IN-JS makes a lot of sense in a lot of situations that I have encountered in my real-life™ work helping teams. Sass continues to be my go-to everywhere else. Are you building a design system? You may need the portability of the primitive (Brad mentions this in the article below). I doubt I’ll ever advocate CSS-IN-JS to my personal clients—because I am interested in [crafting right-sized solutions](http://crunchyowl.com/ "‌") and most people I serve haven't needed something so heavy. But for teams building large apps atop React it feels like a sane way forward.

#### Wrapping Up

I end with this.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">There’s been some knee-jerk reactions from different communities (incl. React) to what Brad is posting as he’s exploring front-end libraries. Let’s remember we can disagree about a lot and still teach each other amazing things</p>— Dan Abramov (@dan_abramov) <a href="[https://twitter.com/dan\_abramov/status/994020475482361856?ref\_src=twsrc^tfw](https://twitter.com/dan_abramov/status/994020475482361856?ref_src=twsrc%5Etfw "‌")">May 9, 2018</a></blockquote>
<script async src="[https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js "‌")" charset="utf-8"></script>

I respect Dan’s perspective here. He’s very much on the cutting edge of modern front-end development and yet understands where we all came from and that together we need to go somewhere new.

P.S. I love Brad. [I work with him](http://patternlab.io "‌"), for goodness sake! While I was writing this post, Brad tweeted this and wrote this.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">For what it's worth, I'm very aware I'm throwing some zingers around without really sinking my teeth into it. I'm very much open to learning more about it, but I do remain skeptical. Hopefully this post explains a bit of my apprehension a bit better: <a href="[https://t.co/6vFKhT9Tbo](https://t.co/6vFKhT9Tbo "‌")">[https://t.co/6vFKhT9Tbo](https://t.co/6vFKhT9Tbo "‌")</a></p>— Brad Frost (@brad_frost) <a href="[https://twitter.com/brad\_frost/status/994027941121200129?ref\_src=twsrc^tfw](https://twitter.com/brad_frost/status/994027941121200129?ref_src=twsrc%5Etfw "‌")">May 9, 2018</a></blockquote>
<script async src="[https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js "‌")" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I'm very open to listening and learning more, and I'm excited to have started some great conversations with people who work with different approaches and swear by it.</p>— Brad Frost (@brad_frost) <a href="[https://twitter.com/brad\_frost/status/994028275235217408?ref\_src=twsrc^tfw](https://twitter.com/brad_frost/status/994028275235217408?ref_src=twsrc%5Etfw "‌")">May 9, 2018</a></blockquote>
<script async src="[https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js "‌")" charset="utf-8"></script>

I felt triggered today by Brad’s tweet, but also because there are folks where I work expending valuable energy, money, and [creative exhaust](http://bradfrost.com/blog/post/creative-exhaust/ "‌") building CSS only solutions, missing out on an opportunity to explore new territory. They see Brad’s of the world as standard bearers of the familiar, as I do. I think the problems Brad highlights are valid and warrant pause. Teams need to ultimately decide what is best for them over the lifespan of their product. I hope they try different approaches and construct an _informed_ opinion.

And then, as my friend puts it, I hope they [share what they know](https://twitter.com/brad_frost/status/450619808795885569 "‌").
