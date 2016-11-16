const express = require('express');
    router = express.Router();


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
			});
		}
		else{
			res.render('user/photo',{
				title:'个人中心'
			});
		};
	});
});

// 头像上传
app.post('/header',upload.single('header'),signIn,(req,res) => {
	var ans;
	var name = req.cookies.username;
	var headerName = req.file.filename;
	res.cookie('header',headerName);
	User.update({username:name},{header:headerName},(err,data) =>{
		if(err){
			console.log(err);
		}
		else{
			Ask.update({username:name},{header:headerName},{multi:true},(err,data) => {
				if(err){
					console.log(err);
				}
				else{
					Answer.update({username:name},{header:headerName},{multi:true},(err,data) => {
						if(err) console.log(err);
						send(res,'success','恭喜，上传头像成功');
					})
				}
			})
		};
	});
});

module.exports = router;