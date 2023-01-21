---
layout: item
title: The Device Test Imperative
summary: A cautionary tale... ye be warned!
date: 2013-12-13T15:51:13.697Z
tags:
  - post
  - testing
---

_This post refers to an old version of_ [_brianmuenzenmeyer.com_](http://brianmuenzenmeyer.com "‌"), but the lesson is important.

When creating the masthead for this site, I was quick to ensure support in Chrome, Firefox, and IE 10-8. It was easy, I suggest _too easy_, to test the fluid layout and media queries by resizing the window, or using a tool like [this one](http://we-are-gurus.com/tools/responsive-design-tester.php "‌") to gut-check various viewports.

None of this, however, could satisfy the necessity of testing on a real mobile phone. Here's what I saw on mobile Safari on my iPad and iPhone:

![](http://media.tumblr.com/44579688d0cc9ae1959c70298ceb0936/tumblr_inline_mxic1fWSEw1s7cfvn.png)

Frustrating! What could have caused this? I kicked into Firefox's 3D mode, confirming the masthead's 200% width trick was extending the page width, but my current `overflow: hidden` declarations were not being honored.

Some digging revealed that mobile Safari overflow rendering rules are different, and that I should try the following CSS.

```css
html {
  overflow-x: hidden;
}
```

Sure enough, fixed for all tested version of Safari. Need to test Android and other devices, sure, but this was another small reminder to get into a browser - especially mobile browsers, as soon as possible.
