/**
 * 老师创建的作业列表，可包含多个问题
 * Created by zhenwenl on 16/12/31.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classTimeSchema = new mongoose.Schema({
	//每次上课起始时间
	startTime:{type:Date, required:true},
	//每次上课结束时间
	endTime:{type:Date, required:true}
});

mongoose.model('ClassTime', classTimeSchema);

var classSchema = new mongoose.Schema({
	//创建者
	creator:{type:Schema.Types.ObjectId, ref:'User'},
	//课程类型
	// type:{type:Schema.Types.ObjectId, ref:'Course', required:true},
	//班级名称
	name:{type:String, required:true},
	//课程邀请码，防注水
	verifier:{type:String, required:true},
	
	//课程教师列表
	teacherList:[{type:Schema.Types.ObjectId, ref:'User'}],
	//课程学生列表
	studentList:[{type:Schema.Types.ObjectId, ref:'User'}],
	
	//课程开始时间
	startTime:{type:Date, required:true},
	//课程结束时间
	endTime:{type:Date, required:true},
	//每次上课的上课时间,每个单元包含2个数据,即上课时间和下课时间
	scheduleList:[{type:Schema.Types.ObjectId, ref:'ClassTime'}],
	
	//作业列表
	assignmentList:[{type:Schema.Types.ObjectId, ref:'Assignment'}]
});

classSchema.statics.findByCreator = function (creator, callback) {
	return this.model('Class').find({creator: creator}, callback);
};

classSchema.statics.addSchedule = function (schedule, callback) {
	return this.model('Class').find({creator: creator}, callback);
};


mongoose.model('Class', classSchema);
