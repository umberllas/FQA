const express = require('express');
    router = express.Router();

// 登录
app.get('/login/:username/:password',(req,res) => {
	var name = req.params.username;
	var pass = req.params.password;
	User.find({username:name,password:pass},function(err,data){
		if(err) console.log(err);
		if(data.length != 0){
			res.cookie('username',data[0].username);
			res.cookie('id',data[0].id);
			res.cookie('header',data[0].header);
			send(res,'success','登录成功');
		}
		else{
			send(res,'fail','您输入的密码或用户名不正确');
		};
	});
});

module.exports = router;