#!/usr/bin/env node

/**
 * noshi-branch-naming
 * Simplifies branch naming
 *
 * @author Kosuke Takahashi <.>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const readline = require('readline');
const chalk = require('chalk');
const git = require('simple-git')();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const input = cli.input;
const flags = cli.flags;
const { debug } = flags;

const main = async () => {
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
	rl.question(chalk.blue('What is your JIRA tiket ID: '), answer => {
		const jiraId = answer;
		rl.question(chalk.blue('What is your task detail: '), answer => {
			const yourTaskDetail = answer;
			rl.close();
			const branchNameTemp = `feature/t-kosuke_${jiraId}_${yourTaskDetail}`;
			console.log(`Your branch name: ${branchNameTemp}`);
			git.checkoutLocalBranch(branchNameTemp);
		});
	});
};

main();
