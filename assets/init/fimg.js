define(function(require,exports,module){
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
});