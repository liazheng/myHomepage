'use strict';

$(function(){

	var winHeight=$(window).height();
	$(document.body).css({
		'overflow-y':'hidden'
	});
	setTimeout(function(){
		$('.start0').hide();
		$('.start-animation').hide();
	},3200);
	

	var startTime=null;

	$('.start').mouseover(function(){
		startTime=setInterval(function(){
			$('.start>i').toggleClass('animate');
		},500)
	});
	$('.start').mouseout(function(){
		clearInterval(startTime);
	});
	$('.start').click(function(){
		$.fn.fullpage.moveTo(2,0);
	});
		
	$('.navbar .nav li').each(function(index){
		$(this).click(function(){
			$('.sections').css({'transition':'all 500ms ease','transform':`translateY(-${index*winHeight}px)`});
		}).mouseout(function(){
			$(this).css({'background-color':'rgba(0,0,0,0)'});
		});
		$(this).mouseout(function(){
			$(this).css({'background-color':'rgba(0,0,0,0)'});
		});


	});

	$('#email').bind('input propertychange',function(){
		var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/img;
		if(!reg.test($(this).val())){
			$(this).next().html('请输入正确邮箱格式');
		}else{
			$(this).next().html('');
		}
	})
	$('#contactForm button').click(function(){
		$('.form-group').each(function(index,ele){
			var inputEle=$(ele.children[0]);
			var pEle=$(ele.children[0]);
			
			if(!inputEle.val()){
				pEle.html('必填');
			}else{
				pEle.html('');
			}
		})
		
	});
	

	//canvas

	var aC=document.querySelectorAll('canvas');

	var scale=[90,85,80,50];
	var color=['#39A16C','#AC8CBB','#D22A5C','#E9E290']
	for(var i=0;i<aC.length;i++){
		draw(i);
		var index=i;
		(function(index){
			aC[i].onmouseenter=function(){
				draw(index);
			}
		})(i);
	}

	$('#slide1').mouseover(function(){
		for(var i=0;i<aC.length;i++){
			draw(i);
		}
	});

	//比例转弧度
	function s2r(s){
		return s/50*Math.PI;
	}
	function draw(i){
		var oC=aC[i];
		var ctx=oC.getContext('2d');

		var a=0;
		var count=0;
		var duration=Math.floor(1000/16);
		
		ctx.lineWidth=10;
		ctx.strokeStyle=color[i];

		var timer=null;
		clearInterval(timer);
		timer=setInterval(function(){
			
			a=count/duration;

			ctx.clearRect(0,0,oC.width,oC.height);
			ctx.beginPath();
			ctx.arc(130,130,100,-Math.PI/2,a*s2r(scale[i])-Math.PI/2);
			ctx.stroke();
			count++;
			if(count==duration){
				clearInterval(timer);
			}
		},16);	
	};

	

	

})

