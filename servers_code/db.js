'use strict';
var mongoose = require('mongoose');
var config = require('../config/config');
var chalk = require('chalk');//


// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB.'));
		console.log(chalk.red(err));
	} else {
		console.log('Connected to DB ' + config.db);
	}
});

//mongoose.on('error', );
//
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection to DB :' + config.db + ' disconnected.');
}); 

var gracefulExit = function() {
	mongoose.connection.close(function (err) {
		if(err){console.log('eeeeeeeeeeeeeeeee')}
		console.log('Mongoose default connection with DB :' + config.db + ' is closed through app termination.');
		process.exit(0);
	});
} 
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

module.exports = mongoose.connection;