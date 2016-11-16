const mongoose = require('mongoose');
	mongoose.Promise = Promise;
	mongoose.connect('mongodb://localhost/zyqa-9');

	var db = mongoose.connection;
	db.on('open',function(){
		console.log('数据库已连接');
	});
	db.on('error',function(){
		console.log('数据库连接出错');
	});

// 建立模式
var Schema = mongoose.Schema;
var userSchema = new Schema({
	username:String,
	password:String,
	rePassword:String,
	isMale:Boolean,
	email:String,
	course:String,
	ip:String,
	time:Date,
	header:String
});
var User = mongoose.model('User',userSchema,'user');

var askSchema = new Schema({
	username:String,
	header:String,
	time:Date,
	content:String,
	answerList:[{type:Schema.Types.ObjectId,ref:'Answer'}],
	userId:{type:Schema.Types.ObjectId,ref:'User'}
});
var Ask = mongoose.model('Ask',askSchema,'ask');

var answerSchema = new Schema({
	username:String,
	header:String,
	time:Date,
	content:String,
	askId:{type:Schema.Types.ObjectId,ref:'Ask'},
	userId:{type:Schema.Types.ObjectId,ref:'User'}
})
var Answer = mongoose.model('Answer',answerSchema,'answer');


module.exports = {
	Ask,
	User,
	Answer
};
