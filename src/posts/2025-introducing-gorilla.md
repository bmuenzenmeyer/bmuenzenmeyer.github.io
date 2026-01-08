---
layout: post
title: "Introducing Gorilla: A Parent-Controlled YouTube Experience"
summary: "A New Way for Parents to Curate YouTube Content for Their Kids"
date: 2025-12-30T21:28:01.968Z
tags:
  - post
  - gorilla
  - parenting
  - boythisishard
---

[Watch the getting started video on Gorilla.tube](https://gorilla.tube/docs/first-run/)

So, I counted.
I have 7 iPads in this house. _Seven_. School is a factor, as is the steady accrual of _stuff_. Readers will know we have four kids.
I am not proud of this first fact, but the latter is a continual source of challenge and reward.

It's perhaps then not a surprise that Megan and I don't have a lot of time. Yeah yeah everyone has the same amount of time. Those folks can shove it. Many afternoons are spent with the kids watching a screen, while Megan and I get something done, or steal away on an errand.

Yeah, they are those things. _iPad kids_. We let it happen to them, after all. And most of the time on them is watching YouTube.

We try our best to curate what they watch. We tried YouTube Kids. But it was just too limited, and frankly, a bit of a pain to manage.
I don't want to have to remember my crazy long gmail password just to add a channel, only to find it isn't available in YouTube Kids anyway.

So I built [Gorilla](https://gorilla.tube). It's an app that creates small YouTube wrappers. I thought about it while vacuuming one day. There are plenty of free tools and tiers out there to stitch together a static experience. I learned a lot along the way, and hope to share it here.

## How it works

For the tech savvy, Gorilla is a static site generator generator. It's an Electron app that helps you build a static 11ty site generated from YouTube channel IDs you provide. The app uses an YouTube API key I help folks create to load videos. Gorilla then builds a page for each channel and video. It merges more videos on subsequent runs. No dynamic content is present in the final product. I help users deploy the site, currently to Netlify. All together, a parent can set all this up in under 15 minutes, and all they need is an email address.

The UX of the deployed site is dead simple. It's devoid of UX noise like animations or sounds on swipe. YouTube kids might have something on me there in terms of joy, but I present the simplest possible experience. It's videos. I do a lot of things to try to keep users on the site, but YouTube spends equally as much effort to pull them into their ecosystem. A worthy fight, I say.

## Anything I can do you can do better?

Yeah, you could build this yourself. I did too! That's sorta the point, my tech-minded friend. But for those many many parents that cannot stitch it together, this is a lifeline. One I wager has value. Anyone could build this. But at what price would you just take mine? How much is your time worth? This is a departure for me, for sure, the usual [open source advocate](https://approachableopensource.com).

## Tradeoffs and Learnings

Building Gorilla was enjoyable for a multitude of reasons.

I learned a lot about Electron app development and distribution. Conceptually I understood its capability set and limitations, but now I got to experience signing, notarizing, the prospect of building for multiple platforms.

I got to simultaneously build three products and ready them for consumption: the Gorilla app, the static site product it generates, and the website. I was able to personally experience the tradeoffs of LLM tools and copilots. Rapid greenfield development was _FAST_ for initial concepts and prototyping, but more and more layers of constraints and polish challenged those initial velocities. The tools make really silly, circular mistakes if you let them. I suspect instructions and more context management up front would help here - again, something I conceptually understand and use at work - but unconstrained here during product development, it was fun to see the mess it could make of simple tasks. I had most success when pausing to write really clear use cases, instructions, and constraints before attempting code. I also noticed real differences in experience depending on the model.

Another fun experiential deep dive was tailwind. I'd used it on smaller projects before. Ridiculously easy to write but slow to refactor - and I real-time wondered if adopting a component language (the site and template app are old school HTML (with some Web Components emerging as I hand code them!) or giving it more prompts would have yielded better success. Just really poor things like repeated markup patterns with a dozen classes. That's what the cascade is for after all! The LLM did silly things with the hammers it has - everything seems a nail. For example, the user documentation should largely be markdown. Nope, it's rich HTML with tailwind's beauty. Add it to the TODO list, or better yet, give it clearer prompting. Still a capable tool when used with eyes wide open.

I feel fortunate to be able to ship quickly so as to validate the product approach, but also have a full accounting of shortcuts made along the way.

## For Us. For You. For Them.

I have also enjoyed including the boys in the process. They give me product feedback all the time. They reported bugs. They were proud to tell me about the infinite watch glitch they found. They validated some patterns. It's for them. And for us. To help us take back a little more control over our time and attention. This ain't a cold-turkey refutation of screentime or videos. It's just a way to make it work better for us.

Anyway. Time worth spent. If you are a parent struggling to curate YouTube for your kids, give [Gorilla](https://gorilla.tube) a try.
