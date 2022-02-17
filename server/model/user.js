var mongoose = require('mongoose');

var Schema = mongoose.Schema;


const userSchema = Schema({
    username: String,
    password: String // to be exluded on all calls other than create
  }, { versionKey: false  });


  module.exports = mongoose.model('user', userSchema);