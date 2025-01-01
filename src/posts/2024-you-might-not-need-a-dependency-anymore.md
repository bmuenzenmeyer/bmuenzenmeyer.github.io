---
layout: item
title: You Might Not Need a Dependency Anymore
summary: Advancements over time in Node.js are improving the out of the box experience.
date: 2024-12-31T17:59:37.613Z
tags:
  - opensource
  - post
  - nodejs
---

> Dependencies are great! Don't confuse this post as a refutation of the module system. Node.js has been so successful in part because of its healthy ecosystem on the npm registry. A healthy standard library is not designed to handle every use case. There is room for both here.

It's been exciting [contributing](https://github.com/nodejs/nodejs.org/graphs/contributors) to the [nodejs.org website](https://nodejs.org/en). It's a five-way intersection of technology, legacy choices, market forces, personalities, and people. Playing part-engineer, part-traffic cop through it all is rewarding and humbling. One of the benefits of this time is the awareness of the Node.js project's velocity of new and feature releases. New versions are released all the time across [Active LTS and Current](https://nodejs.org/en/about/previous-releases) development lines. It's easy to miss something between the release notes and our busy work schedules.

## Newish Features

Through the efforts of contributors over several recent majors, great new features are landing. Each is useful in isolation, but put together they form a more and more comprehensive standard library. This post highlights these new or newish features, ordered by availability:

| Feature                                       | Introduced | Release Status                                                     |
| --------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| [testing source code](#testing-source-code)   | 16.17.0    | Stable as of 20.0.0                                                |
| [watching source code](#watching-source-code) | 16.19.0    | Stable as of 20.13.0                                               |
| [parsing arguments](#parsing-arguments)       | 18.3.0     | Stable as of 20.0.0                                                |
| [reading environment](#reading-environment)   | 20.6.0     | Active Development                                                 |
| [styling output](#styling-output)             | 20.12.0    | Stable, as of [22.13.0](https://github.com/nodejs/node/pull/56329) |
| [run typescript](#typescript)                 | 22.6.0     | Active Development                                                 |

Best of all, they potentially remove the need for an external dependency in your project.

| Feature                                       | Dependency Replaced |
| --------------------------------------------- | ------------------- |
| [styling output](#styling-output)             | colors, chalk       |
| [parsing arguments](#parsing-arguments)       | commander, yargs    |
| [reading environment](#reading-environment)   | dotenv              |
| [testing](#testing)                           | jest, ava, ts-jest  |
| [watching source code](#watching-source-code) | nodemon             |
| [run typescript](#typescript)                 | ts-node, tsc(\*)    |

### Parsing Arguments

Docs: https://nodejs.org/api/util.html#utilparseargsconfig

### Styling Output

Docs: https://nodejs.org/docs/latest-v22.x/api/util.html#utilstyletextformat-text-options

### Reading Environment

Docs: https://nodejs.org/api/cli.html#--env-fileconfig

### Testing Source Code

Docs: https://nodejs.org/api/test.html

### Watching Source Code

Docs: https://nodejs.org/api/cli.html#--watch

### TypeScript

Docs: https://nodejs.org/api/cli.html#--experimental-strip-types

## Pace Layers

## Ecosystem Stability

https://e18e.dev/
