
define([], function() {

	var config = { };

	config.PC_URL = "http://game.qq.com/happy2014/index.shtml";

	config.HERO_ARROW_SRC = 'images/scene1_hero.png';

	config.HERO_NOWEAPEON_SRC = 'images/scene2_hero.png';

	config.HERO_SCENE3_SRC = 'images/scene3_hero.png';

	config.HERO_SHOT_SRC = 'images/shot_2.png';

	config.SCENE3_JUMP = 'images/scene3_jump.png';

	config.SCENE5_TCGAME_URL = 'http://mp.weixin.qq.com/s?__biz=MjcwNjgyMjY0MA==&mid=200715750&idx=1&sn=53010f684adbca629e6b41b66500c924#rd';

	config.HERO_MOVE_URL_ARR = ['images/move/0.png','images/move/1.png','images/move/2.png','images/move/3.png','images/move/4.png'];

	config.HERO_STAND_URL_ARR = ['images/stand/0.png','images/stand/1.png','images/stand/2.png','images/stand/3.png','images/stand/4.png'];

	config.BOSS_DEAD_URL_ARR = ['images/boss/0.png','images/boss/1.png','images/boss/2.png','images/boss/3.png','images/boss/4.png','images/boss/5.png'];

	var share = {

		IMGURL : "images/share.jpg",

		TITLE  : "神之浩劫—众星齐聚，3D颠覆MOBA世界",

		DESC   : "暴打魔王，拯救小苍，11月7日内测开启！"
	};

	function isPC(){
		
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}

	function forbTouch(){

		document.body.addEventListener('touchmove', function(e){

			e.preventDefault();

		},false);
	}

	function wxShare(confing){
	
		var confing=confing||{},
			imgUrl=confing.imgUrl||share.IMGURL,
			url=confing.url||location.href,
			title=confing.title||share.TITLE,
			desc=confing.desc||share.DESC;
		
		var dataForWeixin={
		   appId:"",
		   MsgImg:imgUrl,
		   TLImg:imgUrl,
		   url:url,
		   title:title,
		   desc:desc,
		   timeline:share.DESC,
		   timelineDesc:share.DESC,
		   fakeid:"",
		   callback:function(){}
		};
		(function(){
		   var onBridgeReady=function(){
		   WeixinJSBridge.on('menu:share:appmessage', function(argv){
		      WeixinJSBridge.invoke('sendAppMessage',{
		         "appid":dataForWeixin.appId,
		         "img_url":dataForWeixin.MsgImg,
		         "img_width":"120",
		         "img_height":"120",
		         "link":dataForWeixin.url,
		         "desc":dataForWeixin.desc,
		         "title":dataForWeixin.title
		      }, function(res){(dataForWeixin.callback)();});
		   });
		   WeixinJSBridge.on('menu:share:timeline', function(argv){
		      (dataForWeixin.callback)();
		      WeixinJSBridge.invoke('shareTimeline',{
		         "img_url":dataForWeixin.TLImg,
		         "img_width":"120",
		         "img_height":"120",
		         "link":dataForWeixin.url,
		         "desc":dataForWeixin.timelineDesc,
		         "title":dataForWeixin.timeline
		      }, function(res){});
		   });
		   WeixinJSBridge.on('menu:share:weibo', function(argv){
		      WeixinJSBridge.invoke('shareWeibo',{
		         "content":dataForWeixin.title,
		         "url":dataForWeixin.url
		      }, function(res){(dataForWeixin.callback)();});
		   });
		   WeixinJSBridge.on('menu:share:facebook', function(argv){
		      (dataForWeixin.callback)();
		      WeixinJSBridge.invoke('shareFB',{
		         "img_url":dataForWeixin.TLImg,
		         "img_width":"120",
		         "img_height":"120",
		         "link":dataForWeixin.url,
		         "desc":dataForWeixin.desc,
		         "title":dataForWeixin.title
		      }, function(res){});
		   });
		   //WeixinJSBridge.call('hideToolbar');
		};
		if(document.addEventListener){
		   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		}else if(document.attachEvent){
		   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
		   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
		}
		})();
	}


	return{

		isPC : isPC,

		config : config,

		forbTouch :forbTouch,

		share : wxShare
	}

});