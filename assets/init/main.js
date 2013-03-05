define(function(require) {
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
