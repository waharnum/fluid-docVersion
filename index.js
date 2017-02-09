'use strict';

const fs = require("fs");
const fluid = require("infusion");

const spawnSync = require('child_process').spawnSync;

var config = JSON.parse(fs.readFileSync('config.json'), 'utf8');

var repository = config.repository;
var localRepoDirectory = config.localRepoDirectory;
var buildConfig = config.buildConfig;

// Clone the repo
var gitClone = spawnSync('git', ['clone', repository, localRepoDirectory]);

// Common options for spawnSync when dealing with the local repository directory
var repoSpawnOptions = {stdio:[0,1,2], cwd: localRepoDirectory};

// Run NPM install in the repo directory
spawnSync('npm', ['install'], repoSpawnOptions);

// Check out each branch and generate it statically
var checkouts = buildConfig.branches.concat(buildConfig.tags);

checkouts.forEach(function (checkoutName) {
    spawnSync('git', ['checkout', checkoutName, "--force"], repoSpawnOptions);
    spawnSync('docpad', ['generate', '--env', 'static'], repoSpawnOptions);
});
