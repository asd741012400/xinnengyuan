
	yDataAjax( url+"chengtou/api/team/GetList" , "get" , {
		pageIndex : 1,
		pageSize : 100
	} , function( data ){

		if( data.status == 0 )
		{
			var firstFigure = data.data[0];

			$('.figure-details .figure-img b').html(`<img src="${firstFigure.c_headimgurl}" alt="">`)
			$('.figure-details .figure-introduce h2').html(`<a>${firstFigure.c_name}</a><i>/</i><span>${firstFigure.c_position}</span>`)
			$('.figure-details .figure-introduce .figure-introduce-content div').html(firstFigure.c_desc)
			$('.figure-details').attr("cid" ,firstFigure.c_id)

			if( firstFigure.linklist )
			{
				$.each(firstFigure.linklist, function(index, val) {
					$('.figure-introduce-content ul').append(
						`<li cid="${val.c_id}">
							<a href="${val.c_linkurl}">${val.c_title}${val.c_desc}</a>
						</li>`)
				});
			}



			for (var i = 1; i < data.data.length; i++) {
				$('.specialist-team ul').append(
					`<li cid="${data.data[i].c_id}">
						<span><img src="${data.data[i].c_headimgurl}" alt=""></span>
						<h5>${data.data[i].c_name}</h5>
						<p>${data.data[i].c_position}</p>
					</li>`)
			}
			console.log( data )




		}

	})


	nDataAjax( url+"chengtou/api/home/teaminfo" , "get"  , function( data ){

		if( data.status == 0 )
		{
			$('.synopsis').html( data.data )
		
		}

	})



	$('.figure-details .figure-introduce .figure-introduce-content div').click(()=>{

		window.location.href = "specialist_details.html?cId="+$('.figure-details').attr("cid")
	
	})
	$('.specialist-team ul').delegate('li', 'click', function(event) {

		window.location.href = "specialist_details.html?cId="+$(this).attr("cid")
	
	});
