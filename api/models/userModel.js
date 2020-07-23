'use strict';
var mongoose = require('mongoose'),
 uniqueValidator  = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// model scema
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true},
    Created_date: {
      type: Date,
      default: Date.now
    }
  });
  
  UserSchema.plugin(uniqueValidator);
  module.exports = mongoose.model('Users', UserSchema);