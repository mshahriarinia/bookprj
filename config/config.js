'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var fs = require('fs');

// set env filename
if (typeof process.env.NODE_ENV === 'undefined') {
	console.error(chalk.red('NODE_ENV is not defined! Using "development" as environment (among {development,production,test})'));
	process.env.NODE_ENV = 'development';
} else {
	var env_path = './config/env/' + process.env.NODE_ENV +'.js';
	console.log(env_path);
	if(!fs.existsSync(env_path)){
		console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment. Using "development" as environment (among {development,production,test})'));
		process.env.NODE_ENV = 'development';
	}
}

module.exports = _.extend(
	require('./env/all'),
	require('./env/' + process.env.NODE_ENV +'.js') 
);