var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var extend = require('mongoose-schema-extend');

var userSchema = new mongoose.Schema({
  //Basic Info
  name:{type:String ,required:true},
  email:{type:String ,unique:true, required:true},
  hash:String,
  salt:String,

  school:String,
  phone:String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id:this._id,
    email:this.email,
    name:this.name,
    exp:parseInt(expiry.getTime()/1000)
  }, 'thisIsSecret');
};

var teacherSchema = userSchema.extend({
  courseList:[{type:Schema.Types.ObjectId,ref:'Course'}],   //老师上课类型
  classList:[{type:Schema.Types.ObjectId,ref:'Class'}]      //老师的班级
});

var studentSchema = userSchema.extend({
  classList:[{type:Schema.Types.ObjectId,ref:'Class'}]
});

mongoose.model('User',userSchema);
