'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	//errorHandler = require('./errors.server.controller'),
	Book = require('../models/book'),
	_ = require('lodash');

/**
 * Create a book
 */
exports.create = function(req, res) {
	var book = new Book(req.body);
	book.user = req.user;

	book.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(book);
		}
	});
};

/**
 * Show the current book
 */
exports.read = function(req, res) {
	res.json(req.book);
};

/**
 * Update a book
 */
exports.update = function(req, res) {
	var book = req.book;

	book = _.extend(book, req.body);

	book.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(book);
		}
	});
};

/**
 * Delete an book
 */
exports.delete = function(req, res) {
	var book = req.book;

	book.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(book);
		}
	});
};

/**
 * List of books
 */
exports.list = function(req, res) {
	Book.find().sort('-created').populate('user', 'displayName').exec(function(err, books) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(books);
		}
	});
};

/**
 * book middleware
 */
exports.bookByID = function(req, res, next, id) {
	Book.findById(id).populate('user', 'displayName').exec(function(err, book) {
		if (err) return next(err);
		if (!book) return next(new Error('Failed to load book ' + id));
		req.book = book;
		next();
	});
};

/**
 * book authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.book.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};