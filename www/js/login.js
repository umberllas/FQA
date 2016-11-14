$(function(){
	var cookieName = $.cookie('username');
	// 如果用户未登陆，则隐藏登陆按钮
	// 如果用户登录，显示用户头像以及用户名
	if(cookieName){
		var header = '<img src="uploads/' + $.cookie('header') + '" onerror = "this.src=\'images/icon.jpg\'">';
		$('#user').empty().html(header + " " + cookieName).show();
		
	}
	else{
		$('#user').hide();
	}


	// 退出删除cookie
	$('.dropdown-menu li').last().click(function(){
		$.removeCookie('username');
		location.reload();
	})


	// 点击注册跳转
	$('#register').click(function(){
		location.href = '/register';
	});

	// 历史记录回退
	$('#goback').click(function(){
		console.log('66666')
		history.go(-1);
	});

	// 发起请求
	$('form').submit(function(ev){
		ev.preventDefault();
		var $username = $(this).find('input[name="username"]').val();
		var $pass = $(this).find('input[name="password"]').val();
		$.get('/login/' + $username + '/' + $pass,function(data){
			if(data.code == 'success'){
				location.href = '/';
			}
			else{
				$('.modal-body p').text(data.message);
				$('.modal').modal('show');
			}
		})
	})
})