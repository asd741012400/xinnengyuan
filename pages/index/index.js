
nDataAjax( url+'chengtou/api/home/getList' , "get" , function( data ){

	if( data.status == 0 )
	{
		var msg = data.data;




		//banner
		if( msg.bannerinfo )
		{
			$.each( msg.bannerinfo, function(index, val) {


				$('.swiper-wrapper').append(
					`<div class="swiper-slide">
						<a href="${val.c_returnurl}"><img src="${val.c_imgurl}"></a>
					</div>`)
					//banner轮播
				var swiper = new Swiper('.banner .swiper-container', {
			      autoplay:3000,
			      pagination: '.swiper-pagination',
			      paginationClickable :true
			    });


			});
		
		}




		
		//研发历程
		// var devlopinfoIndex = 0;
		if( msg.devlopinfo )
		{

			var devlopinfo = msg.devlopinfo;

			researchAndDevelopment( devlopinfo,0 )

			// devlopinfoIndex++;
		}





		//产品信息
		if( msg.productinfo )
		{
			var productinfo = msg.productinfo;


			if( productinfo )
			{

				$.each( productinfo , function(index, val) {
					
					$('.more-banner .ad ul').append(
						`<li c_productid="${val.c_productid}">
							<img src="${val.c_iconimageurl}">
							<b>${val.c_productname}</b>
							<em></em>
							<div>
								<span><img src="${val.c_imageurl}" alt=""></span>
								<p><a href="javascript:;">${val.c_productname}</a></p>
							</div>
						</li>`)

				});
			}


			// 技术产品轮播切换
			
			// $('.more-banner ul').append($('.more-banner ul').html());
			$('.more-banner ul').width( ($('.more-banner ul li').eq(0).outerWidth() + 12) * $('.more-banner ul li').length )
			var moreBannerTarget = $('.more-banner ul li').eq(0).outerWidth() + 12;
			$('.more-banner .arr .left').click(() => {
				leftChange( $('.more-banner') , moreBannerTarget)
			});
			$('.more-banner .arr .right').click(() => {
				rightChange( $('.more-banner') , moreBannerTarget)
			});
			$('.more-banner .ad ul').delegate('li div p a', 'click', function(event) {

				var cid = $(this).parents("li").attr("c_productid")

				window.location.href = "../product/product_details.html?cId="+cid
			});
				

		}


		//应用列表
		if( msg.applyinfo )
		{
			var applyinfo = msg.applyinfo;

			if( applyinfo )
			{
				$.each( applyinfo , function(index, val) {

					$('.application-area .area-pic ul').append(
						`<li cid="${val.c_id}">
							<img src="${val.c_imgurl}">
						</li>`)

				});
		
			}
		}



		//团队列表
		if( msg.teaminfo )
		{
			var teaminfo = msg.teaminfo;

			$('.figure-introduce h2').html(`<a>${teaminfo[0].c_name}</a><i>/</i><span>${teaminfo[0].c_position}</span>`)
			$('.figure-img b').html(`<img src="${teaminfo[0].c_headimgurl}" alt="">`)
			$('.figure-introduce .figure-introduce-content div').html(teaminfo[0].c_desc)
			$('.show-professor').attr("cid" , teaminfo[0].c_id)

			$('.figure-introduce .figure-introduce-content div').click(()=>{
				window.location.href = "../specialist/specialist_details.html?cId="+$('.show-professor').attr("cid")
			})

			console.log( teaminfo )

			if( teaminfo[0].linklist )
			{
		
				$.each(teaminfo[0].linklist, function(index, val) {
					$('.figure-introduce .figure-introduce-content ul').append(
						`<li cid="${val.c_id}">
							<a href="${val.c_linkurl}">${val.c_title}${val.c_desc}</a>
						</li>`)
				});
			}

			for (var i = 1; i < teaminfo.length; i++) {

				$('.figure-banner .ad ul').append(
					`<li cid="${teaminfo[i].c_id}">
						<img src="${teaminfo[i].c_headimgurl}">
						<p>${teaminfo[i].c_name}</p>
						<span>${teaminfo[i].c_position}</span>
					</li>`)
			}

			// 专家团队轮播切换	
			$('.figure-banner ul').append($('.figure-banner ul').html());
			$('.figure-banner ul').width( ($('.figure-banner ul li').eq(0).outerWidth()) * $('.figure-banner ul li').length )
			var figureBannerTarget = $('.figure-banner ul li').eq(0).outerWidth();
			
			$('.figure-banner .arr .left').click(() => {
				leftChange( $('.figure-banner') , figureBannerTarget)
			});
			$('.figure-banner .arr .right').click(() => {
				rightChange( $('.figure-banner') , figureBannerTarget)
			});

			$('.figure-banner .ad ul').delegate('li', 'click', function(event) {

				window.location.href = "../specialist/specialist_details.html?cId="+$(this).attr("cid")

			});


		}


		//企业新闻-图片类
		if( msg.imagenews )
		{
			var imagenews = msg.imagenews;

			$('.news-content div').html(
				`<b><img src="${imagenews[0].c_imageurl}" alt=""></b>
				<p><a c_id="${imagenews[0].c_id}" href="#">${imagenews[0].c_title}</a></p>`)

			$('.news-content div').attr('cid',imagenews[0].c_id)
			$.each( imagenews , function(index, val) {
				
				if( index != 0 )
				{

					$('.news-images').append(
						`<p cid="${val.c_id}">
							<b><img src="${val.c_imageurl}" alt=""></b>
							<span><a c_id="${imagenews[0].c_id}" href="#">${val.c_title}</a></span>
						</p>`)
				}

			});

			$('.news-content div').delegate('p', 'click', function(event) {

				window.location.href = "../news/news_details.html?cId="+$(this).parent('div').attr("cid")

			});
			$('.news-images').delegate('p span', 'click', function(event) {

				window.location.href = "../news/news_details.html?cId="+$(this).parent('p').attr("cid")

			});
			$('.news .title span').click(()=>{

				window.location.href = "../news/news.html"
			
			});
		}

		//企业新闻-列表类
		if( msg.articlenews )
		{
			var articlenews = msg.articlenews;

			$.each( articlenews, function(index, val) {
				$('.news-content ul').append(
					`<li cid="${val.c_id}">
						<a href="#">${val.c_title}</a>
					</li>`)
			});


			$('.news-content ul').delegate('li', 'click', function(event) {

				window.location.href = "../news/news_details.html?cId="+$(this).attr("cid")

			});
		}	




		//国家政策
		if( msg.policynews )
		{
			var policynews = msg.policynews

			$.each( policynews , function(index, val) {

				$('.policy ul').append(
					`<li cid="${val.c_id}">
						<span><img src="${val.c_imageurl}" alt=""></span>
						<div>
							<h3>${val.c_title}</h3>
							<p>${val.c_profile}</p>
						</div>
					</li>`)

			});

			$('.policy ul').delegate('li', 'click', function(event) {

				window.location.href = "../policy/policy_details.html?cId="+$(this).attr("cid")

			});

			$('.policy .title span').click(()=>{

				window.location.href = "../policy/policy.html"
			
			});
			
		}


		//公司介绍
		if( msg.companyinfo )
		{
			var companyinfo = msg.companyinfo;
			$('.about .img div h5').html( companyinfo.c_companytitle )
			$('.about .img div p').html( companyinfo.c_companydesc )
			$('.about .img div a').attr( "cid" , companyinfo.cid )
		}


	}

})


nDataAjax( url+"chengtou/api/home/teaminfo" , "get"  , function( data ){

	if( data.status == 0 )
	{
		$('.synopsis').html( data.data )
	
	}

})


function leftChange( obj , target )
{

	if( !obj.find('ul').is(":animated") ){
		obj.find('ul').animate({left : "-="+target}, 500 ,function(){

			var $firstLi = obj.find('ul').find('li:first');
			obj.find('ul').css("left", 0)
			obj.find('ul').append( $firstLi.clone() )
			$firstLi.remove()
		})
	}

}

function rightChange( obj , target )
{


	var $lastLi =  obj.find('ul').find('li:last');

	if( !obj.find('ul').is(":animated") ){

		obj.find('ul').prepend( $lastLi.clone() )
		$lastLi.remove()
		obj.find('ul').css({
			left : "-="+target,
		})
		obj.find('ul').animate({left : "+="+target}, 500)
	}


}


