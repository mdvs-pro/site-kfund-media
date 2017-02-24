jQuery(document).ready(function ($) {
	initSliders();
});

jQuery(window).load(function () {
	mobileNav.init('.header__menu');
});

var mobileNav = {
	className: '.js_mobile-nav',
	mobileMenuClassName: '.mobile-nav__menu',
	activeClass: 'open',
	init: function (mainMenuClassName) {
		if (!$(this.mobileMenuClassName).children().length) {
			$(mainMenuClassName).children().clone().prependTo(this.mobileMenuClassName);
		}

		$(document).on('click', '.burger', function () {
			mobileNav.toggle();
		});
	},
	open: function () {
		$(this.className).addClass(this.activeClass);
	},
	close: function () {
		$(this.className).removeClass(this.activeClass);
	},
	toggle: function () {
		$(this.className).hasClass(this.activeClass) ? this.close() : this.open();
	}
};

function initSliders(){
	$('.js_ideas__slider').owlCarousel({
		margin:40,
		nav:true,
		stagePadding:40,
		loop: false,
		mouseDrag :false,
		touchDrag: false,
		navText:['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
		responsive:{
			0:{
				items:1
			},
			800:{
				items:2
			},
			1200:{
				items: 3
			}
		}
	});
}

