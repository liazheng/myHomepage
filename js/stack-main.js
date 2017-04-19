'use strict';
(function() {

	[].slice.call(document.querySelectorAll('.grid--effect-rigel > .grid__item')).forEach(function(stackEl) {
		new RigelFx(stackEl);
	});
	
})();

