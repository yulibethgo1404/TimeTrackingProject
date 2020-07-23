// this controller user
'use strict';
var mongoose = require('mongoose'),
resultObject = require("../helpers/response.class"),
  User = mongoose.model('Users');



  exports.create_user= function(req, res) {
    var new_user = new User(req.body);
  
    new_user.save(function(err, user) {      
      if (err)
        res.send(resultObject.error(err));

        if(user)
        res.json(resultObject.Success(user));
    });
  };  
  
  exports.read_user = function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if (err)
      res.send(resultObject.Success(err));
        res.json(resultObject.Success(user));
    });
  };  
  
