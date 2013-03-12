seajs.config({
  alias: {
    'jquery': 'common/jquery-1.9.1.min.js'
  },
  // Add plugins
  plugins: ['shim'],

  // Configure shim for non-CMD modules
  shim: {
    'jquery': {
      exports: 'jQuery'
    }
  },
  debug: true
});;define(function(require) {
	var $ = require('jquery');
	var category = require('./category');
	var lazyload = require('./lazyload');
	lazyload({
		elem : $('.main img')
	});
	var fimg = require('./fimg');
	new fimg({
		target : $('.main-promo'),
		time : 5000
	});
	var quo = require('./quotation');
});
;define(function(require,exports,module){
	var $ = require('jquery');

	/* 分类导航 */
	$(".categories .parent").hover(function() {
		$(this).addClass("hover");
		$(this).find('.cate-con i').addClass('sh');
		var $subnavHeight = $(this).find(".subnav").height() + 22;
		var $ptop = $(this).scrollTop() - 1;
		if ($.support.boxModel) {
			$ptop = $ptop + 2
		};
		var $stop = ($subnavHeight - $(this).height()) / 2;
		var $ttop = $stop >= $ptop ? $ptop : $stop;
		console.log($ptop);
		var $top = $subnavHeight >= $(".categories").height() ? $ptop : $ttop;
		var $left = 184;
		$(this).find(".subnav").css({
			left : $left + "px",
			top : -$top + "px"
		});
		$(this).find(".subnav").fadeIn("fast");
	},
	function() {
		$(this).removeClass("hover");
		$(this).find('.cate-con i').removeClass('sh');
		var $left = -9999;
		$(this).find(".subnav").fadeOut("fast").css("left",$left + "px");
	});
	//module.exports = Category;
});;define(function(require,exports,module){
	var $ = require('jquery');

	var fimg = function(o){
		this.target = o.target;
		this.t = 0;
		this.n = 0;
		this.count = this.target.find('ul li').length;
		this.timer =o.time || 3000;
		this.init();
	}
	fimg.prototype = {
		init:function(){
			var self = this;
			var trg = self.target;
			// bind click
			trg.find("ol li").bind('click',function(){
				var i = trg.find("ol li").index($(this));
				self.n = i;
				if (i >= self.count) return;
				trg.find('ul li').filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
		  		$(this).addClass('curr').siblings().removeClass();
			});
			// setInterval start
			self.t = setInterval(function(){
				self.showAuto()
			}, self.timer);
			//hover stop
			trg.hover(function(){
				clearInterval(self.t)
			},function(){
				self.t = setInterval(function(){
					self.showAuto()
				}, self.timer);
			});
		},
		showAuto:function(){
			var self = this;
			var trg = self.target;
			self.n = self.n >= (self.count - 1) ? 0 : ++self.n;
	 		trg.find("ol li").eq(self.n).trigger('click');
		}
	}
	module.exports = fimg;
});; define(function(require,exports,module){
    var $ = require('jquery');
    /*
    * @author:johnqing
    * @version : 0.1
    * @gitbub : https://github.com/Johnqing/lazyload/edit/master/layload.js
    */
    var lazyload = function(options){
        var config = {
                elem        :   'lazyload',
                original    :   'original', // String 存放图片真实地址的属性
                container   :   document,   // DOM    Selector 默认的容器为document，可自定义容器
                event       :   'scroll',   // String 触发事件类型，默认为window.onscroll事件                
                fadeIn      :   true    
        };      
        if(options) {
            $.extend(config, options);
        }
        var imgNodes = config.elem,
        imgArray = [],
        original = config.original,
        container = config.container['body'] || config.container['documentElement'],
        event = config.event,
        dataName = 'imglazyload_offset';        
        
        //遍历获取图片集合
        for(var j=0;j<imgNodes.length;j++){
            var oE = imgNodes.eq(j);
            if(oE){
                for(var t=0;t<oE.length;t++){
                    imgArray.push(oE.eq(t));    
                }    
            }    
        }
        //图片加载开始
        var loader = function( triggerElem, event ){
            var i = 0,ObjPoint, elem, lazySrc,
            top = (document.body.scrollTop || document.documentElement.scrollTop),height = document.documentElement.clientHeight;
            
            for( ; i < imgArray.length; i++ ){    
                elem = imgArray[i];
                if(elem.hasClass('imglazyload_offset')){continue;};
                lazySrc = elem.attr( config.original );            
                if( !lazySrc || elem.attr('src') === lazySrc ){
                    continue;
                }
                //当前图片的绝对位置
                ObjPoint = elem.offset().top; 
                if(ObjPoint>=top&&ObjPoint<=(top+height)){
                    // 加载图片
                    elem.attr('src', lazySrc);
                    elem.addClass(dataName) ;
                    //是否增加透明度变化
                    if(!config.fadeIn) return ;
                    elem.fadeIn();
                }
            }        
        };
        
        var fire = function( e ){
            loader( this, e.type );
        };
        // 绑定事件
        $(window).bind(event,fire);
        $(window).bind('resize',fire);
        // 初始化
        loader();
        return this;    
    };

    module.exports = lazyload;
 });
