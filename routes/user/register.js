const express = require('express');
    router = express.Router();

// 判断用户名是否存在
// 友好url
app.get('/username/:username',(req,res) => {
	var name = req.params.username;
	User.find({username:name},function(err,data){
		if(err) console.log(err);
		if(data.length != 0){
			send(res,'fail','抱歉，用户名已存在');
		}
		else{
			send(res,'success','恭喜，可以注册该用户名');
		};
	});
});


// 处理注册请求
app.post('/register',(req,res) => {
	req.body.ip = req.ip;
	req.body.time = new Date();
	// console.log(req.body);
	var user = new User(req.body);
	user
	.save(function(err,data){
		if(err) console.log(err)
		send(res,'success','恭喜，注册成功');
	});
})

module.exports = router;