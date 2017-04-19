/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	/**
	 * StackFx: The parent class.
	 */
	function StackFx(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.stack = this.DOM.el.querySelector('.stack');
		this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
		this.totalItems = this.DOM.stackItems.length;
		this.DOM.img = this.DOM.stack.querySelector('.stack__figure > .stack__img');
		this.DOM.caption = this.DOM.el.querySelector('.grid__item-caption');
		this.DOM.title = this.DOM.caption.querySelector('.grid__item-title');
		this.DOM.columns = {left: this.DOM.caption.querySelector('.column--left'), right: this.DOM.caption.querySelector('.column--right')};
	}

	StackFx.prototype._removeAnimeTargets = function() {
		anime.remove(this.DOM.stackItems);
		anime.remove(this.DOM.img);
		anime.remove(this.DOM.title);
		anime.remove(this.DOM.columns.left);
		anime.remove(this.DOM.columns.right);
	};


	/************************************************************************
	 * RigelFx.
	 ************************************************************************/
	function RigelFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	RigelFx.prototype = Object.create(StackFx.prototype);
	RigelFx.prototype.constructor = RigelFx;

	RigelFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	RigelFx.prototype._in = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			translateZ: {
				value: function(target, index) {
					return index*10;
				},
				duration: 800,
				easing: 'easeOutExpo',
				delay: 200
			},
			opacity: {
				value: function(target, index, cnt) {
					return index !== cnt - 1 ? [0,0.1*index+0.1] : 1
				},
				duration: 1,
				easing: 'linear',
				delay: 200
			},
			translateY: [
				{ 
					value: function(target, index) {
						return -1*index*10;
					}, 
					duration: 800, 
					delay: 200, 
					elasticity: 300 
				},
			],
			scaleY: [
				{ 
					value: 0.8, 
					duration: 200, 
					easing: 'easeOutExpo' 
				},
				{ 
					value: 1, 
					duration: 800, 
					elasticity: 300 
				}
			],
			scaleX: [
				{ 
					value: 1.1, 
					duration: 200, 
					easing: 'easeOutExpo' 
				},
				{ 
					value: 1, 
					duration: 800, 
					elasticity: 300 
				}
			]
		});

		anime({
			targets: this.DOM.img,
			duration: 900,
			easing: 'easeOutExpo',
			delay: 200,
			scale: 0.7
		});

		anime({
			targets: this.DOM.title,
			translateY: {
				value: [200,0], 
				duration: 800, 
				easing: 'easeOutExpo', 
			},
			opacity: {
				value: [0,1], 
				duration: 400, 
				delay: 200,
				easing: 'linear'
			}
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			translateY: [
				{
					value: [60,0],
					duration: 800, 
					easing: 'easeOutExpo', 
					delay: 200
				}
			],
			opacity: [
				{value: [0,0], duration: 1, easing: 'linear'},
				{value: 1, delay: 300, duration: 400, easing: 'linear'}
			]
		});
	};

	RigelFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 800,
			easing: 'easeOutElastic',
			translateZ: 0,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			},
			translateY: 0
		});

		anime({
			targets: this.DOM.img,
			duration: 800,
			easing: 'easeOutElastic',
			scale: 1
		});

		anime({
			targets: this.DOM.title,
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});

		anime({
			targets: [this.DOM.columns.left, this.DOM.columns.right],
			duration: 800,
			easing: 'easeOutExpo',
			translateY: 0,
			opacity: 1
		});
	};

	window.RigelFx = RigelFx;
	
})(window);
