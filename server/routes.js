const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require('./model/user');
const Post = require('./model/post');

const e = require("express");

const routes = express.Router();

// generate JWT
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

// verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['x-access-token']
  const token = authHeader

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    if (err) return res.sendStatus(403)

    // set user _id to request
    req.user = user

    next()
  })
}


// authenticate user
routes.route("/auth").post(async function (req, res) {
  
  var username = req.body.username;
  var pass = req.body.password;

  User.findOne({ username: username })
  .exec(async function (err, user) {
    if (err) return res.json(err);

    // read current user pass hash
    if (user) {

      // compare hash
      var validPassword = await bcrypt.compare(pass, user.password);
  
      if (validPassword) {
        // generate token if valid
        const token = generateAccessToken(user._id.toString());
        
        res.json(token);
      } else {
        // incorrect pass
        res.status(400).json({ error: "Invalid Password" });
      }  
    }
    else{
      // invalid user
      res.status(401).json({ error: "Invalid Password" });
    }
  });  
});

// get posts (authenticated)
routes.route("/posts").get(authenticateToken, function (req, res) {
  
  Post.find({})
  .populate('user')
  .exec(function (err, posts) {
    if (err) return res.json(err);

    res.json(posts);
  });
  
});


// like post
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
      // check if user already likes
      var likeCheck = await Post.find({ _id: postid, "likes": user._id }); 

      if (likeCheck.length > 0)
      {
         // remove like from post
         Post.findByIdAndUpdate(post._id, { '$inc': { likeCount: -1 }, '$pull': { likes: user._id }},
         function(err, data) {
             if (err) return res.json(err);

             res.json(data);
         }
       );

      }
      else {  
        // add like to post
        Post.findByIdAndUpdate(post._id, { '$inc': { likeCount: 1 }, '$push': { likes: user._id }},
          function(err, data) {
              if (err) return res.json(err);

              res.json(data);
          }
        );
      }
    }
    else {
      res.status(404).json({ error: "Invalid Post" });
    }
  }

});


module.exports = routes;