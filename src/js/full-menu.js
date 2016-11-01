;(function($) {

	$(function() {

		var isOpen = false,
			$overlay = $('[data-js-overlay-menu]'),
			$burger = $('[data-js-open-menu]');

		$burger.click(function() {
			isOpen = !isOpen;
			toggleMenu(isOpen);
		});

		$(document).bind(window.mq.event, function() {
			if (isOpen === true && window.mq.query({ from: 'large' })) {
				isOpen = false;
				toggleMenu(isOpen);
			}
		});

		function toggleMenu(state) {
			$burger.toggleClass('is-active', state);
			$overlay.toggleClass('is-open', state);

			if (state) {
				window.noScroll.on();
				$overlay.attr('aria-hidden', 'false');
				$burger.attr('aria-expanded', 'true');
			} else {
				window.noScroll.off();
				$overlay.attr('aria-hidden', 'true');
				$burger.attr('aria-expanded', 'false');
			}
		}

	});

}(jQuery));
