'use strict';

/* GET home page. */
module.exports = function(app) {
	app.route('/')
	.get(function(req, res) {
		res.render('index', { title: app.get('env')});
	})
}