'use strict';
var books = require('../controllers/books');
var users = require('../controllers/users.server.controller');


module.exports = function(app) {
// book Routes
app.route('/books')
	.get(books.list)
	.post(users.requiresLogin, books.create);

app.route('/books/:bookId')
	.get(books.read)
	.put(users.requiresLogin, books.hasAuthorization, books.update)
	.delete(users.requiresLogin, books.hasAuthorization, books.delete);
	// Finish by binding the book middleware
	app.param('bookId', books.bookByID); //TODO
};


