var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const postlikeSchema = Schema({
    // _id: Schema.Types.ObjectId,
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
  });


  module.exports = mongoose.model('postlike', postlikeSchema);