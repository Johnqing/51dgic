define(function(require,exports,module){
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
});