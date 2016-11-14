$(function(){
	// 获取到cookie
	var cookieName = $.cookie('username');
	console.log(cookieName)

	if(cookieName){
		// onerror当文件加载失败时，会触发这个事件
		var header = '<img src="uploads/' + $.cookie('header') + '" onerror = "this.src=\'images/icon.jpg\'">' ;
		// $('#user').empty().html(header);
		$('#user').empty().html(header + " " + cookieName).show();
	}

	// 退出登录
	$('.dropdown-menu li').last().click(function(){
		$.removeCookie('username');
		$.removeCookie('id');
		$.removeCookie('index');
		$.removeCookie('header');
		location.reload();
	})

	$('#user').click(function(){
		if(!cookieName){
			$(this).removeAttr('data-toggle');
			location.href = '/signin';
		}
	})


	// 提问跳转部分
	$('#ask').click(function(){
		if(cookieName){
			location.href = '/ask';
		}
		else{
			console.log(1)
			$('.modal-body p').text('请先登录');
			$('.modal').modal('show');
		}
	})


	// 回答跳转部分
	// 因为以后也会生成answer 这样事件就监听不到了，采用事件委托的方法
	$('.question').delegate('.answer','click',function(){
		// 获取button点击时，获取对应的如元素ul的下标值
		var $index = $(this).parents('ul').index();
		$id = $(this).parents('ul').data('id');
		$.cookie('askId',$id);
		// 将下标值设置为cookie
		$.cookie('index',$index);
		if(cookieName){
			location.href = '/answer';
		}
		else{
			console.log(1)
			$('.modal-body p').text('请先登录');
			$('.modal').modal('show');
		}
	})



	$('.modal-close').click(function(){
		$('.modal').modal('hide')
		.on('hidden.bs.modal',function(){
			location.href = '/signin';
		})
	})



	



})