

//标题
nDataAjax( url+"chengtou/api/Category/GetList" , "get"  , function( data ){

	if( data.status == 0 )
	{
		console.log( data )
		if( data.data )
		{
			$('.product-tab ul').html("");
			$('.product-tab ul').append(`<li class="active"><a href="javascript:;">全部</a></li>`)
			$.each( data.data , function(index, val) {

				$('.product-tab ul').append(`<li cid="${val.c_id}"><a href="javascript:;">${val.c_title}</a></li>`)

			});
		}
	}

})

$('.product-tab ul').delegate('li', 'click', function(event) {

	var cid = $(this).attr("cid");
	$(this).addClass('active').siblings('li').removeClass('active');
	getAll( cid )

});


function getAll( id )
{


	yDataAjax( url+"chengtou/api/product/getAll" , "get" , {
		pageIndex : 1,
		pageSize : 200,
		cateid : id
	} , function( data ){

		if( data.status == 0 )
		{
			$('.product-content ul').html("");
			if( data.data )
			{
				$.each( data.data , function(index, val) {

					$('.product-content ul').append(
						`<li productid="${val.c_productid}">
							<span><img src="${val.c_imageurl}" alt=""></span>
							<p>${val.c_productname}</p>
						</li>`)

				});
			}
			console.log( data )
		}
	})
}

$('.product-content ul').delegate('li', 'click', function(event) {

	var cid = $(this).attr("productid");
	
	window.location.href = "product_details.html?cId="+cid;
});