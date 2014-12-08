'use strict';

/* GET home page. */
module.exports = function(app) {
	app.route('/blabla')
	.get(function(req, res) {
	//	console.log(req);
		res.render('index', { title: app.get('env'),  user: req.user });
	})
}