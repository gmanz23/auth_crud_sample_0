var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const postSchema = Schema({
    //_id: Schema.Types.ObjectId,
    post_content: String,
    dateposted: Date,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    likeCount: Number,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

  module.exports = mongoose.model('post', postSchema);