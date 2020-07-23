'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// model scema- save all the project for an user
var ProjectSchema = new Schema({
  name: { type: String, required: true},
  User: { type: Schema.Types.ObjectId, ref: 'Users' },
    Created_date: {
      type: Date,
      default: Date.now
    }
  }
  );

  ProjectSchema.index({User: 1, name:1}, {unique: true});
  module.exports = mongoose.model('Projects', ProjectSchema);