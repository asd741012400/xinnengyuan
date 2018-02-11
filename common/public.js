//ajax调用
function yDataAjax( url , request , json , htmlFn )
{
	$.ajax({
		url: url,
		type: request,
		data: json,
		success : function(data){
			htmlFn( data )
		},
		error : function(){},
	})
	
}

function nDataAjax( url , request , htmlFn )
{
	$.ajax({
		url: url,
		type: request,
		success : function(data){
			htmlFn( data );
		},
		error : function(){
			console.log(22222)
		},
	})
	
}


// 截取URL参数
function GetRequest() {
  
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	var str = url.substr(1);
	strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}


//公共地址
function getAjaxUrl() {
	return "http://case1.qw1000.cn/";

}




//图片预加载
function loadImg( obj ) {
	if( obj.eq(0).prop("tagName") == "IMG" )
	{

		var imgs = obj,
			count = 0,
			imgLength = imgs.length;
		$.each(imgs, function(index, val) {
			var imgObj = new Image();
			$(imgObj).on('load',function(){


				if( count >= imgLength - 1){
					$('.loading').hide()
				}
				count++;
			})
			imgObj.src = val.src;

		});
    }
    else
	{
        $('.loading').hide()

	}
}







function researchAndDevelopment( devlopinfo , devlopinfoI )
{
	if( devlopinfo[devlopinfoI].imagelist )
	{

		$('.process-explain .left-pic').html("")
		$.each(devlopinfo[devlopinfoI].imagelist, function(index, val) {

			$('.process-explain .left-pic').append(`<b><img src="${val.c_imageurl}"></b>`)

		});

	}
	$('.process-explain .right-text title').html( devlopinfo[devlopinfoI].c_title )
	$('.right-text span').attr("cid" , devlopinfo[devlopinfoI].c_id)
	$('.process-explain .right-text p').html( devlopinfo[devlopinfoI].c_desc )

	// 研发历程选项卡
	let widhtLeft1 =  $(".advance-content:eq(1)").outerWidth() / 5;
	// let d = new Date();
	let initYear = devlopinfo[0].c_date;
	let carLeft = 0; 
	let year = devlopinfo[0].c_date;
	let bigIndex = 0;
	$('.big-span').html("")
	for(let i=0;i<devlopinfo.length;i++){
		$('.big-span').append(`<span class="big" cid="${devlopinfo[i].c_id}" style="left: ${(widhtLeft1+13)*i}px;"><i>${2003+i}</i></span>`);

		if( 2003+i == initYear )
		{
			carLeft = (widhtLeft1+13)*i;
			bigIndex = i;
		}
	}
	
	$('.car').css({left:carLeft + $('.big-span').position().left - 16});
	$('.triangle-down').css({left:carLeft + $('.big-span').position().left});
	$(".big-span .big").eq(bigIndex).css("color","#00b0ec").siblings('.big').css("color","#666666")

	$('.big-span ').delegate('.big', 'click', function(event) {
		console.log(22222)
		carLeft = $(this).position().left;
		devlopinfoI = $(this).index();

		DevlopDetail( devlopinfo,devlopinfoI )
		$('.car').animate({left:$(this).position().left + $('.big-span').position().left - 16},1000,"linear");
		$('.triangle-down').animate({left:$(this).position().left + $('.big-span').position().left},1000,"linear");

		year = $(this).find('i').html();
		bigIndex = $(this).index();
		$(".big-span .big").eq(bigIndex).css("color","#00b0ec").siblings('.big').css("color","#666666")
		if(year<=initYear){
			$('.car').css('transform', 'rotateY(180deg)');
			console.log( year )
			console.log( initYear )
			initYear = year;
		}else{
			$('.car').css('transform', 'rotateY(0deg)');
			initYear = year;
		}
	});

	$('.triangle-right').click(function(event) {

		carLeft += (widhtLeft1+13);
		
		year++;

		if(year <= initYear){
			$('.car').css('transform', 'rotateY(180deg)');

			initYear = year;
		}else{
			$('.car').css('transform', 'rotateY(0deg)');
			initYear = year;
		}


		if( year <= $('.big').eq($('.big').length-1).find('i').html() )
		{
			$('.car').animate({left:carLeft + $('.big-span').position().left - 16},1000,"linear");
			$('.triangle-down').animate({left:carLeft + $('.big-span').position().left},1000,"linear");
			bigIndex++;
			$(".big-span .big").eq(bigIndex).css("color","#00b0ec").siblings('.big').css("color","#666666")
			devlopinfoI++;

			DevlopDetail( devlopinfo, devlopinfoI )

		}





	});

}

function DevlopDetail( devlopinfo , i )
{

	if( devlopinfo[i].imagelist )
	{

		$('.process-explain .left-pic').html("")
		$.each(devlopinfo[i].imagelist, function(index, val) {

			$('.process-explain .left-pic').append(`<b><img src="${val.c_imageurl}"></b>`)

		});

	}
	$('.process-explain .right-text title').html( devlopinfo[i].c_title )
	$('.process-explain .right-text p').html( devlopinfo[i].c_desc )
	$('.right-text span').attr("cid" , devlopinfo[i].c_id)


}

var url = getAjaxUrl();

//子页面banner
function subpageBanner( id )
{
	yDataAjax( url+"chengtou/api/banner/getALL" , "get" , {
		typeid : id,
		pageIndex : 1,
		pageSize : 20
	} , function( data ){

		if( data.status == 0 )
		{
			var imgList = JSON.parse(data.data);

			$.each( imgList, function(index, val) {
				$('.swiper-wrapper').append(
					`<div class="swiper-slide">
						<a href="${val.c_returnurl}"><img src="${val.c_imgurl}"></a>
					</div>`)
					//banner轮播
				var swiper = new Swiper('.banner .swiper-container', {
			      autoplay:2000,
			      pagination: '.swiper-pagination',
			      paginationClickable :true,
			      paginationType : 'custom',
			    });
			});

		}

	})
}