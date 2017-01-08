var mongoose = require('mongoose');
var util = require('../util/util');

var User = mongoose.model('User');
var Class = mongoose.model('Class');
var Course = mongoose.model('Course');

/**
 * 根据用户ID获取Class列表
 */
module.exports.getClassListByUserId = function (req, res) {
	//获取userid
	var userid = req.params.userId;
	User.findById(userid,function (err, user) {
		if(err){
			util.sendJSONresponse(res,404,{
				"errmsg":"未查询到该用户."
			});
			return 0;
		}
		
		Class.findByCreator(user._id, function (err, classes) {
			util.sendJSONresponse(res, 200 , {
				"count":classes.length,
				"classes":classes
			});
			return 0;
		});
	});
};

/**
 * 老师创建Class
 */
module.exports.createClassByUserId = function (req, res) {
	//获取userid
	var userid = req.params.userId;
	User.findById(userid, function(err, user) {
		if(err) { //未查询到用户
			util.sendJSONresponse(res,404,{
				"errmsg":"未查询到该用户."
			});
			return 0;
		}
		if(user.userType != 1) { //非老师不能创建
			util.sendJSONresponse(res,404,{
				"errmsg":"您非老师用户，不可创建课程."
			});
			return 0;
		}
		
		//老师创建课程
		var newClass = new Class();
		newClass.creator = user._id;
		newClass.name = req.body.name; //type:Course尚未添加
		//newClass.type = 'Course';
		newClass.verifier = req.body.verifier;
		newClass.teacherList = [user._id]; //添加创建者老师
		newClass.startTime =  new Date(req.body.startTime);
		newClass.endTime = new Date(req.body.endTime);
		newClass.studentList = [];
		newClass.scheduleList = [];
		newClass.assignmentList = [];
		
		//写入数据库
		newClass.save(function (err) {
			if(err) {
				util.sendJSONresponse(res,404,err);
				return 0;
			}
			
			util.sendJSONresponse(res, 200 , {
				"class":newClass
			});
			return 0;
		});
	});
};

/**
 * 添加/移除/修改课时
 */
module.exports.classAddScheduleList = function (req, res) {
	//获取userid
	var userid = req.params.userId;
	User.findById(userid, function(err, user) {
		if(err) { //未查询到用户
			util.sendJSONresponse(res,404,{
				"errmsg":"未查询到该用户."
			});
			return 0;
		}
		if(user.userType != 1) { //非老师不能创建
			util.sendJSONresponse(res,404,{
				"errmsg":"您非老师用户，不可修改课时."
			});
			return 0;
		}
		
		var classId = req.body.classid;
		Class.findById(classId, function(err, curClass) {
			if(user._id != curClass.creator._id) {
				util.sendJSONresponse(res, 404, {
					"errmsg":"您非本课程的创建者，不能添加课时."
				});
				return 0;
			}
			
			// if() {
			//
			// }
		});
	});
	
};

module.exports.classDelScheduleList = function (req, res) {
	
};

module.exports.classChangeScheduleList = function (req, res) {
	
};

/**
 * 添加/移除/修改作业
 */
module.exports.classAddAssignment = function (req, res) {
	
};

module.exports.classAddAssignments = function (req, res) {
	
};

module.exports.classDelAssignment = function (req, res) {
	
};

module.exports.classDelAssignments = function (req, res) {
	
};

module.exports.classChangeAssignment = function (req, res) {
	
};

module.exports.classChangeAssignments = function (req, res) {
	
};

/**
 * 添加/移除学生
 */
module.exports.classAddStudent = function (req, res) {
	
};

module.exports.classDelStudent = function (req, res) {
	
};

/**
 * 添加/移除老师
 */
module.exports.classAddTeacher = function (req, res) {
	
};

module.exports.classDelTeacher = function (req, res) {
	
};
