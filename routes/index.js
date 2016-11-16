const express = require('express');
	router = express.Router();

// 首页渲染
router.get('/',(req,res) => {
	Ask.find()
	.populate('answerList')
	.exec(function(err,data){
		console.log(data)
		res.render('index',{all:data});
	})
})

module.exports = router;