var fun = {
	send:function (res,code,message){
		res.status(200).json({code,message});
	},
	signIn:function (req,res,next){
		var name = req.cookies.username;
		if(name){
			next();
		}
		else{
			// 通过req.xhr来判断请求是否是由Ajax发起的
			if(req.xhr){
				send(res,'fail','对不起，清闲登录...');
			}
			else{
				res.direct('/');
			}
		}
	}
}

module.exports = fun;