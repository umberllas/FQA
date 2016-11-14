const express = require('express');
	router = express.Router();

router.use(function(req,res,next){
	next();
})


// 首页渲染
router.get('/',(req,res) => {
	Ask.find()
	.populate('answerList')
	.exec(function(err,data){
		console.log(data)
		res.render('index',{all:data});
	})
})


// 登录页面渲染
router.get('/signin',(req,res) => {
	res.render('user/login',{
		title:'登录',
		back:true
	})
})


// 注册页面渲染
router.get('/register',(req,res) =>{
	res.render('user/register',{
		title:'注册',
		back:true
	})
})


// 提问页面渲染
router.get('/ask',(req,res) => {
	res.render('user/ask',{
		title:'提问'
	});
})



// 用户头像渲染
router.get('/user',(req,res) => {
	var name = req.cookies.username;
	Ask.find({username:name},function(err,data){
		if(err) console.log(err);
		if(data.length != 0){
			var id = data[0].userId;
			Ask.find({userId:id},function(err,data){
				if(err) console.log(err);
				res.render('user/photo',{
					all:data,
					title:'个人中心'
				});
			})
		}
		else{
			res.render('user/photo',{
				title:'个人中心'
			});
		}
	})
})


module.exports = router;