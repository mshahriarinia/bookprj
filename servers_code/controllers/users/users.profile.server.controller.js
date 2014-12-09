'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	//console.log('in update function' );
	//console.log(req.query);
	//	console.log(req.body);


	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.redirect('/users/me');
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	if(req.user)
		res.render('users/user', {title:'User Details', user:req.user || null});
	else 
		res.redirect('/auth/signin');
//		res.json(User.find(req.user) || null);

// var username = req.user.username;
// User.findOne({username: username}, function(err, doc) {
//   //Do your action here..
//   console.log('found user');
//   console.log(doc);
//   res.render ('users/user', {title:'User Details', user:doc});
//});



};