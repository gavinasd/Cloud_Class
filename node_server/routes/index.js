var multer = require('multer');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret:"thisIsSecret",
	userProperty:'payload'
});
var resUpload = require('../middle_ware/uploader');


var usersController = require('../controllers/usersController');
var ctrlAuth = require('../controllers/authentication');
var classController = require('../controllers/classController');

//for test
router.get('/user/:userId', auth, usersController.readOneUser);

/**-----------------------------------------------------------------------
 * 注册登陆接口
 **---------------------------------------------------------------------*/
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/**-----------------------------------------------------------------------
 * 课程Class接口
 **---------------------------------------------------------------------*/
router.get('/classes/:userId', auth, classController.getClassListByUserId);
router.post('/classes/:userId', auth, classController.createClassByUserId);

//添加/删除 老师/学生
router.post('/classes/addTeacher/:userId', auth, classController.classAddTeacher);
router.post('/classes/delTeacher/:userId', auth, classController.classDelTeacher);
router.post('/classes/addStudent/:userId', auth, classController.classAddStudent);
router.post('/classes/delStudent/:userId', auth, classController.classDelStudent);

//添加/删除/修改 课程表
router.post('/classes/addSchedule/:userId', auth, classController.classAddScheduleList);
router.post('/classes/delSchedule/:userId', auth, classController.classDelScheduleList);
router.post('/classes/changeSchedule/:userId', auth, classController.classChangeScheduleList);

//添加/删除/修改 作业
router.post('/classes/addAssignment/:userId', auth, classController.classAddAssignment);
router.post('/classes/addAssignments/:userId', auth, classController.classAddAssignments);
router.post('/classes/delAssignment/:userId', auth, classController.classDelAssignment);
router.post('/classes/delAssignments/:userId', auth, classController.classDelAssignments);
router.post('/classes/changeAssignment/:userId', auth, classController.classChangeAssignment);
router.post('/classes/changeAssignments/:userId', auth, classController.classChangeAssignments);

//添加/删除/下载 课堂资源
router.post('/resource/addResource/', resUpload.any(), classController.classAddResource);
router.get('/classes/getResource/:classId', auth, classController.classGetResourceListByClass);
router.delete('/classes/deleteResource/:userId', auth, classController.classDeleteResource);
router.get('/classes/downloadResource/:resourceId',classController.downloadResource);



module.exports = router;
