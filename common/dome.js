function pages(a,b,c,fns){
	var z = a;//总页数
	var d = b;//当前页数

	page(z,d);

	$(document).on('click','a[int]',function(){
		d = $(this).attr('int');
		page(z,d);
	});
	$(document).on('click','a.prev',function(){
		d = parseInt(d) - 1;
		if(d <= 1){
			d = 1;
		}
		page(z,d);
	});
	$(document).on('click','a.next',function(){
		d = parseInt(d) + 1;
		if(d >= z){
			d = z;
		}
		page(z,d);
	});
	$(document).on('click','a.determine',function(){
		d = $(".page input").val();
		if(d > z || d < 1){
			return false;
		}
		page(z,d);
	});

	function page(int,indexs){
		let html = '';
		let index = parseInt(indexs);
		$('#zh').html(int).attr('int',int);
		$('#gy').html('共'+int+'页');
		$('.page a').removeClass('active');
		if( indexs >= 2 )
		{
			$('.prev').show();
		}
		else
		{
			$('.prev').hide();
		}
		if(int <= 8 ){
			for(let i = 2; i < int; i++){
				html += '<a href="javascript:;" int="'+i+'">'+i+'</a>';
			};
			$('page').html(html);
		}else{
			html = '<span>...</span>';
			if(index >= int-4){
				for(let i = int-7; i < int; i++){
					html += '<a href="javascript:;" int="'+i+'">'+i+'</a>';
				};
				$('page').html(html);
			}else if(index < 8){
				html = '';
				for(let i = 2; i <= 8; i++){
					html += '<a href="javascript:;" int="'+i+'">'+i+'</a>';
				};
				html += '<span>...</span>';
				$('page').html(html);
			}else{
				for(let i = index-3; i <= index + 3; i++){
					html += '<a href="javascript:;" int="'+i+'">'+i+'</a>';
				};
				html += '<span>...</span>';
				$('page').html(html);
			}
		}
		$("a[int='"+ index +"']").addClass('active');
		$(".page input").val(index);
		ajaxs(index,c);
	}

	function ajaxs(s,t){		
		$.ajax({
			url:'http://case1.qw1000.cn/chengtou/api/news/GetList',
			type:"get",
			data:{
				typeid : t,
				pageSize : 5,
				pageIndex : s
			},
			dataType:"json",
			beforeSend:function(){
			},
			success:function(msg){		
				fns(msg);
			},
			error:function(err){
			}
		});
	}
}