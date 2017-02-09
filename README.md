# fluid-docVersion

A fast spike (basically, "BASH in node") to demonstrate how we can use some existing behaviour of the docpad implementation of the Infusion docs to get closer to what we want.

At the moment, this relies upon Alan's fork of https://github.com/fluid-project/infusion-docs with these changes; in order to adopt this approach, we'd need to make similar changes to the `fluid-project` repo:

- for the existing `1.9.x` and `2.x.x` branches, it changes the `docsVersion` variable in `docpad.js` to match the branch name.
- does the same for the `v2.0.0` tag

What this means is that we can run the loop in `index.js` and produce a series of sites in `out/infusion` based on those branches or tags, with directory names as configured in the `docpad.js` configuration file of each. The whole `out` directory could then be hosted statically.

I'd originally started out trying to find a git client library for node that wouldn't get in the way of a fast spike, but found myself struggling with their  way of doing things for this case. Hence, the use of `spawnSync`.
