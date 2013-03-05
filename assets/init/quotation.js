define(function(require,exports,module){
	var $ = require('jquery');
	$('#J_SearchBoxToggle .J_MakePoint').click(function(){
		$(this).hide().siblings('a').show();
		if ($(this).hasClass('more-filter')) {
			$('#J_MoreControl').show();
		}else{
			$('#J_MoreControl').hide();
		}
		return false;
	});
});