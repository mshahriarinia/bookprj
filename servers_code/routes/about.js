'use strict';

/* GET home page. */
module.exports = function(app) {
	app.route('/about')
	.get(function(req, res) {
	//	console.log(req);
		res.render('about', { title: 'About us',  user: req.user });
	})
}