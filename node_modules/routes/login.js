const express = require('express');
    router = express.Router();

// 登录页面渲染
router.get('/signin',(req,res) => {
	res.render('user/login',{
		title:'登录',
		back:true
	});
});

module.exports = router;