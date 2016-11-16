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

app.engine('.html',template.__express);
app.set('view engine','html');

// 页面请求处理
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/user/register'));
app.use(require('./routes/user/login'));
app.use(require('./routes/ask'));
app.use(require('./routes/answer'));
app.use(require('./routes/photo'));


app.listen(8080,() => {
	console.log('Coming...');
})