
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = Schema({
  name    : String,
  email    : String, 
  bookList : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
  
// var personSchema = Schema({
//   _id     : Number,
//   name    : String,
//   age     : Number,
//   stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// var storySchema = Schema({
//   _creator : { type: Number, ref: 'Person' },
//   title    : String,
//   fans     : [{ type: Number, ref: 'Person' }]
// });
