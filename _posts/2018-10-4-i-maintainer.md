---
layout: post

title: "I, Maintainer"
tags: "open source"
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ""
summary: 'Because it is more than "Be Glad It Exists"'

comments: false
---

Pattern Lab development is stagnating.

The evidence is everywhere. My [3.0 milestone](https://github.com/pattern-lab/patternlab-node/milestone/22) is almost 1 year overdue. Release frequency is down. Questions increasingly go unanswered. Issues remain in a triage, unresolved state. Uncertainty and frustration brew within the community room.

I've struggled with how best to articulate my feelings about this. Especially to the community. To the individuals, teams, and companies that have come to rely on Pattern Lab. I owe an explanation. What I hope follows is not perceived as an exculpatory list of excuses. Rather, I plan to use it as an open framework to confront, define, and buttress my value system as it pertains to open source software. Then, I hope I can act upon these values.

I am finding it harder and harder to muster energy and sustained focus on the project. The principle reason is that I no longer use Pattern Lab every day. Perhaps that is the end of the article. Ship it.

But there is more to it than that.

There is more because Pattern Lab has meant more to me than a tool. It's been a vehicle to transform how I work. Learn new techniques. Meet and become friends with amazing folks from all over the world. Advance my career. And I doubt I am alone. The wave of interest in Atomic Design and Design Systems carries so much potential energy. Pattern Lab can create and direct that energy into better, more efficient output and workflows. Others harness this energy.

We can make better and better web things with the stuff we are building. I wouldn't have done any of this if I didn't think the tool delivered on that promise. I doubt the original creators would have either.

An important fulcrum in this discussion just wedged itself into the conversation, however. Did you notice it?

We.

Many people use Pattern Lab. It's not a side-project. It's not a toy. It's how people make money to bring home to their families. This fuels and haunts me. It is my shame and my fount of renewal. It gets me up at 3 AM. Keeps too many browser tabs open. Gets me thinking about features in the shower. Reading issues on my phone while I am playing with my kids. It connects me to something larger than myself. Open source is not "be glad it exists." That is reductive and dismisses the motives of those that have come before us. We owe them better too. **Open source is not about what you can consume; it's about what you can create.**

It's a responsibility. Its a weight you choose to carry if you can.

### Muenzenmeyer's Laws of Open Source Maintenance

Maintenance is a responsibility. Throwing something on GitHub is not enough. The building maintenance person must keep the floors clean. The bathrooms operational. The entrances clear during the day and locked at night. The furnace running. The lighting adequate. The smoke detectors functioning. The facade protected from the elements. Shirking any one of these duties impairs the capabilities of occupants and visitors. These are essential responsibilities. With responsibility comes a requirement to act always in accordance to that responsibility.
[People have said it better](https://quoteinvestigator.com/2015/07/23/great-power/). Open source maintenance is no different.

To distill a maintainer's responsibilities into core facets, I have borrowed from [Asimov's Three Laws](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics). Perhaps it feels like a dramatic summary of the rather mundane task of pushing to a public git remote. But if you feel that way, I've likely already lost you. That's fine. These laws have my name on them, not yours.

### 1. A maintainer may not harm a user or, through inaction, allow users to come to harm

When maintainers choose to open source software, they are implicitly (and often explicitly) creating a contract. Contracts are based on trust and they are bi-directional. They are the written manifestation of an agreement between two parties.
A promise with potential users. This software works as defined. Installation yields this result. This API returns `X`. _See for yourself, the code is right here_. Contribute in this way. Find support here. Here is the roadmap.

Maintainers, via the byproduct of their every action, create the norms of the project. A welcoming atmosphere creates a safe environment. Sustained engagement sets a collegial tone. Quick response times inject an air of reliability. Frequent releases suggest alacrity. These are all promises maintainers extend to users that come upon the project. These are lofty promises but promises maintainers aspire to keep.

Truth is, I cannot devote as much time as I _used to_. I almost wrote "_like_", but I need to be honest with myself and with you. I like doing other things. These other pursuits compete for limited time. Atop this, I am finding increasing satisfaction, challenge, and growth from my day job than the escapism Pattern Lab granted me in days past. This amounts to inaction, and it is harming Pattern Lab and the community that relies upon it.

Shipping incomplete features. Shipping undocumented functionality. Outpacing my output with overpromising. Sitting on pull requests. Dismissing the notifications of chats and requests and questions without responding. These are all things I have done at one time or another. Not out of malice. No. Out of working too fast, too cloistered, not in accordance with the empathy for others required of a maintainer. This amounts to harm.

### 2. A maintainer must shepherd their project and empower the community to do the same

When maintainers choose to open source software, they do so not in a vacuum, but as part of a living, breathing system. We usually call it the Internet. If they are lucky, other folks find their software useful and want to use it. If they are even luckier, other folks find the software almost useful and want to improve it. Open source is a relay race, with each maintainer taking the baton from those before them. Try to make it a long-distance race, not a sprint.

Maintainers must acknowledge that, as they had built atop the work of others, folks will build atop their work. They will come and voice desire to help. Maintainers must be ready to receive them and hand them the baton. Well-constructed projects attract individuals that want to invest more time into the project. They see well-written documentation, clear roadmaps, thorough contribution guidelines, inclusive codes of conduct, vibrant online communities, frequent releases, and clear code as as time well spent. Making it all available to them to contribute back to is empowering.

Hiding logic inside monolithic constructs, making extension and customization difficult, and infrequently interacting with the community is a major disincentive to investment.

Maintainers that foster a collaborative environment end up diffusing the weight of responsibility into shared efforts that outlast their own contributions.

For too long in Pattern Lab's 3.0 lifecycle I sat on the `dev-3.0` branch. When it proved too much to maintain 2.X and 3.X branches, I cut `dev` over to 3 and started `alpha` releases. I hoped that by working in the open folks would be able to help. The net result has been confusion. I've introduced new parts of the ecosystem which are lynch-pins to success yet buggy or unintuitive. I've added technical complexity in the monorepo. I've not retired the old 2.X repositories yet. I've lagged in documentation.

I've not asked for much help. I've not created an environment where folks can take earnest investment in contribution and be met with success for their efforts. I know how I'd feel if I were you all.

### 3. A maintainer must protect their own existence as long as such protection does not conflict with the First or Second Laws

Ah! The heart of the matter. The Law that creates all the fun in Asimov's work. A [trolley problem](https://en.wikipedia.org/wiki/Trolley_problem), perhaps. When maintainers choose to open source software, they do so at their own risk. Humans are hard-wired to remember negative feedback more than positive feedback. Ten-fold positive interactions eroded by the displeasure on a single negative. Time spent on the project can feel futile with ever-increasing scrutiny, demand, and newcomers. The amount of effort required to maintain a healthy, growing project is immense. There are two main definitions of maintain:

- cause or enable (a condition or state of affairs) to continue
- provide the necessities for life or existence

The order should be reversed, but there is no doubting that both definitions apply. A maintainer must keep the needs of their project, their community, and their own needs in constant harmony. If the maintainer does not release quality software, the entire venture is moot. If the maintainer does not steer the project openly, users will wander elsewhere. If the maintainer burns out, it's game over. When a maintainer chooses their reality over the reality of their users, they betray the trust put in them by users. They are prioritizing their own needs.

Good. No one else will as easily.

But to do so without implementing a healthy, sustainable community is acting against the interests of the project. It is an abdication of the very responsibility they have earned.

I pledge to live by these laws to the best of my ability. I pledge to better understand my responsibilities and act upon them. I pledge to run this race, and to understand that I carry a baton, and to look for those waiting for me.
