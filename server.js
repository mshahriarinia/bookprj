#!/usr/bin/env node
'use strict';

// Dependencies
var debug = require('debug')('bookprj');
var chalk = require('chalk');
var mongoose = require('mongoose');
var config = require('./config/config');
var dbConnection = require('./servers_code/db');
var app = require('./servers_code/app')(dbConnection);


//app.set('port', config.port);

var server = app.listen(config.port, function() {
	console.log('Express server listening on port ' + server.address().port);
});


// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db));
console.log('--');