---
layout: post

title: "Pattern Lab Node 1.1 Released"
tags: 'patternlab development design'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer
class: ''
summary: 'Travis CI support lands in Pattern Lab Node, allowing automatic integration tests on PRs and merges'

comments: true
---

I've just published [Pattern Lab Node 1.1 to Github](https://github.com/pattern-lab/patternlab-node/releases/tag/v0.1.1). It comes at the onset of a journey toward adherence to the [pattern lab specification](https://github.com/pattern-lab/the-spec/blob/draft/SPEC.md) created by [@dmolsen](https://twitter.com/dmolsen)

## Changelog
This release cleans up some messy dependencies, and really sets the stage for more meaningful development.

- FIX: Removed View All Pattern SubItem Link Logic, no longer in reference implementation
- ADD: Flag for generating debug file
- ADD: Travis CI test support!
- ADD: Contributing file
- ADD: Repository to package.json
- FIX: Manage Mustache dependency using NPM
- THX: thank you [@tbranyen](https://github.com/tbranyen) for tip on repository, Mustache, and NPM!

## Toward a More Perfect Pattern Lab Node
Stay tuned for [version 1.2](https://github.com/pattern-lab/patternlab-node/issues/38), already under development in the dev branch! With that version comes a moderate refactor of the builder, more unit tests, and some specification-mandated features. I also hope to get lineage and annotations functional - these have been gaps for too long.

Thanks for the continued interest and support in pattern lab and pattern lab node.
