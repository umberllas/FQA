const multer = require('multer');

const storage = multer.diskStorage({
	destination:'www/uploads',
	filename:function(req,file,cb){
		
		var name = req.cookies.username;
		// 用户在电脑上存在的名称
		var fileType = file.originalname;
		var arr = fileType.split('.');
		var headerName = name + '.' + arr[arr.length - 1];
		cb(null,headerName);
	}
}),upload = multer({storage});


module.exports = upload;