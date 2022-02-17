const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const mongoose = require('mongoose');

//const mong = require("../models");
const User = require('./model/user');
const Post = require('./model/post');
const PostLike = require('./model/post_likes');
const e = require("express");


// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const routes = express.Router();




function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['x-access-token']
  const token = authHeader

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    if (err) return res.sendStatus(403)

    //console.log(user)

    req.user = user

    next()
  })
}



routes.route("/auth").post(async function (req, res) {
  
  var username = req.body.username;
  var pass = req.body.password;

  User.findOne({ username: username })
  .exec(async function (err, user) {
    if (err) return handleError(err);

    if (user) {

      var validPassword = await bcrypt.compare(pass, user.password);
  
      if (validPassword) {
        const token = generateAccessToken(user._id.toString());
        
        res.json(token);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }  
    }
    else{
      res.status(401).json({ error: "Invalid Password" });
    }
  });  
});


routes.route("/posts").get(authenticateToken, function (req, res) {
  
  Post.find({})
  .populate('user')
  .exec(function (err, posts) {
    if (err) return handleError(err);

    res.json(posts);
  });


});


routes.route("/posts/like").post(authenticateToken, async function (req, res) {

  // read user id 
  var user = await User.findOne({ _id: req.user });
  var postid = req.body.id

  if (!user) {
    res.status(403).json({ error: "Invalid User" });
  }
  else {

    // validate post id
    var post = await Post.findOne({ _id: postid });

    if (post) {

      var likeCheck = await Post.find({ _id: postid, "likes": user._id }); 

      if (likeCheck.length > 0)
      {

         // add like to post
         Post.findByIdAndUpdate(post._id, { '$inc': { likeCount: -1 }, '$pull': { likes: user._id }},
         function(err, data) {
             //error handling
             if (err) return handleError(err);

             res.json(data);
         }
       );

      }
      else {
        

        // add like to post
        Post.findByIdAndUpdate(post._id, { '$inc': { likeCount: 1 }, '$push': { likes: user._id }},
          function(err, data) {
              //error handling
              if (err) return handleError(err);

              res.json(data);
          }
        );

      }



    }
    else {
      res.status(404).json({ error: "Invalid Post" });
    }

      // // check if like exists
      // var postlike = await PostLike.findOne({ post: postid, user: user._id });

      // if (postlike) {
      //   // remove/delete like
      //   await PostLike.deleteOne({ _id: postlike._id });
      // }
      // else {
      //   // add like
      //   var newLike = await PostLike.create({ post: postid, user: user._id });
      //   await newLike.save(function (err) {
      //     if (err) return handleError(err);
      //   });  
      // }
    
  }

});


module.exports = routes;