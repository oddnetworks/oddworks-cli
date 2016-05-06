#!/usr/bin/env node
'use strict';

const commander = require('commander');
const chalk = require('chalk');
const git = require('nodegit');

const COMMAND = 'fetch-data';

commander
	.on('--help', () => {
		console.log('  Example Usage:');
		console.log(chalk.green(`    oddworks ${COMMAND}`, '-d', chalk.blue('./data')));
		console.log('');
		console.log(chalk.green('    where', chalk.blue('./odd-data'), 'is the directory to place the cloned data'));
	});

commander
	.option('-d, --data-dir <data-dir>', 'directory to place cloned data - defaults to \'./data\'')
	.parse(process.argv);

const dataDir = commander.dataDir || './data';

git.Clone("https://github.com/oddnetworks/example-data", dataDir)
	.then(() => {
		console.log(chalk.green(`Successfully copied data to ${dataDir}`));
	})
