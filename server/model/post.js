var mongoose = require('mongoose');

var PostLikes = require('./post_likes');

var Schema = mongoose.Schema;


const postSchema = Schema({
    // _id: Schema.Types.ObjectId,
    post_content: String,
    dateposted: Date,
    user: { type: Schema.Types.ObjectId, ref: 'user' }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});


postSchema.virtual('likes')
.get(function () {

    var likeCount = 0

    PostLikes.countDocuments({post: this.ObjectId}, function(err, c) {
        if (err) return handleError(err);
   });

    return likeCount;
  });


  module.exports = mongoose.model('post', postSchema);