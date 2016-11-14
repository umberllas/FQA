$(function(){
	// 点击登录跳转
	$('#user').click(function(){
		location.href = 'signin'
	});

	// 历史记录问题
	$('#goback').click(function(){
		history.go(-1);
	});



	// 用户名验证
	$('input[name="username"]').blur(function(){
		var $val = $(this).val();
		if($val.length < 2 || $val.length > 16){
			check(this);
		}
		else{
			$.get('/username/' + $val,function(data){
				// console.log(data);
				check('input[name="username"]',data.code);
				if(data.code == 'fail'){
					$('.limit').attr('disabled','disabled');
				}
				else{
					$('.limit').removeAttr('disabled','disabled');
				}
			})
		}
	})



	// 密码验证
	$('input[name="password"]').blur(function(){
		var $val = $(this).val();
		if($val.length < 6 || $val.length.length > 16){
			check(this);
		}
		else{
			check(this,'success')
		}
	});



	// 确认密码验证
	$('input[name="rePassword"]').blur(function(){
		var pass = $(':password').map(function(){
			return $(this).val();
		});

		console.log(pass);
		// 判断两次输入的密码是否相等
		if(pass[0] == pass[1]){
			check(this,'success');
		}
		else{
			check(this);
		}
	})




	// 发起请求
	$('form').submit(function(ev){
		ev.preventDefault();
		var data = $(this).serialize();
		$.post('/register',data,function(data){
			// console.log(data);
			
			if(data.code == 'success'){
				$('.modal-body p').text(data.message);
				$('.modal').modal('show');
				$('.modal').on("hidden.bs.modal",function(e){
					location.href = '/signin';
				})
			}
		})
	})


	function check(select,status){
		status = status == 'success' ? 'has-success' : 'has-error';
		$(select).parent().removeClass    ('has-success has-error').addClass(status);
	}
})