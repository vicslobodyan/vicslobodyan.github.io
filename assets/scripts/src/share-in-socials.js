(function($) {
	'use strict'

	var $icon = $('[data-share-icon]'),
		$socialsList = $('[data-share-socials]');

	$icon.on('click', function() {
		$(this).toggleClass('active');
		$socialsList.toggleClass('open');
	});
})(jQuery);