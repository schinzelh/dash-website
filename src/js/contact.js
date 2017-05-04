;(function ($) {
	'use strict';
	$(document).ready(function () {
		$('.reset').on('click', function () {
			var name = $('#contact_name').val(),
				email = $('#contact_email').val(),
				category = $('#contact_category').val(),
				message = $('#contact_message').val();

			console.log(name, email, category, message);
			$(this).closest('form').find('input[type=text], textarea').val('');
			$('#msg_sent').css('display', 'inline-block');
			$('#msg_sent').fadeOut(3000);
		});
	});
}(jQuery));


