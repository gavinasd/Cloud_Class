var mongoose = require('mongoose');
var util = require('../util/util');
var path = require('path');
var join = path.join;

var User = mongoose.model('User');
var Class = mongoose.model('Class');
var Course = mongoose.model('Course');
var Resource = mongoose.model('Resource');

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


/**
 * 添加/下载/删除资源
 */
module.exports.classAddResource = function(req, res){
	var classId = req.body.classId;
	var userId = req.body.userId;
	var resource = req.files[0];
	console.log(req.body);
	console.log(resource);
	if(!classId || !userId || !resource){
		util.errorWithParameters(res);
		return 0;
	}

	Class.findById(classId,function (err, classes) {
		if(err || !classes){
			util.sendJSONresponse(res,404,{
				"errmsg":"找不到该班级"
			});
		}
		User.findById(userId,function (err, user) {
			if(err || !user){
				util.sendJSONresponse(res,404,{
					"errmsg":"找不到该学生"
				});
			}

			if(user.userType !== 1){
				util.sendJSONresponse(res,404,{
					"errmsg":"您非老师用户，不可以上传资料"
				});
			}

			if(!classes.isTeacherIn(user._id)){
				util.sendJSONresponse(res,404,{
					"errmsg":"你不在此班级中"
				});
			}

			var newResource = new Resource();
			newResource.name = req.body.name || resource.originalname;
			newResource.creator = userId;
			newResource.class = classId;
			newResource.path = resource.path;
			newResource.save(function (err) {
				if(err) {
					util.sendJSONresponse(res,404,err);
					return 0;
				}

				util.sendJSONresponse(res, 200 , {
					"res":newResource
				});
				return 0;
			});

		});
	});
};

module.exports.classGetResourceListByClass = function(req, res){
	var classId = req.params.classId;
	if(!classId){
		util.errorWithParameters(res);
	}

	Class.findById(classId,function (err,classes) {
		if(err || !classes){
			util.sendJSONresponse(res,404,{
				"errmsg":"未查到该班级."
			});
			return 0;
		}
		Resource.findByClass(classId,function(err,resourceList){
			if(err){
				util.sendJSONresponse(res,404,{
					"errmsg":err
				});
				return 0;
			}
			util.sendJSONresponse(res,200,resourceList);
		});
	});
};

module.exports.classDeleteResource = function(req, res){

};

module.exports.downloadResource = function(req, res){
	console.log('download resource');
	console.log(req.app.get('resources')+"############");
	var path = join(req.app.get('resources'),'/Express.in.Action.2016.4.pdf');
	console.log(path);
	res.sendFile(path);

	var resourceId = req.params.resourceId;
	if(!resourceId){
		util.errorWithParameters(res);
	}
	Resource.findById(resourceId,function(err,resource){
		if(err || !resource){
			util.sendJSONresponse(res,404,{
				"errmsg":"未查到该资源."
			});
			return 0;
		}
		res.sendFile(resource.path);
	});
};
