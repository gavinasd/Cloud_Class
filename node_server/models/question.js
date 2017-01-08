/**
 * 老师创建的问题
 * Created by zhenwenl on 16/12/31.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
	//创建者
	creator:{type:Schema.Types.ObjectId, ref:'User'},
	//作业类型，选择题/填空题/托福阅读题
	assignmentType:{type:Number, required:true},
	//题目内容，包括选项
	content:String,
	//答案
	answer:String
});

mongoose.model('Question', questionSchema);

