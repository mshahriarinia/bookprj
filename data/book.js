
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usedBookSchema = new Schema({ 
	condition	: Number, 
	price		: Number,
	seller		: { type: Schema.Types.ObjectId, ref: 'User' }
});

var UsedBookModel = mongoose.model('UsedBook', usedBookSchema);

var bookSchema = Schema({
	title		: String,
	isbn		: Number,
	description    : String, 
	usedBookList : [{ type: Schema.Types.ObjectId, ref: 'UsedBook' }]
});

var BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;