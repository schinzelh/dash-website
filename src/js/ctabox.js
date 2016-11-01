;(function($) {
	'use strict';

	$(document).ready(function() {

		var $ctaboxes = $('[data-js-ctabox]');

		$ctaboxes.each(function(index, element) {
			var $element = $(element),
				$slider = $element.find('.ctabox__inner'), // TODO
				$slides = $element.find('.ctabox__cta'), // TODO
				sliderOptions = {
					centerMode: true, // ($slides.length % 2 > 0),
					draggable: true,
					touchThreshold: 10,
					variableWidth: true,
					arrows: false, // TODO
					infinite: true
				},

				/**
				 * Make "off-slides" clickable.
				 * Enable navigation by clicking on the next/last image
				 * TODO: Do it without rebinding everthing
				 **/
				bindSlides = function() {
					$slides = $element.find('.ctabox__cta');
					$slides.unbind('click.ctabox')
						.bind('click.ctabox', function(e) {
							var $target = $(e.currentTarget);

							if ($target.hasClass('slick-current') !== true) {
								e.stopPropagation();
								e.preventDefault();
								if ($target.prevAll('.slick-current').length > 0) {
									$slider.slick('slickNext');
								} else {
									$slider.slick('slickPrev');
								}
							}
						});
				};

			// Init Slider
			$slider.slick(sliderOptions);

			if (sliderOptions.centerMode === true) {
				bindSlides();
				$slider.on('beforeChange', bindSlides);
			}
		});

	});

}(jQuery));
