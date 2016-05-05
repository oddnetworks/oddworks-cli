#!/usr/bin/env node
'use strict';

const commander = require('commander');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const COMMAND = 'generate-token';

commander
	.on('--help', () => {
		console.log('  Example Usage:');
		console.log(chalk.green(`    oddworks ${COMMAND} -c`, chalk.blue('odd-networks'), '-p', chalk.blue('apple-ios'), '-j', chalk.blue('secret')));
		console.log('');
		console.log(chalk.green('    where', chalk.blue('odd-networks'), 'matches an id for a channel record in your data store and'));
		console.log(chalk.green('    where', chalk.blue('apple-ios'), 'matches an id for a platform record in your data store.'));
		console.log(chalk.green('    where', chalk.blue('secret'), 'matches your JWT secret.'));
	});

commander
	.option('-c, --channel <channel>', 'channel id to embed in the token')
	.option('-p, --platform <platform>', 'platform id to embed in the token')
	.option('-j, --jwt-secret <jwt-secret>', 'jwt secret')
	.parse(process.argv);

if (commander.channel && commander.platform && commander.jwtSecret) {
	const payload = {
		version: 1,
		channel: commander.channel,
		platform: commander.platform,
		scope: ['platform']
	};
	const token = jwt.sign(payload, commander.jwtSecret);
	console.log('### Token Payload ###');
	console.log(chalk.green(JSON.stringify(payload)));
	console.log('');
	console.log('### JWT ###');
	console.log(chalk.green(token));
} else {
	commander.help();
}
