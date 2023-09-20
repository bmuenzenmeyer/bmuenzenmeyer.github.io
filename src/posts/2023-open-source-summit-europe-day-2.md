---
layout: item
title: Open Source Summit Europe Day 2
summary: Notes from a world away
date: 2023-09-20T07:07:23.202Z
tags:
  - opensource
  - post
---
> Open Source Summit EU in Bilbao, Spain : September 18th - September 21st

## Keynotes

### State of the Foundation

Jim Zemlin, Executive Director, LF

"Humble, Helpful, Hopeful"

800,000 developers across all projects
"The sky is always falling" - but we work through it.

#### Licensing

- Hashicorp to BSL.
- The sky is not falling in OSS. it is just getting sunnier.
- "only 9" examples of license changes like this.
- open governance is the missing link to prevent businesses having too much control
- Linux Foundation: OpenTofu - drop in replacement
  - 5 weeks
  - 700+ developers
  - 250+ companies
  - 41k stars
- Allianz CTO - "we secure our future." "Pivoting to OpenTofu we're securing more than code; we're securing futures"
- LF governance framework
- TSC
- foundational security and other resources

#### AI in Open Source

- "sky is falling." AI will create weapons. bias. misinformation
  - open source is antidote. LF: hopeful! OSS is what will combat the negativity.
- we went through this same fear-cycle with cryptography in the 90s
- [CDLA.io](https://cdla.dev/) - community data licensing agreement
- GPU and gaming helped fuel LLM innovation
  - hard to write software on GPU without relying on proprietary software
  - UXL - Unified Acceleration Foundation
  - arm, fujitsu, google, intel, samsung, qualcomm
  - [oneAPI](https://www.oneapi.io/) 

### Creating Sustainable Value

- fujitsu... chips, web3, meh

### Sovereign Tech Fund

"strengthening digital infrastructure and open source ecosystems in the public interest"

- feasibility study to examine this work
- sovereign tech fund - german public fund
- two weeks before log4shell
- pilot round: curl, fortran, wireguard, openssh, bundle/rubygems, python, openjs, logback
- https://xkcd.com/2347/ - jenga
- approach so far
  - address immediate infra needs
  - tech debt and community health
  - supply chain security, CI, memory safety
- "no one questions why we maintain roads and bridges"


## Node.js What's Next?

Jean Burellier, Michael Dawson, Node.js

### Following What's Next

- 200 repos
- 20 LTS in October
- nodejs.org/calendar

### Recent Features

- "major releases are boring"
- promotion to LTS is an event though
- Features, Old News
  - OpenSSL3 (17). Smaller key lengths. algorithms changed. Native modules deprecations
  - Default DNS Resolution. IPv6 vs IPv4. `--dns-result-order=ipv4first` 
- Baking
  - fetch (17.5, no flag in 18)
  - WASI - WASM in Node.js (13.3, 20 no longer needs a flag)
  - `--watch` `--watch-path` `--watch-preserve-output` (18.11, 16.19)
- Hot off the press
  - argument parser (18), collab from yargs and commander
  - test runner (20) mocks, reporters, coverage
  - single-executable application (19)
    - easier distribution
    - more secure only runs what is bundled. smaller surface area
    - nodejs/postject
  - process-based permissions (19)
    - file system, spawning, workers
    - runtime API
  - tracing channel (19)
    - diagnostic information.
    - `tracingChannel.trace*`
    - `tracingChannel.subscribe`
  - arm64 for Windows (19)

### Next-10

- technical values and priorities
- constituencies
- constituencies' needs
- technical priorities
- mini-summits to focus on technical priorities. 3 to 4 times a year
- survey, 1700 respondents
  - biggest ask: better docs
- sharing project news

### New Teams and Initiatives

- performance
- security. funding OpenSSF
- single executable app
- uvwasi / wasm
- examples repository nodejs/examples
- website, redesigned experience

### How to Get Involved

- open to all
- participating in meetings
- open issues
- docs / translations
- review PRs
- nobody understands all of it

## Improving the Security of a Major Open Source Project : Open Step at a Time

> Michael Dawson, Rafael Gonzaga

- "Open Open Source" 
- >3200 contributors
- 1B downloads direct last year
- top OpenSSF criticality score
- "but... volunteers are a poor match for time critical work"
- OpenSSF - full time resource in starting in 2022

### Reactive - the life of a CVE

- threat model. without a TM, there is imbalanced expecations
  - example: sync read of a large file. not a threat, per the TM. trust
  - what do we trust? (not to misbehave) ex: FS. 
  - what we don't trust? HTTP servers
  - published in `Security.md`
- security reports
  - please dont open public
  - hackerone. private. make public after resolved.
  - accept or reject, using TM
  - CVE and CVSS assignment, if accepted
  - what did not work?
    - email
    - ad hoc triaging
    - small number of triagers. needs to rotate else people burnout
    - handling reports for experimental features
  - what is working?
    - triage team > 3 people
    - triage rotation
    - hackerone, private, public after, easy CVE assignment
- creating fixes
  - `node-private` repo. running in public CI is disclosing vulns
  - people availability - often busy. OpenSSF funding has helped.
  - sometimes the vulns are platform-specific, like Windows-only
  - locking CI when about to release
- security releases
  - 26 steps
  - advanced notice to ecosystem, related teams
  - coordinating subteams
  - release stewards rotation. 6 of them. matteo (platformatic), michael (redhat), bryan (datadog), rafael (nearform), juan, joe

### Proactive

- Dependency Vulnerability Checks (nodejs/nodejs-dependency-vuln-assessments)
- permissions model (20)
  - `npm install magicpackage` # malicious file access
  - `node --experimental-permission --allow-fs-read=/path/to/project/*`
  - allow-fs-read, fs-write, allow-worker, allow-child-worker
- security best practices (document)
- automated dependency updates
- OSSF scorecared
- CII best practices
- automate release
- review build process of the dependencies
- make sure node.js can reliably maintain the release lines

### How you can help

**individuals**

1. contribute as a collaborator
2. volunteer as a releaser
3. champion wg initiative
4. join the working group
5. volunteer
6. contribute to issuesa

**businesses**

1. reward people for contributing! triage, etc
2. reward people for being a security expert
3. implement vulnerability reporting policies with considerations for open source projects
4. join a foundation 
5. contribute to LFD bug bounty security fund
