'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var config = require('../../config/config');
var authorization = require('../controllers/users/users.authorization.server.controller');

module.exports = function(app) {
	// User Routes
	var users = require('../controllers/users.server.controller');

	app.route('/').get(function(req, res) {
		res.render('index', { title: 'Home Page',  user: req.user });
	});

	// Setting up the users profile api
	// app.route('/users/me').get(passport.authenticate('local', { 
	// 	successRedirect: users.me,
 //        failureRedirect: '/auth/signin' 
 //    	}
 //    ));

// TODO make sure this route is authorization protected
 
	app.route('/users/me').get(users.me);
	app.get('/users/admin', authorization.hasAuthorization(['admin']), function(req,res){
		console.log('in admin');
		res.json({admin:'user is admin'});
	});

	app.route('/users').post(users.update); // TODO this should be a PUT request
	
	app.route('/users').get(function(req,res){
		console.log('in update user get');
		console.log(req.params);
		res.render('users/update', {user:req.user});
	}); // morteza

	app.route('/users/accounts').delete(users.removeOAuthProvider); // ??????????????????

	


	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').get(function(req,res){
		res.render('users/forgot');
	});//morteza
	app.route('/auth/forgot').post(users.forgot);

	
	app.route('/auth/password/reset/invalid').get(function(req,res){
		res.json({status:'Invalid token.'});
	}); //morteza

	app.route('/auth/password/reset/:token').get(function(req,res){
		//console.log('Token '+req.params.token);
		res.render('users/resetpassword', {token:req.params.token});
	});//morteza


	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signup').get(function(req,res){
		res.render('users/signup');
	}); //morteza

	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signin').get(function(req,res){
		res.render('users/signin');
	}); //morteza
	app.route('/auth/signout').get(users.signout);

	// // Setting the facebook oauth routes
	// app.route('/auth/facebook').get(passport.authenticate('facebook', {
	// 	scope: ['email']
	// }));
	// app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// // Setting the twitter oauth routes
	// app.route('/auth/twitter').get(passport.authenticate('twitter'));
	// app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// // Setting the google oauth routes
	// app.route('/auth/google').get(passport.authenticate('google', {
	// 	scope: [
	// 		'https://www.googleapis.com/auth/userinfo.profile',
	// 		'https://www.googleapis.com/auth/userinfo.email'
	// 	]
	// }));
	// app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// // Setting the linkedin oauth routes
	// app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	// app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// // Setting the github oauth routes
	// app.route('/auth/github').get(passport.authenticate('github'));
	// app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};