---
layout: post
title: "PR Age Gate"
summary: A check that keeps a pull request open long enough for the rest of the world to wake up.
date: 2026-09-21T00:00:00.000Z
tags:
  - post
  - opensource
  - nodejs
---

I wrote a small thing: [pr-age-gate](https://github.com/bmuenzenmeyer/pr-age-gate). It keeps a check red until a pull request has been open for a configurable number of hours, then turns it green.

That's it. That's the tool.

## Why a clock is a governance feature

Projects with open governance write down how long a change should sit before it lands. nodejs.org has [48 hours](https://github.com/nodejs/nodejs.org/blob/main/docs/collaborator-guide.md#timing-requirements) in its rules. Lots of other projects have something similar. The number varies, the reason doesn't: contributors and reviewers are spread across the planet, and a change merged four hours after it was opened is a change that a whole set of timezones never had a chance to see.

The policy is usually enforced by people remembering it. Which works, until it's Friday afternoon, the diff looks small, and the merge button is right there.

Policies that live only in a CONTRIBUTING.md are suggestions. Policies with a red check next to them are policies. This one is the cheapest possible version of that: a wall clock, applied evenly, that nobody has to feel bad about enforcing.

## The action

It runs on pull request events and on a schedule. The schedule part matters. A pull request that sits untouched still needs to flip from red to green on its own once enough time has passed, without waiting for someone to push a junk commit to retrigger CI.

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened, labeled, unlabeled]
  schedule:
    # hourly, so open PRs go green without a new commit
    - cron: "0 * * * *"

jobs:
  age-gate:
    runs-on: ubuntu-latest
    permissions:
      checks: write
      pull-requests: read
    steps:
      - uses: bmuenzenmeyer/pr-age-gate@v0.2.3
        with:
          min-hours: "48"
          bypass-labels: fast-track
```

`min-hours` defaults to 48. `check-name` defaults to `pr-age-gate` if you want to name it something your branch protection rules will recognize.

## Bypasses, because reality

A gate with no escape hatch gets ripped out the first time something is on fire. There are two.

**Labels.** `bypass-labels` takes a list. If a maintainer applies one, the check passes. The label is the audit trail. Somebody with write access made a decision, in public, and their name is on it. That's a better outcome than an undocumented merge.

**Paths.** `bypass-paths` takes globs, with `*` for one segment and `**` for many. If every changed file matches, the check passes. A typo fix in a docs folder does not need to wait two days for a second opinion from another continent.

Both are opt-in. Configure neither and you get a plain clock.

## There's a CLI too

The same logic ships as [an npm package](https://www.npmjs.com/package/pr-age-gate) that runs anywhere.

```sh
npx pr-age-gate --owner bmuenzenmeyer --repo pr-age-gate --pr 5 --min-hours 48
```

On public repos it needs no token. It exits 0 when the pull request passes, 1 when it doesn't, and 2 on an error, so you can drop it into whatever else you have. Every flag also reads from an environment variable if that's more your style.

I built it this way on purpose. Not everybody is on GitHub Actions, and a policy tool that only works inside one vendor's CI is a policy tool with an asterisk. The action is a thin wrapper that writes a check run. The library underneath is the part that actually decides.

## We're using it

nodejs.org [runs it in CI](https://github.com/nodejs/nodejs.org/blob/main/.github/workflows/pull-request-age-gate.yml), set to 48 hours with a `fast-track` label for the times when 48 hours is the wrong answer. Website work moves fast and has a lot of drive-by contributors, which is exactly the situation where a quiet, consistent clock beats a maintainer trying to remember the rule at 11pm.

If your project has a waiting period written down somewhere, this will enforce it. MIT licensed. Issues and pull requests welcome, though fair warning, yours will have to wait 48 hours.

---

> This is the first post (and tool really) I've written and built with substantial output from a frontier coding companion. None of the code is terribly novel; the provenance matters less to me than my ability to turn a governance gap into a useable tool. I hope you find it useful too. I hope one day this feature is directly built into GitHub!