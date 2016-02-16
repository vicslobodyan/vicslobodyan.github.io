(function($) {
	'use strict'

	var $menu = $('[data-menu]'),
		$menuTrigger = $('[data-menu-toggle]');

	$menuTrigger.on('click', function(e) {
		e.preventDefault();
		$menu.toggleClass('open');
	});
})(jQuery);