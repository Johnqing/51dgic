 define(function(require,exports,module){
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
