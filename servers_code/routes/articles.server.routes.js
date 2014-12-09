'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	articles = require('../controllers/articles.server.controller');

var passport = require('passport');
var authorization = require('../controllers/users/users.authorization.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);

	app.route('/articles/create')
		.get(function(req,res){
			res.render('articles/create');
		});

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};