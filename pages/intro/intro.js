

var Request = new Object();
Request = GetRequest();
var cid = Request["cId"];
var elemt = Request["elemt"];

if( elemt == "devlopinfo" )
{
	DevlopDetail( cid )
}
else if( elemt == "applyinfo" )
{
	GetALL( cid )
}
else
{
	
	projectinfo()
}



//table切换

$('.intro-tab div a').click(function(event) {

	$(this).addClass('active').siblings('a').removeClass('active');
	unbind()

	if( $(this).html() == "项目概述" )
	{
		projectinfo()
	}
	else if( $(this).html() == "技术标准" )
	{
		getAll()
	}
	else if( $(this).html() == "研发历程" )
	{
		devlopList()
	}
	else if( $(this).html() == "应用领域" )
	{
		getALL()
	}
	$('.intro-tab p span:last').html($(this).html())
});






//项目概述

function projectinfo()
{
	nDataAjax( url+"chengtou/api/home/projectinfo" , "get" , function(data){

		if( data.status == 0 )
		{
			$('.intro-summarize').show().siblings('div').hide();
			$('.intro-content .intro-summarize .content').html( data.data )
		}
	})
}

//技术标准列表
function getAll()
{
	yDataAjax( url+"chengtou/api/service/getAll" , "get" , {
		pageIndex : 1,
		pageSize : 20
	} ,function(data){

		if( data.status == 0 )
		{
			$('.intro-technology').show().siblings('div').hide();
			
			if( data.data )
			{
				$('.intro-technology ul').html('');
				$.each( data.data , function(index, val) {

					$('.intro-technology ul').append(
						`<li c_id="${val.c_id}">
							<span><img src="${val.c_imageurl}" alt=""></span>
							<p>${val.c_title}</p>
						</li>`)

				});
			}
		}
	})
}
$('.intro-technology ul').delegate('li', 'click', function(event) {

	var cId = $(this).attr("c_id");
	yDataAjax( url+"chengtou/api/service/getDetail" , "get" , {
		id : cId
	} , function( data ){

		if( data.status == 0 )
		{
			$('.intro-technology-details .title h1').html( data.data.c_title )
			$('.intro-technology-details .content').html( data.data.c_content )
		}

	})


	$('.intro-technology-details').show().siblings('div').hide();

});




//研发历程列表
function devlopList()
{
	nDataAjax( url+"chengtou/api/service/DevlopList" , "get" , function(data){

		if( data.status == 0 )
		{
			var devlopinfo = data.data;
			
			console.log( devlopinfo )
			$('.process-container').show().siblings('div').hide();
			researchAndDevelopment( devlopinfo,0 )
		}
	})

}


$('.right-text span').click(function(){

	var cId = $(this).attr("cid");
	DevlopDetail2( cId )

})



//应用领域列表
function getALL(){
	yDataAjax( url+"chengtou/api/banner/getALL" , "get" , {
		pageIndex : 1,
		pageSize : 20,
		typeid : 8
	} , function( data ){

		if( data.status == 0 )
		{
			var allImgList = JSON.parse(data.data);
			if( allImgList )
			{
				$('.intro-territory ul').html("")
				$.each( allImgList , function(index, val) {

					$('.intro-territory ul').append(`<li cid="${val.c_id}"><img src="${val.c_imgurl}"></li>`)
					
				});
			}
		}

		
		$('.intro-territory').show().siblings('div').hide();

	})


}

$('.intro-territory ul').delegate('li', 'click', function(event) {
	var cId = $(this).attr("cid");
	GetALL( cId )
});




function unbind()
{
	$('.big-span .big').unbind('click')
	$('.triangle-right').unbind('click')
}

function DevlopDetail2( cId )
{
	yDataAjax( url+"chengtou/api/service/DevlopDetail" , "get" , {
		id : cId
	} , function( data ){

		if( data.status == 0 )
		{
			$('.process-container-details .title h1').html(data.data.c_title)
			$('.process-container-details .content').html( data.data.c_content )

			$.each( data.data.imagelist , function(index, val) {
				$('.process-container-details .imagelist').append(`<span><img src="${val.c_imageurl}" alt="" /></span>`)
			});
		}

	})

	$.each($('.intro-tab div a'), function(index, val) {
		if($(this).html() == "研发历程")
		{
			$(this).addClass('active').siblings('a').removeClass('active')
		}
	});
	
	$('.process-container-details').show().siblings('div').hide();


}



function GetALL( cId ){
	yDataAjax( url+"chengtou/api/banner/getDetail" , "get" , {
		id : cId
	} , function( data ){

		if( data.status == 0 )
		{
			var dataContent = JSON.parse(data.data);
			$('.intro-territory-details .title h1').html( dataContent.c_title )
			$('.intro-territory-details .content').html( dataContent.c_desc )
		}

	})
	$.each($('.intro-tab div a'), function(index, val) {
		if($(this).html() == "应用领域")
		{
			$(this).addClass('active').siblings('a').removeClass('active')
		}
	});

	$.each($('.intro-tab div a'), function(index, val) {
		if($(this).html() == "应用领域")
		{
			$(this).addClass('active').siblings('a').removeClass('active')
		}
	});
	$('.intro-territory-details').show().siblings('div').hide();
}
