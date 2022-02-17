const express = require("express");
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

//const mong = require("../models");
const User = require('./model/user');
const Post = require('./model/post');


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
    //console.log(err)

    if (err) return res.sendStatus(403)

    //req.user = user

    next()
  })
}



routes.route("/auth").post(function (req, res) {
  
  var username = req.body.username;
  var pass = req.body.password;

  // verify user credentials (via hash)

  const token = generateAccessToken(username);
  res.json(token);
});


routes.route("/posts").get(authenticateToken, function (req, res) {
  
  Post.find({})
  .populate('user')
  .exec(function (err, posts) {
    if (err) return handleError(err);
    res.json(posts);
  });


  // .then(function (posts) {
  //   res.json(posts);
  // }).catch(function(err) {
  //   res.json(err);
  // });


  
});


module.exports = routes;