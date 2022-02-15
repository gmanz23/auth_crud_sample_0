const express = require("express");
const jwt = require('jsonwebtoken');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['x-access-token']
  const token = authHeader // && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    //req.user = user

    next()
  })
}



recordRoutes.route("/auth").post(function (req, res) {
  
  var username = req.body.username;
  var pass = req.body.password;

  // verify user credentials (via hash)

  const token = generateAccessToken(username);
  res.json(token);
});


recordRoutes.route("/posts").get(authenticateToken, function (req, res) {
  

  let db_connect = dbo.getDb();

  db_connect.collection("posts").find({}).toArray(function (err, result) {
      if (err) throw err;

      res.json(result);
    });
  
});


module.exports = recordRoutes;