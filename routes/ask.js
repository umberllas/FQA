const express = require('express');
    router = express.Router();

// 提问页面渲染
router.get('/ask',(req,res) => {
	res.render('user/ask',{
		title:'提问'
	});
});

// 提问部分
app.post('/ask',(req,res) => {
	req.body.username = req.cookies.username;
	req.body.header = req.cookies.header;
	req.body.userId = req.cookies.id;
	req.body.time = new Date();
	var ask = new Ask(req.body);
	ask.save(function(err,data){
		if(err){
			console.log(err);
			send(res,'fail','系统错误');
		}
		else{
			send(res,'success','恭喜，提问成功');
		}
	});
});

module.exports = router;