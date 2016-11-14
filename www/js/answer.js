$(function(){
	// 获取到cookie
	var cookieName = $.cookie('username');

	if(cookieName){
		// onerror当文件加载失败时，会触发这个事件
		var header = '<img src="uploads/' + $.cookie('header') + '" onerror = "this.src=\'images/icon.jpg\'">' ;
		// $('#user').empty().html(header);
		$('#user').empty().html(header + " " + cookieName).show();
	}

	// 退出登录
	$('.dropdown-menu li').last().click(function(){
		$.removeCookie('username');
		location.reload();
	})

	$('#user').click(function(){
		if(!cookieName){
			$(this).removeAttr('data-toggle');
			location.href = '/signin';
		}
	})


	// 字数
	function checkNumber(){
		// console.log(1)
		var $val = $('textarea').val().length;
		// console.log($val)
		$('textarea').next().text(140-$val + '/140');
	}

	var timer;
	$('textarea').focus(function(){
		console.log(1)
		timer = setInterval(checkNumber,20);
	})
	$('textarea').blur(function(){
		clearInterval(timer);
	})

	$('.modal-close').click(function(){
		$('.modal').modal('hide');
	})

	// 发起请求
	$('form').submit(function(ev){
		ev.preventDefault();
		var data = $(this).serialize();
		$.post('/answer',data).done(function(data){
			console.log(data);
			$('.modal-body p').text(data.message);
			$('.modal').modal('show');
			if(data.code == 'success'){
				$('.modal').on('hidden.bs.modal',function(){
					location.href = '/';
				})
			}
		})
	});


})