;(function($) {
	$(document).ready(function() {
		rawCodeAreas = $('.js-raw-code');
		rawCodeAreas.each(function(){
			$(this).height(5);
			$(this).height($(this).prop('scrollHeight'));
		});
		$('.copy-button').on('click',function(){
			var rawCode = $(this).parent().find('.js-raw-code');
			rawCode.select();
			document.execCommand('copy');
		});
	});
}(jQuery));
