;(function ($) {
	'use strict';
	$(document).ready(function () {
		$('.js-subscribe').on('click',function () {
			$(this).toggleClass('hidden');
			$('.js-mailing-form').toggleClass('hidden');
		});
	});
}(jQuery));
