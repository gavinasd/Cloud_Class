var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require('../util/util');

module.exports.register = function (req, res) {
  if(!req.body || !req.body.email || !req.body.password || !req.body.name){
    util.errorWithParameters(res);
    return;
  }

  var token;
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  user.setPassword(req.body.password);
  token = user.generateJwt();
  user.save(function (err) {
    if(err) {
      util.sendJSONresponse(res,404,err);
      return;
    }

    util.sendJSONresponse(res, 200 , {
      "token":token
    });
    return;
  });

};

 module.exports.login = function (req, res) {
   console.log('login',"email:"+req.body.email);
   if(!req.body.email || !req.body.password){
     util.errorWithParameters(res);
   }


   passport.authenticate('local',function (err,user,info) {
     var token;

     if(err){
       util.sendJSONresponse(res,404,err);
     }
     if(user){
       token = user.generateJwt();
       util.sendJSONresponse(res,200,{
         "token":token
       });
     } else {
       util.sendJSONresponse(res,401,info);
     }
   })(req,res);
 };
