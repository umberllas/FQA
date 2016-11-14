const express = require('express');
	  bodyParser = require('body-parser');
	  fs = require('fs');
	  cookieParser = require('cookie-parser');
	  app = express();

	  template = require('./template');
	  upload = require('./multer');
	  fun = require('./fun');
	  send = fun.send;
	  signIn = fun.signIn;
	  mongoose = require('./mongoose');
	  User = mongoose.User;
	  Ask = mongoose.Ask;
	  Answer = mongoose.Answer;


app.use(express.static('www'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());



app.use(require('./routes/index'))


app.engine('.html',template.__express);
app.set('view engine','html');


//  回答页面 和 回答问题
var answers;
app.route('/answer')
	.get(function(req,res){
		res.render('user/answer',{
			title:'回答'
		});
	})
	.post(signIn,function(req,res){
		console.log(req.body)
		var id = req.cookies.askId;
		// console.log(id)
		req.body.index = req.cookies.index;
		req.body.username = req.cookies.username;
		req.body.header = req.cookies.header;
		req.body.time = new Date();
		req.body.userId = req.cookies.id; 
		req.body.askId = id;
		var answer = new Answer(req.body);
		answer.save(function(err,docs){
			if(err) console.log(err);
			Ask.find({_id:id},function(err,data){
				if(err){
					console.log(err);
				}
				else{
					answers = data[0].answerList;
					answers.push({_id:docs._id});
					Ask.update({_id:id},{$set:{answerList:answers}},function(err,data){
						if(err){
							send(res,'fail','系统错误,请稍后再试');
						}
						else{
							send(res,'success','恭喜，回答成功');
						}
					})
				}
			})
		})
	})


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


// 判断用户名是否存在
// 友好url
app.get('/username/:username',(req,res) => {
	var name = req.params.username;
	console.log(name)
	User.find({username:name},function(err,data){
		if(err) console.log(err);
		if(data.length != 0){
			send(res,'fail','抱歉，用户名已存在');
		}
		else{
			send(res,'success','恭喜，可以注册该用户名');
		}
	})
})



// 登录
app.get('/login/:username/:password',(req,res) => {
	var name = req.params.username;
	var pass = req.params.password;
	User.find({username:name,password:pass},function(err,data){
		if(err) console.log(err);
		if(data.length != 0){
			// console.log(data)
			res.cookie('username',data[0].username);
			res.cookie('id',data[0].id);
			res.cookie('header',data[0].header);
			send(res,'success','登录成功');
		}
		else{
			send(res,'fail','您输入的密码或用户名不正确');
		}
	});
})




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
	})
})





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
		}
	})
})


app.listen(3000,() => {
	console.log('Coming...');
})