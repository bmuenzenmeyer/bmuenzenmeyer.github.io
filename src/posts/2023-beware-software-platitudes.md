---
layout: item
title: Beware Software Platitudes
summary: Maybe it should be "don't repeat otherselves"
date: 2021-10-08T15:28:52.432Z
tags:
  - post
---
The other day at work another engineering team reported a bug that should have been impossible. We distribute a custom `ErrorBoundary` for our users which implements the React [lifecycle method ](https://reactjs.org/docs/react-component.html#componentdidcatch "‌")`componentDidCatch`:

```
componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }
```

We operate on the `info` parameter, but in this case, the calling app did not supply the `info.componentStack` property. Operating on this `undefined` value caused the customer's app to crash, hiding the source error. It was really frustrating! We double-checked a stock version of our app and ensured Babel was adding this metadata correctly under normal circumstances. The popular [react-error-overlay](https://www.npmjs.com/package/react-error-overlay "‌") library with 5.7 million weekly downloads is making the same assumption that this property will be present (but they aren't as exposed because they don't operate on it, only pass it through). So what was causing React to omit the data on error? No other users have reported this to date.

> Within any relationship, how hard should you work to accommodate a bad actor?

A patch is trivial at this point, but it sparked a healthy debate as to whether we should bother. Kudos to our newest engineer for questioning this. Do we change our code and release a patch during peak season to account for what seems like an anomaly? Do we tell the customer to implement the temporary fix within `node_modules` so that they can see their error and resolve it before our `ErrorBoundary` trips? Do we take the time to better understand how React got into this odd state?

As we debated, I fumbled for a bit to recall the specifics of [the robustness principle](https://en.wikipedia.org/wiki/Robustness_principle "‌"):

> be conservative in what you do, be liberal in what you accept from others

Applying this logic to our `ErrorBoundary` I suggested we move forward with the patch, asserting the presence `info.componentStack` before operating on it. Optional chaining or piping to a fallback string is all we need. The `info` object is the API we are accepting incoming data. We should validate input, right? Or shouldn't we? This comes straight from React! I'd hope we could trust React's API at this point.

Our new engineer pointed out that codifying this exceptional case into our code might prevent future teams from seeing similar outcomes, but it might also train teams that the circumstances leading to this error are ignorable. All good points! The Wikipedia article even criticizes the robustness principle along these same lines. But here I was repeating this smart thing I've heard in an attempt to frame a decision. I think the robustness principle was the wrong lens to be viewing this decision through, and a patch is still necessary even in this odd case.

Why? Because we must balance **impact over intent.** A team is blocked in part because our code prevents them from seeing their error. So we will likely release a patch - but not in pursuit of dogmatic purity with a platitude. We will release a patch because we can make someone's workday a bit better.

> For the curious: We've since traced the bug to a library and contributed a fix. React errors in this way if you try to remove an eventListener from a ref that might have been unmounted. That's a sentence that might not make sense to everyone and I agree! Lint rules even exist to prevent this. Saying nothing about the health of the other library or React, we are still releasing a patch, for the same reasons.

‌