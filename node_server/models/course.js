var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  //课程名称
  name:{type:String,required:true},
  //课程教师
  teachers:[{type:Schema.Types.ObjectId, ref:'User'}],
  //课程类型
  type:{type:String, required:true},
  //课程开始时间
  startTime:{type:Date, required:true},
  //课程结束时间
  endTime:{type:Date, required:true},
  //学生列表
  students:[{type:Schema.Types.ObjectId, ref:'User'}],
  //上课安排时间
  scheduleList:[{type:Date}],
  //作业
  assignmentList:[{type:Schema.Types.ObjectId, ref:'Assignment'}]
});

mongoose.model('Course',courseSchema);
