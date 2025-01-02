---
layout: item
title: "Do I Need This Node Dependency?"
summary: Advancements over time in Node.js are improving the out of the box experience.
date: 2024-12-31T17:59:37.613Z
tags:
  - opensource
  - post
  - nodejs
---

> 📣 Dependencies are great! Don't confuse this post as a refutation of the module system. Node.js has been so successful in part because of its healthy ecosystem on the npm registry. A healthy standard library is not designed to handle every use case. There is room for both here.

It's been exciting [contributing](https://github.com/nodejs/nodejs.org/graphs/contributors) to the [nodejs.org website](https://nodejs.org/en). It's a five-way intersection of technology, legacy choices, market forces, language, and people. Playing part-engineer, part-traffic cop through it all is rewarding and humbling. One of the benefits of this time is the awareness of the Node.js project's velocity of new and feature releases. New versions are released all the time across [Active LTS and Current](https://nodejs.org/en/about/previous-releases) development lines. It's easy to miss something between the release notes and our busy work schedules.

> 🙈 `tldr` [Skip to the unifying narrative](#️pace-layers)

<!-- START doctoc -->
<!-- END doctoc -->

## 🆕 Newish Features

Through the efforts of contributors over several recent majors, great new features are landing. Each is useful in isolation, but put together they form a more and more comprehensive standard library. Are we gonna celebrate some things that have been around for 2+ years already? You bet. This post highlights these new or newish features, ordered by availability:

| Feature                                       | Introduced | Release Status                                                     |
| --------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| [testing source code](#testing-source-code)   | 16.17.0    | Stable as of 20.0.0                                                |
| [watching source code](#watching-source-code) | 16.19.0    | Stable as of 20.13.0                                               |
| [parsing arguments](#parsing-arguments)       | 18.3.0     | Stable as of 20.0.0                                                |
| [reading environment](#reading-environment)   | 20.6.0     | Active Development                                                 |
| [styling output](#styling-output)             | 20.12.0    | Stable, as of [22.13.0](https://github.com/nodejs/node/pull/56329) |
| [run typescript](#typescript)                 | 22.6.0     | Active Development                                                 |

Interestingly, these releases potentially replace an external dependency in your project.

| Feature                                       | Dependency Replaced |
| --------------------------------------------- | ------------------- |
| [testing source code](#testing-source-code)                           | jest, ava, ts-jest?  |
| [watching source code](#watching-source-code) | nodemon             |
| [parsing arguments](#parsing-arguments)       | commander, yargs    |
| [reading environment](#reading-environment)   | dotenv              |
| [styling output](#styling-output)             | colors, chalk       |
| [run typescript](#typescript)                 | ts-node, tsc(\*)    |

> 📦 "Replacing" a dependency might be a strong stance. Remember [the principle of least power](https://www.w3.org/2001/tag/doc/leastPower-2006-01-23.html). Start with simple, and only introduce complexity as your project needs it. 

To demonstrate this incremental migration, I've prepared a [contrived CLI and server](https://github.com/bmuenzenmeyer/time-to) as a code sample. You can of course skip to the end with that link, but I'll be walking through it commit by commit.

The project is called `time-to` - and simply reports the number of days, hours, minutes, and seconds until a given date. This was inspired by my kids always asking "how many days until ____?" It has a "CLI" and a server, both of which support command line arguments and environment variables. 

> 🙉 For the purposes of this demo, it avoids all the concerns that timezones and dates would introduce and naively hand waves them away. The business logic isn't the star here. 

Let's get started!

## 🥼 Sample Project

The core of the project has this business logic, ripped straight from an LLM cause they are good at generating garbage:

```javascript
export const createUTCDate = (
	year,
	month,
	day,
	hour = 0,
	minute = 0,
	second = 0,
	millisecond = 0,
) => {
	return new Date(Date.UTC(year, month, day, hour, minute, second, millisecond))
}

export const calculateTimeFromNowTo = (dateString) => {
	const now = new Date()
	const utcNow = createUTCDate(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		now.getHours(),
		now.getMinutes(),
		now.getSeconds(),
		now.getMilliseconds(),
	)
	const then = new Date(dateString)
	const diff = then.getTime() - utcNow.getTime()
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((diff % (1000 * 60)) / 1000)

	return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

```

None of this is terribly important. But we are getting there.
You can invoke the CLI with:

```bash
node src/index.js --to 2025-04-20 # jack's birthday 🎂
```

which emits:

```bash
108d 1h 55m 10s # but who's counting? we are!
```

It also has a server.js file copy-pastaed from the <https://nodejs.org> homepage:

```javascript
import { createServer } from 'node:http'

import { calculateTimeFromNowTo } from './lib/calculate.js'

const server = createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end(calculateTimeFromNowTo('2026-01-01')))
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
})
```

Now, with `node src/server.js` one can visit <http://localhost:3000> and see the same output. Hosted, Jack could visit a website to always know the time until his birthday.

Okay, this has all been pretty vanilla. What if we wanna add some of those new features we've been talking about?

<h3 id="testing-source-code">🧪 Testing Source Code</h3>

[Docs](https://nodejs.org/api/test.html) | Introduced 16.17.0

For many projects, I'd turn to [jest](https://jestjs.io/) to test my code. It's been the default for so long, and enjoys a large ecosystem of tools and attention, making it hard to argue against.

We can test our `createUTCDate` function with this test:

```javascript
import { createUTCDate } from '../calculate.js'

describe('createUTCDate', () => {
	it('should create a date in UTC time', () => {
		const date = createUTCDate(2026, 0, 1)
		expect(date.toISOString()).toEqual('2026-01-01T00:00:00.000Z')
	})
})
```

And then run it with:

```json
"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
"test": "pnpm test:jest --watch",
```

Node.js now includes a built-in test runner, improving with each successive release. We can replace the jest scripts with:

```diff
-"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
-"test": "pnpm test:jest --watch",
+"test": "node --test",
+"test:watch": "node --test --watch",
```

I'm not interested in the code golf here, but it is worth emphasizing two things:

1. Jest's [support for ESM is still evolving](https://github.com/jestjs/jest/issues/9430), not yet with a polished developer experience. You can see the extra flag here and the direct path. Jest [provides documentation](https://jestjs.io/docs/ecmascript-modules) on how to approach this, but you can get in the weeds quickly, such as when adding TypeScript or adding more parts of the plugin ecosystem.
1. Jest is slower, even with one test. Benchmarking via `time pnpm test` against both showed the Node.js test runner to be 2.2 times faster. I don't put a lot of emphasis on it, but wouldn't be surprised to see the trend continue as test suite increase.

Node.js's test runner has an API surface similar to Jest. It has all the conventions we'd expect, like suites, tests, setup and teardown methods for suites and each test. It can perform basic mocks and spys. Code coverage is supported.

It has assertion functions, but with a slightly different shape overall. To make my test run I had to change this:

```diff
+import { describe, it } from 'node:test' // no globals
import { createUTCDate } from '../calculate.js'

describe('createUTCDate', () => {
-	it('should create a date in UTC time', () => {
+	it('should create a date in UTC time', (test) => {
		const date = createUTCDate(2026, 0, 1)
-		expect(date.toISOString()).toEqual('2026-01-01T00:00:00.000Z')
+		test.assert.strictEqual(date.toISOString(),'2026-01-01T00:00:00.000Z')
	})
})
```

The test runner seems to get a bit more full-featured with every release. Now for simple projects I think of the native runner before reaching for something stronger, like jest or [vitest](https://vitest.dev/).

<h3 id="watching-source-code">👀 Watching Source Code</h3>

[Docs](https://nodejs.org/api/cli.html#--watch) | Introduced 16.19.0

It's a common convenience to have tasks re-run when as your source code changes during development. Stopping and restarting the server each time is a pain.

Many frameworks and tools come with this built in. If not, a common choice is [nodemon](https://www.npmjs.com/package/nodemon). Our sample project  contains this script in our `package.json`:

```json
"dev": "nodemon src src/server.js"
```

Works great, and has for a long time. But now, Node.js has built-in `--watch` and `--watch-path` flags. We can replace this with:

```diff
-"dev": "nodemon src src/server.js",
+"dev": "node --watch-path src src/server.js",
```

Not much different at the surface. It works for this use case. Critically, it survives parsing errors in the JavaScript. Nodemon has much deeper functionality, such as throttling, globs, ignore patterns, and a whole config file pattern.


<h3 id="parsing-arguments">💬 Parsing Arguments</h3>

[Docs](https://nodejs.org/api/util.html#utilparseargsconfig) | Introduced 18.3.0

Our server and CLI should accept the date to calculate the "time until". 

```bash
node src/index.js --to 2027-03-21 # my 40th birthday 💀
```

Node.js has had `process.argv` since `0.1.27` so what's the fuss? Well, if you are making a true CLI, you'll usually create a bit of a harness to define the flags and commands you want to support. No doubt that tools like [yargs](https://www.npmjs.com/package/yargs) and [commander](https://www.npmjs.com/package/commander) have been the go-to for a long time.

Our arguments start by being parsed with yargs like this:

```javascript
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const values = yargs(hideBin(process.argv))
.option('to', {
    type: 'string',
    description: 'Date string to measure time until'
  })
.option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
.parseSync()
```

This works fine of course. Yargs, commander, and the like have a lot of extensive featuresets and conveniences. Chief among them to me is automated help text from your generated configuration. But for simple cases like ours, we can simplify to:

```diff
+import { parseArgs } from 'node:util'

-import yargs from 'yargs'
-import { hideBin } from 'yargs/helpers'

-const values = yargs(hideBin(process.argv))
-.option('to', {
-    type: 'string',
-    description: 'Date string to measure time until'
-  })
-.option('verbose', {
-    alias: 'v',
-    type: 'boolean',
-    description: 'Run with verbose logging'
-  })
-.parseSync()

+const { values } = parseArgs({
+	options: {
+		to: {
+			type: 'string',
+			description: 'Date string to measure time until',
+		},
+	},
+})
```

Lops off the two first arguments by default, synchronous by default, and enough for my needs. Node.js also throws an error for missing or extra params - which is nice - and again, perhaps enough. Need something stronger? You already know where to look, or could try a newcomer like [bubbletea](https://github.com/charmbracelet/bubbletea).


<h3 id="reading-environment">🌲 Reading Environment</h3>

[Docs](https://nodejs.org/api/cli.html#--env-fileconfig) | Introduced 20.6.0 | Active Development

Environment variables provide flexibility and portability to code. The obvious choice for years and years has been [dotenv](https://www.npmjs.com/package/dotenv). It's a great tool, and I will mention, the newer [dotenvx](https://dotenvx.com/) looks quite cool TBH.

But for now, one would likely reach for this wherever they want to read env:

```javascript
import 'dotenv/config'

const { PORT } = process.env
...
```

A simple enough one-liner, imported at the beginning of your app code, which reads a multitude of `.env` file patterns and hydrates `process.env`.

But Node.js can do this too!. Delete that dotenv import.

We add this to our `package.json` `dev` script:

```diff
-"dev": "node --watch-path src src/server.js --to 2025-04-20",
+"dev": "node --env-file=.env --watch-path src src/server.js --to 2025-04-20",
```

We get multiple file support with overrides and a familiar enough syntax to dotenv files. Node.js can also error or gracefully handle missing env files, the choice is yours. No doubt things like environment interpolation may require a dependency, but for most cases, this is enough.

<h3 id="styling-output">🖌️ Styling Output</h3>

[Docs](https://nodejs.org/docs/latest-v22.x/api/util.html#utilstyletextformat-text-options) | Introduced 20.12.0 | Stable as of 22.13.0

Another quick one. Say we got that `server.js` start message. Maybe we wanna highlight the full URL that some terminals can click on. 

The ubiquitous node_module chalk suffices:

```javascript
import chalk from 'chalk'
...
server.listen(PORT, '127.0.0.1', () => {
	console.log(
		`Listening on ${chalk.blue(chalk.underline(`http://127.0.0.1:${PORT}`))}`,
	)
})
```

But look at this native Node.js code, quite new if I do say so myself:

```diff
-import chalk from 'chalk'
+import { styleText } from 'node:util'

server.listen(PORT, '127.0.0.1', () => {
	console.log(
-		`Listening on ${chalk.blue(chalk.underline(`http://127.0.0.1:${PORT}`))}`,
+		`Listening on ${styleText(['underline', 'blue'], `http://127.0.0.1:${PORT}`)}`,
	)
})
```

Now the start of the terminal session very ergonomically suggests that this is a link. I can cmd+ or ctrl+ click on it to open the server in my browser.

I quite like this API too, where you can apply multiple format commands together via an array. And unfortunately, in some systems, chalk's move to ESM cause problems. This is a nice alternative. And yes, anyone could be writing ANSI color codes directly, but shoulders of giants etc etc.


<h2 id="checkpoint">🎮 Checkpoint</h2>

Nice, we got through quite a bit. 

- If you want a waypoint, you can reference [all the code in it's dependency-form at this commit](https://github.com/bmuenzenmeyer/time-to/tree/4788b5cea40ee460788b062e830943ad6defa681).
- If you want to see the [Node.js native version, browse the sample here](https://github.com/bmuenzenmeyer/time-to/tree/088676a41b1ff7e95121c2b2a9260d76d68425a6).


What's left? TypeScript. This gets sufficiently complex that I wanted to save before continuing.


<h3 id="typescript"> 🏗️ TypeScript</h3>

[Docs](https://nodejs.org/api/cli.html#--experimental-strip-types) | Introduced 22.6.0 | Active Development

We're going to reverse our order of events here. We have a TypeScript error in our code right now. Did you see it? Let's see how easy it is to fix with native TypeScript support in Node.js.

This is the code in question:

```typescript
const { PORT } = process.env // string | undefined, whoops

server.listen(PORT, '127.0.0.1', () => {
	console.log(
		`Listening on ${styleText(['underline', 'blue'], `http://127.0.0.1:${PORT}`)}`,
	)
})
```

We can get hints from VSCode as soon as rename `server.js` to `server.ts`. The error is that `PORT` is potentially `undefined` _and when not_, it's a string. JavaScript says _yolo_ here by dynamically shoving this potentially harmful or missing square value into the round number hole, sotospeak.

Fixing this is easy enough:

```diff
-const { PORT } = process.env
+const PORT = Number(process.env.PORT)
```

> Copilot suggested this to me. I wondered why it didn't `parseInt(..., 10)`, cause _"that's the way I've always done it"_... only to learn that `parseInt()` will accept junk at the end of the string, like `PORT=300p` (a typo yielding port 300!) while `Number()` will return `NaN` and blow up later. This seems like a good if-not simple optimization for user-supplied data, short of full blown validation and defensive programming. I corroborated this with a couple other sources and said cool it's 11:58 PM.

To run it? We can replace the `dev` script with:

```diff
-"dev:node": "node --env-file=.env --watch-path src src/server.js --to 2025-04-20",
+"dev:node": "node --experimental-strip-types --env-file=.env --watch-path src src/server.ts --to 2025-04-20",
```

Purists will say it didn't build the project at all, it only removed the typings, flow-style. Ick! But wait, I say, my editor gave me immediate feedback of the error, without needing a build process at all. So...who caress? As with many things in this post, this is good enough for me!

Node.js maintainers are quick to mention the many caveats with this approach, and other decisions, such as currently [not supporting type-stripping under node_modules](https://github.com/nodejs/node/blob/98d4ebc6d425f55d22b8ab745031cd19f89fd283/lib/internal/modules/typescript.js#L124-L126). 

> 🚀🐢  This is all intentionally careful, by the way. I'll get to that more near the end of the article. As proof of this intentionality, recently Node.js maintainers [unflagged the type-stripping behavior](https://github.com/nodejs/node/pull/56350) (😊 with some tiny assists by me). I've talked to Marco about the node_modules limitation. He intends to remove it, but everyone is wary of a new fragmentation where folks publish TypeScript-only code. The community is still working through the ESM shift. 

#### 🎵 Anything You Can Do I Can Do Better...

Okay, well, can we do the same incremental running of our server.ts file with a dependency? Of course we can.

In fact, the ts-node and nodemon docs allude to the fact that this should just work:

```json
"dev:nodemon": "nodemon src/server.ts --to 2025-04-20",
```

This was after temporarily dropping the watch glob, as the default is... `*.*` 🤝. What we uncover, however, is a problem lurking around the whole post, ESM.

```bash
> nodemon src/server.ts --to 2025-04-20

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/server.ts --to 2025-04-20`
TypeError: Unknown file extension ".ts" for /workspaces/time-to/src/server.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:218:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:244:36)
    at defaultLoad (node:internal/modules/esm/load:122:22)
    at async ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:483:32)
    at async ModuleJob._link (node:internal/modules/esm/module_job:115:19) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
[nodemon] app crashed - waiting for file changes before starting...
```

Ugh. Googling around, this is potentially a "famous" problem with ESM + TypeScript. I won't even discuss Jest right now. I did get it working but we shouldn't mention it.

> 🙊 I'm staying true to this process, so no, we aren't talking about B<s>r</s>un<s>o</s> and Deno. That's not the point, <em>yet</em>. We're almost there, I promise.

`tsx` I guess is maybe something? This worked:

```json
"dev:nodemon": "nodemon --exec pnpm tsx src/server.ts --to 2025-04-20"
```

<h2 id="comparisons">⚖️ Comparisons</h2>

This ain't everything, and we can all caveat this with enough asterisks to call in Legal. But numbers are numbers.

> 🔬 npm-built node_modules, omitting [biome](https://biomejs.dev/) dev dependencies

| Metric | Before | After | Delta |
| - | - | - | - | 
| # node_modules | 215 | 2 | 0.9%, or 107 times smaller | 
| size node_modules | 49 MB | 2.6 MB |5.3%, or 18 times smaller | 

We've retained our functionality, and our DevEx is more or less the same, if not better. We've moved code from a collection of composite dependencies into the Node.js runtime, where the attention of the maintainers and robust resources assert quality.

> ⚡ All this, with _two orders of magnitude_ less dependencies. Dependabot will be bored. 


<h2 id="pace-layers">☀️ Pace Layers</h2>

Stewart Brand's [Pace Layering: How Complex Systems Learn and Keep Learning](https://jods.mitpress.mit.edu/pub/issue3-brand/release/2) has really _really_ taken hold in my thinking of late. Each of these new releases is a story in and of itself, but together they form a _narrative_. A narrative of complex, mutual learning.

This is feels so right to me because I highlight the same in [_Approachable Open Source_](https://approachableopensource.com) when I discuss open source software as a symmathesy, or _mutual learning in living systems_. [Nora Bateson coined this term: latin for "learning together."](https://norabateson.wordpress.com/2015/11/03/symmathesy-a-word-in-progress/)

These two concepts are great in isolation, but what clicked for me is that pace layering is a way to diagram symmathesies.

![“Pace Layers” diagram from Stewart Brand’s book “The Clock of the Long Now”
](/img/pace_layering.jpg)


I can see Node.js somewhere in these deeper layers, a foundational project with _gravity_. It simply cannot move as fast as competitors, or libraries built to augment it. That's okay. We can witness things like Deno and Bun putting pressure on Node.js. Not directly, but through the ideas they explore, the features they introduce, and the expectations they raise. The best of these ideas, or the most common use cases in userland, seem to find their way into the standard library.

What's cool too, is that a lot of these Node.js features were landed in consultation with the maintainers of the dependencies they might disrupt. This is really healthy, mature behavior and the opposite of the chaos often lampooned or derided in the open source community.

> 🔥 When you get frustrated at the churn of any ecosystem, try to frame your perspective in these pace layers. We are all at once viewing, consuming, and contributing to systems moving at different timescales.


So, by design, we can celebrate that: 

- innovation can be quick / creators have agency to explore
- competition puts pressure on established systems to improve
- maintainers craving momentum and stability have space and time to cultivate
- layers exist for anyone to contribute within their means

Some tools feel glacial in their progress, foundational to how we do things. Think Linux, curl, or perhaps git.  Some work moves at a faster rate, collectively learning from and iterating on the layers below it, exploring the [adjacent possible](https://www.youtube.com/watch?v=nEtATZePGmg). The best ideas may put pressure on the established systems, where they are absorbed, systematized, and made more stable. Open source as a Law of Nature here helps prop up and propel the vibrancy of the system.

Here's an early diagram of my Open Source Pace Layers (drawn at 2AM forgive me):

![Open Source Pace Layers, by Brian Muenzenmeyer. Inspired by Stewart Brand's similar concept, we see 7 concentric circles. From the innermost and slowest to outermost and fastest are: Specifications, Foundations, Open Governance, Frameworks and Runtimes, Libraries, Forks, and Application Code. The graphic is labeled Open Source Pace Layers v1.0.0](/img/open-source-pace-layers.png)


If I wrote _Approachable Open Source_ today, I'd be talking bout this.

## 🌎 Ecosystem Performance

In fact, there are many groups of folks interested in this concept. I'm not sure everyone views it within such a perspective. They might be more grounded, such as being concerned about supply chain security, sustainability, or bandwidth preservation. Articles like mine have been around for years, usually highlighting a single one of these techniques. 

I have found a team of folks, however, organizing and delivering on the promise of simplifying, of pushing progress downward. Check out <https://e18e.dev/>, or Ecosystem Performance. Their tag line is "Cleanup, Speedup, Levelup. One Package at a time."

1% better every day. Or sometimes 107 times better. We should be happy with any and all gains we can make, cause this is a marathon and we are all in it together. Lace up.