require.config({
	baseUrl : 'js',
	paths : {
		"zepto"  : 'lib/zepto',
		"public" : 'module/public',
		"sprite" : 'module/sprite',
		"load"	 : 'module/load'
	},
	shim : {

		'zepto' : {

			exports: 'Zepto'
		}
	}
	
});
require(['zepto','public','sprite', 'load'], function($, pub ,s ,l) {

	// var $=$.Zepto;
	console.log($);
	var isPC = pub.isPC(),
		ANI_TIME = 800,
		winW = $(window).width(),
		winH = $(window).height(),
		firstGame = true,
		allowFlag = false, //onOrientation中设置body宽高标志位
		firstFlag = winW>winH? true : false, //初次进入标识
		wrapH = winW>winH? winW*640/1136 : winH*640/1136,
		s1_hero = $('#scene1_hero'), //场景1 hero
		s1_boss = $('#scene1_boss'), //场景1 boss
		s1_words = $('#scene1_words'), //场景1 words
		s1_btn = $('#scene1_btn'), //场景1 words
		s1_hero_img = s1_hero.find('img')[0];
		

	var s2_hero = $('#scene2_hero'), //场景2 hero
		s2_boss = $('#scene2_boss'), //场景2 boss
		s2_hero_arrow = $('#scene2_hero_arrow'),
		s2_boss_img = s2_boss.find('img')[0],
		arrowFlag = false,
		//场景2 道具提示位置
		s2_pos = [
					{ },
					{ width : '10%', height : '18.1%' , left : '43%', bottom : '24%' },
					{ width : '10%', height : '19.7%' , left : '57%', bottom : '12%' },
					{ width : '12.1%', height : '19.1%' , left : '73.2%', bottom : '11%' },
					{ width : '13.2%', height : '24.8%' , left : '75.1%', bottom : '58%' },
					{ width : '13.2%', height : '24.8%' , left : '75.1%', bottom : '58%' },
				 ];
		//场景2 道具提示图片地址
		s2_src=[
					'',
					'images/scene2_tips2.png',
					'images/scene2_tips3.png',
					'images/scene2_tips4.png',
					'images/scene2_tips6.png',
					'images/scene2_tips5.png'
			   ];

	var s3_hero = $('#scene3_hero'),
		s3_hero_img = s3_hero.find('img')[0],
		s3_pos =[
					{ width : '12.5%' ,height : '24.4%', left : '77.7%', bottom : '55.8%'},
					{ width : '12.5%' ,height : '22.2%', left : '77.7%', bottom : '59.4%'},
					{ width : '10.1%' ,height : '9.8%', left : '24.3%', bottom : '62.5%'},
					{ width : '10.3%' ,height : '11.6%', left : '17.8%', bottom : '8%'}
					
				];

		s3_src=[
					'images/scene3_tips1.png',
					'images/scene3_tips2.png',
					'images/scene3_tips3.png',
					'images/scene3_tips4.png'
			   ];

	
	//序列帧动画
	var sprite_s1_hero1 = new s.Sprite( s1_hero_img, { time : 200 ,url : pub.config.HERO_MOVE_URL_ARR});
	var sprite_s1_hero2 = new s.Sprite( s1_hero_img, { time : 200 ,url : pub.config.HERO_STAND_URL_ARR});
	var sprite_s2_boss = new s.Sprite( s2_boss_img, { time : 100 , isOne : true, url : pub.config.BOSS_DEAD_URL_ARR ,result : beateBossResult});
	var sprite_s3_hero = new s.Sprite( s3_hero_img, { time : 200 , url : pub.config.HERO_MOVE_URL_ARR });
	var sprite_s3_hero2 = new s.Sprite( s3_hero_img, { time : 200 , url : pub.config.HERO_STAND_URL_ARR });

	//开始游戏
	function initGame(){

		firstGame = false;

		$('.wrapper').height(parseInt(wrapH));

		onScene1();

	}

	//PC端进入跳转
	function goPcUrl(){

		if(isPC){
			location.href = pub.config.PC_URL;
			return;
		}
	}

	//场景1
	function onScene1(){

		var s1_hero_left = s1_hero.offset().left,
			s1_hero_width = s1_hero.width();
		
		s1_boss.css({'-webkit-transform' : 'translate3d(0,-20px,0)'});
		s1_hero.css({'-webkit-transform' : 'translate3d(-'+(s1_hero_left+s1_hero_width)+'px,0,0)', opacity : 1});
		s1_btn.css({'-webkit-transform' : 'translate3d(20px,0,0)'});
		s1_words.css({'-webkit-transform' : 'translate3d(0,20px,0)'});

		setTimeout(function(){

			sprite_s1_hero1.init();

			s1_boss.animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME, function(){

				$(this).addClass('ani');
			});

			s1_hero.animate({translate3d : '0,0,0'}, 2.5*ANI_TIME, function(){

				s1_btn.animate({ opacity : 1, translate3d : '0,0,0'});
				s1_words.animate({ opacity : 1, translate3d : '0,0,0'});
				
				sprite_s1_hero1.clearSprite();

				sprite_s1_hero2.init();
				
				goScene2();
			});

		},200);
	}

	//进入场景2
	function goScene2(){

		$('#scene1_btn').tap(function(){

			$('.scene').eq(0).hide();
			$('.scene').eq(1).show();

			sprite_s1_hero2.clearSprite();

			onScene2();
		});
	}

	//场景2
	function onScene2(){

		var s2_hero_left = s2_hero.offset().left,
			s2_hero_width = s2_hero.width();

		// s2_hero.css({'-webkit-transform' : 'translate3d(-'+(s2_hero_left+s2_hero_width)+'px,0,0)', opacity : 1});

		setTimeout(function(){

			s2_boss.animate({opacity : 1}, ANI_TIME, function(){

				createScene2Tips(5);

				onClickScene2Stage();
			});

			// s2_hero.animate({translate3d : '0,0,0'}, 2*ANI_TIME, function(){

				
			// });

		},200);
	}


	//进入场景3
	function goScene3(){

		$('.scene').eq(1).hide();
		$('.scene').eq(2).show();

		onScene3();
	}

	//场景3
	function onScene3(){

		var s3_hero_left = s3_hero.offset().left,
			s3_hero_width = s3_hero.width();

		sprite_s3_hero.init();

		s3_hero.css({'-webkit-transform' : 'translate3d(-'+(s3_hero_left+s3_hero_width)+'px,100px,0)'});

		s3_hero.animate({translate3d : '0,0,0'}, 4*ANI_TIME, function(){

			sprite_s3_hero.clearSprite();

			sprite_s3_hero2.init();

			showScene3FirstTips();

			onClickScene3Stage();

		});

		clickScene3Btn();
		
	}

	//进入场景4
	function goScene4(){

		$('.scene').eq(2).hide();
		$('.scene').eq(3).show();

		onScene4();
	}

	//场景4
	function onScene4(){

		var scene4_l_width = $('.scene4-left').width(),
			scene4_r_width = $('.scene4-right').width();


		$('.scene4-left').css({'-webkit-transform' : 'translate3d(-'+(scene4_l_width)+'px,0,0)'});
		$('.scene4-right').css({'-webkit-transform' : 'translate3d('+(scene4_r_width)+'px,0,0)'});

		$('.scene4-left').animate({ translate3d : '0,0,0'}, 'ease-out', ANI_TIME/2);

		setTimeout(function(){

			$('.scene4-right').animate({ translate3d : '0,0,0'}, 'ease-out', ANI_TIME/2,function(){

				setTimeout(function(){

					$('#scene4_mask').fadeIn();
				},600);
				
			});

		},400);

		$('#scene4_mask').tap(function(){

			$('#scene4_mask').hide();

			goScene5();
		});

	}

	//进入场景5
	function goScene5(){

		$('.scene').eq(3).hide();
		$('.scene').eq(4).show();

		onScene5();
	}

	// 场景5
	function onScene5(){


		$('.scene5-hero1').css({'-webkit-transform':'translate3d(-10px,-30px,0)'});
		$('.scene5-hero2').css({'-webkit-transform':'translate3d(10px,30px,0)'});
		$('.scene5-birds').css({'-webkit-transform':'translate3d(-10px,0,0)'});
		$('.scene5-btn').css({'-webkit-transform':'translate3d(0,40px,0)'});
		$('.scene5-success').css({'-webkit-transform':'scale(0)'});

		setTimeout(function(){

			$('.scene5-birds').animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME*3/4, 'ease-out');

			$('.scene5-hero1').animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME*3/4, 'ease-out');

			setTimeout(function(){

				$('.scene5-hero2').animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME*3/4, 'ease-out');

				setTimeout(function(){

					$('.scene5-success').animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME*3/4, 'ease-out');

					$('.scene5-btn').animate({translate3d : '0,0,0', opacity : 1}, ANI_TIME*3/4, 'ease-out');
				},400);
				

			},200);
			
		},300);
		

		$('.scene5-again').tap(function(){

			location.href = "index.html";
		});

		$('.scene5-wx').tap(function(){

			allowFlag = true;

			resizeBody();

			location.href = pub.config.SCENE5_TCGAME_URL;
		});

		$('.scene5-share').tap(function(){

			$('.sharebox').show();
		});
	}

	//创建场景3提示
	function createScene3Tips(index){

		$('.scene-tips-box').remove();

		var div = document.createElement('div');

		div.className = 'scene-tips-box';

		$(div).css(s3_pos[index]);
		$(div).html('<img class="img-p100" src="'+s3_src[index]+'">');

		$('.scene3').append($(div));

	}

	//显示场景3进场提示
	function showScene3FirstTips(){

		createScene3Tips(0);
	}

	//显示场景3通关按钮和提示
	function showScene3Sure(){

		createScene3Tips(1);

		$('.scene3-jump>img').attr('src', pub.config.SCENE3_JUMP);

		$('#scene3_btn').show();
	}

	function clickScene3Btn(){

		$('#scene3_btn').tap(function(){

			$(this).hide();

			$('#scene3_mask').fadeIn();
		});

		$('#scene3_mask .scene-mask-btn').tap(function(){

			$('#scene3_mask').hide();

			sprite_s3_hero2.clearSprite();

			goScene4();
		});
	}

	//点击场景3的道具
	function onClickScene3Stage(){

		$('.scene3-stage').tap(function(){

			var index = $(this).index();

			if(index > 0){

				$('#scene3_btn').hide();
			}

			switch(index){

				case 0 :
					showScene3Sure();
					break;
				case 1 :
					createScene3Tips(2);
					break;
				case 2 :
					createScene3Tips(3);

					break;
				
			}
		});
	}

	//点击场景2的道具
	function onClickScene2Stage(){

		$('.scene2-stage').tap(function(){

			var index = $(this).index();

			$('.scene2-tips').show();

			if(index>0){
				$(this).find('.scene2-tips').hide();
			}
			
			switch(index){

				case 0 :
					createScene2Tips(0);
					break;
				case 1 :
					createScene2Tips(1);
					break;
				case 2 :
					createScene2Tips(2);
					break;
				case 3 :
					createScene2Tips(3);
					break;
				
			}
		});

		$('#scene2_boss').tap(function(){

			if(arrowFlag){

				beatBoss();
			}else{

				$('.scene2-tips').show();

				createScene2Tips(4);
			}
			
		});

		$('.scene2-arrow').tap(clickArrow);
	}

	//点击弓箭
	function clickArrow(){

		s2_hero_arrow.show();
		s2_hero.hide();

		$('.scene2_arrow_center').show();

		arrowFlag = true;
	}

	//击败场景2 boss
	function beatBoss(){

		s2_hero_arrow.find('img').attr('src', pub.config.HERO_SHOT_SRC);

		setTimeout(function(){

			sprite_s2_boss.init();
			$('.scene2_arrow_center').hide();

		},300);

		$('#scene2_boss').unbind('tap');
		
	}

	function beateBossResult(){

		setTimeout(function(){

			s2_hero_arrow.hide();
			s2_hero.show();
		},500);
		

		setTimeout(function(){

			$('#scene2_mask').fadeIn();

		},1000);
		

		$('#scene2_mask .scene-mask-btn').tap(function(){

			$('#scene2_mask').hide();

			goScene3();
		});	
	}

	//创建场景2的提示
	function createScene2Tips(index){

		$('.scene-tips-box').remove();

		if(index==0){

			return;
		}
		var div = document.createElement('div');

		div.className = 'scene-tips-box';

		$(div).css(s2_pos[index]);
		$(div).html('<img class="img-p100" src="'+s2_src[index]+'">');

		$('.scene2').append($(div));

	}

	//判断手机横竖屏状态：
	function onOrientation(){

		// resizeBody();
		
		if(allowFlag){

			$('body').css({ width : '100%', height : '100%'});

			setTimeout(resizeBody,200);
		}
		

		if(!firstGame){
			return;
		}

		if(window.orientation==90||window.orientation==-90){

			//安卓横屏计算winW需加延时
			setTimeout(function(){

				firstFlag = false;

				wrapH = $(window).width()*640/1136;
				
				initGame();

			},800);
			
		}
	}

	function resizeBody(){

		$('body').width($(window).width());
		$('body').height($(window).height());
	}

	function loadImg(result){


		var images = $('img'),imgArr=[];

		for(var i=0,len=images.length; i<len; i++){

			var src = images[i].src;

			imgArr.push(src);
		}

		imgArr = imgArr.concat(pub.config.HERO_MOVE_URL_ARR);

		imgArr = imgArr.concat(pub.config.HERO_STAND_URL_ARR);

		imgArr = imgArr.concat(pub.config.BOSS_DEAD_URL_ARR);

		var load = new l.load({

			load :$('#load')[0],

			imageList : imgArr,

			loading : true,

			success :result
		});


		load.init();
	}

	//初始化
	function init(){

		pub.forbTouch();

		window.addEventListener("orientationchange", onOrientation, false);

		if(firstFlag){

			initGame();
			firstFlag = false;
		}
	}

	loadImg(init);

	// goPcUrl();

	pub.share();

}); 