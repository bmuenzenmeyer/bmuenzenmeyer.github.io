---
layout: post
title: Lemon Box Letterforms
summary: When life gives you a lemon box, you labor over creating it with CSS.
date: 2021-06-10T15:22:50.188Z
tags:
  - post
---

I never thought a box from a warehouse grocer would create typographic inspiration, but here we are.

The object of my obsession:

<picture>
<img
sizes="(max-width: 1200px) 100vw, 1200px"
srcset="
/img/7c6bd78d-400.jpeg 400w,
/img/7c6bd78d-800.jpeg 800w,
/img/7c6bd78d-1200.jpeg 1200w"
src="/img/7c6bd78d-400.jpeg"
alt="A cardboard box for bulk lemons">
</picture>

I sat playing with my kids in the driveway and this curiosity caught my eye. There it was, just inside the garage, a bulky box holding other broken-down cardboard. The contrasting shadows and lettering really played nicely against the black-to-yellow-striped gradient. The English and French labeling felt like a design decision more than a utilitarian retail requirement. I snapped a picture and then forgot about it until later that night when I brought it up to Megan. She too noticed the lemon box and planned to save it from a fate at the end of the driveway for commingled recycling pickup. We both noticed it without consultation (Marriage!).

Compelled to both honor and emulate this design, I opened codepen.

Before I go too much further, I submit this disclaimer: it's been a while since I built anything this detailed. My career is pulling me closer to what [Brad Frost](https://twitter.com/brad_frost "‌") calls the [back-of-the-front-end](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/ "‌"). So opportunities to exercise front-of-the-front-end skills now present themselves as a lark to replicate the look on a box of citrus fruit.

## The Build

I knew I needed a thick border. My first attempt layered a bunch of text-shadows, like this:

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="css,result" data-user="bmuenzenmeyer" data-slug-hash="OJWXXyM" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS text-shadow">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/OJWXXyM](https://codepen.io/bmuenzenmeyer/pen/OJWXXyM "‌")">
LEMONS text-shadow</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

What I discovered is that the shadow thickness wasn't exactly configurable in the [way I had remembered it](https://css-tricks.com/i-dont-know/ "‌"). The thicker you specify it the more it turns into a shadow, making an interesting neon effect but not what I was going for. I decided I needed an SVG.

I knew of the `text` element within an SVG and found a [good primer on CSS-Tricks](https://css-tricks.com/svg-text-typographic-designs/ "‌"). This element supports custom fonts, CSS, and importantly, stroke and fill properties. I made good headway with this approach, overcoming several challenges but also creating new ones. For example, the [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap "‌") and [stroke-linejoin](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin "‌") attributes, in combination with particular fonts, produced odd artifacts at extreme stroke widths.

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="result" data-user="bmuenzenmeyer" data-slug-hash="35d49c1ab0e8a5fd80fe1db1a5d646b5" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS lettering - font - exploration">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/35d49c1ab0e8a5fd80fe1db1a5d646b5](https://codepen.io/bmuenzenmeyer/pen/35d49c1ab0e8a5fd80fe1db1a5d646b5 "‌")">
LEMONS lettering - font - exploration</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

I do like some of those failures in a Pikachu or metal kinda way 🤘.
Placing the contrasting text-shadow wasn't too bad (aside from the trial-and-error-based positioning), and fell within my recollection of how to stack the effects. I imagine this could be improved. Satisfied with progress on the letterforms (and noting an issue about the accessibility of repeated `text` to only create the shadow), I turned my attention to the black and yellow background.

I first attempted a Sass loop to generate color stops in a repeating linear gradient. It did not go as planned.

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="css,result" data-user="bmuenzenmeyer" data-slug-hash="oNZPqvW" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS gradient - worse">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/oNZPqvW](https://codepen.io/bmuenzenmeyer/pen/oNZPqvW "‌")">
LEMONS gradient - worse</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

The stripes were inconsistently spaced, the edges seemed blurry, and it felt too brute-forced. I recall spending entirely too long tweaking the percentages and trying to get the whole thing to interpolate from my concatenated Frankenstein Sass variable into a valid attribute. There had to be a better way.

Narrator: There was.

From what I gather, I was misusing [repeating-linear-gradient](<https://developer.mozilla.org/en-US/docs/Web/CSS/repeating-linear-gradient()> "‌"), trying to create the repetition myself instead of letting the CSS do that for me.

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="css,result" data-user="bmuenzenmeyer" data-slug-hash="69f13aedf3df8388ae807e485665fadc" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS gradient - better">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/69f13aedf3df8388ae807e485665fadc](https://codepen.io/bmuenzenmeyer/pen/69f13aedf3df8388ae807e485665fadc "‌")">
LEMONS gradient - better</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

Closing the "O" on "LEMONS" and "CITRONS" was next, as was adding a [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox "‌"), something I learned from [Chris Coyier's](https://twitter.com/chriscoyier "‌") book, [Practical SVG](https://abookapart.com/products/practical-svg "‌").

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="result" data-user="bmuenzenmeyer" data-slug-hash="968718a3869848b7bafbc6f139cfd225" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS closed O">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/968718a3869848b7bafbc6f139cfd225](https://codepen.io/bmuenzenmeyer/pen/968718a3869848b7bafbc6f139cfd225 "‌")">
LEMONS closed O</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

For the finishing touches, I found an adequate lemon image and added a white border in keeping with the original box. I put a `vw` width on the lemon for now, so it scales a bit with the SVG.

<p class="codepen" data-height="500" data-theme-id="33490" data-default-tab="result" data-user="bmuenzenmeyer" data-slug-hash="9ca37f6a11777ead772fcf4b2f46c3eb" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="LEMONS picture">
<span>See the Pen <a href="[https://codepen.io/bmuenzenmeyer/pen/9ca37f6a11777ead772fcf4b2f46c3eb](https://codepen.io/bmuenzenmeyer/pen/9ca37f6a11777ead772fcf4b2f46c3eb "‌")">
LEMONS picture</a> by Brian Muenzenmeyer (<a href="[https://codepen.io/bmuenzenmeyer](https://codepen.io/bmuenzenmeyer "‌")">@bmuenzenmeyer</a>)
on <a href="[https://codepen.io](https://codepen.io "‌")">CodePen</a>.</span>
</p>
<script async src="[https://cpwebassets.codepen.io/assets/embed/ei.js](https://cpwebassets.codepen.io/assets/embed/ei.js "‌")"></script>

## The Takeaways

Well, this was fun! I don't know if I will do anything further with this but it felt like a return to the [type explorations](https://codepen.io/collection/XPkOZQ "‌") of yesterday. I don't know if you learned anything from watching my process. Or rather, my reverse-engineered process. It took much longer to write this post than it did to mess around in CodePen. Other thoughts:

- I am pretty happy with my background awareness of what tools were available to me. I didn't know _how_ to do everything out of the gate, but I knew _what_ I wanted to do. And that made all the difference.
- I admire anyone writing technical how-to articles. I imagine folks plan the post during the build, saving valuable time along the way. This was my first one, and breaking it apart after it was nearly complete took time.
- I googled so So SO many things along the way here. [Searching for things is part of the job.](https://localghost.dev/2019/09/everything-i-googled-in-a-week-as-a-professional-software-engineer/ "‌")
- Color matching is hard! I now know why Megan keeps her expensive pantone swatches in a safe, dark place.
- Don't forget to [improve the commons while you walk through it](https://github.com/mdn/content/pull/3361 "‌").
- Megan and I now nab these boxes whenever we can - they are sturdy, deep, and beautiful.

‌
