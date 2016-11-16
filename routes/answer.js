const express = require('express');
const router = express.Router();

//  回答页面 
var answers;
router.get('/answer',(req,res) => {
    res.render('user/answer',{
			title:'回答'
		});
})

//  回答问题
router.post('/answer',signIn,(req,res) => {
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

module.exports = router;