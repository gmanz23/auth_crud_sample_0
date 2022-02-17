const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const User = require('../model/user');
const Post = require('../model/post');

const atlasURI = process.env.ATLAS_URI;

mongoose.connect(atlasURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to DB"))
.catch (console.error);;

// get the default connection
var db = mongoose.connection;

// bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



module.exports = { 


    init_db: function () {

        User.findOne({ username: 'User1' }).exec(async function (err, userCheck) {
            if (err) return handleError(err);
            
            if (!userCheck) {
                
                // generate salt 
                var salt = await bcrypt.genSalt(10);

                // hash pass
                var pass = await bcrypt.hash('test', salt);

                // create test users
                var user1 = new User({ username: 'User1', password: pass });
                var user2 = new User({ username: 'User2', password: pass });

                user1.save(function (err) {
                    if (err) return handleError(err);
                });

                user2.save(function (err) {
                    if (err) return handleError(err);
                });


                // create first post
                var post1 = new Post({
                    post_content: "Hello world!",
                    dateposted: new Date(),
                    user: user1._id,
                    likeCount: 1,
                    likes: [ user1._id ]
                });   
                

                // create second post
                var post2 = new Post({
                    post_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in lorem quis neque tincidunt congue. Sed in facilisis sapien, in semper nulla. Aliquam finibus ligula at leo aliquam bibendum. Vivamus fringilla justo et nulla interdum, quis luctus mauris interdum. Donec porttitor sapien sed egestas sodales. Ut vitae diam pharetra dolor malesuada finibus quis nec felis. Duis gravida magna in mollis faucibus. Nam id volutpat lacus. Duis semper nisl ac sapien placerat pulvinar. Suspendisse potenti. Morbi imperdiet ac massa sed iaculis.',
                    dateposted: new Date(),
                    user: user2._id,
                    likeCount: 0,
                    likes: []
                });

                post1.save(function (err) {
                    if (err) return handleError(err);
                });

                post2.save(function (err) {
                    if (err) return handleError(err);
                });                
            };
        });
    }
};



