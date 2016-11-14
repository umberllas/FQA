$(function(){
	// 获取到cookie
	var cookieName = $.cookie('username');

	if(cookieName){
		// onerror当文件加载失败时，会触发这个事件
		// $.get('/getHeader',function(data){
			var header = '<img src="uploads/' + $.cookie('header') + '" onerror = "this.src=\'images/icon.jpg\'">';
			// $('#user').empty().html(header);
			$('#user').empty().html(header + " " + cookieName).show();
		// })
		
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


	$('form').submit(function(ev){
		ev.preventDefault();
		var data = new FormData(this);

		$.post({
			url:'/header',
			data:data,
			contentType:false,
			processData:false,
			success:function(data){
				if(data.code == 'success'){
					location.reload();
				}
			}
		})
	})
})