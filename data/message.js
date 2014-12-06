
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = Schema({
  content	: String,
  sender	: { type: Schema.Types.ObjectId, ref: 'User' }, 
  Receiver	: { type: Schema.Types.ObjectId, ref: 'User' }
});

var MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;