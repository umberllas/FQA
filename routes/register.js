const express = require('express');
    router = express.Router();

// 注册页面渲染
router.get('/register',(req,res) =>{
	res.render('user/register',{
		title:'注册',
		back:true
	});
});

module.exports = router;