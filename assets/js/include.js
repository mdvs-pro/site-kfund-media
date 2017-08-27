jQuery(document).ready(function ($) {

	initSliders();
	initSingleSliders();
	initSearch();

	initSocialSidebar();
	initFormFooter();

	// var scene = document.getElementById('scene');
	// if (scene !== null) var parallax = new Parallax(scene);

});

jQuery(window).load(function () {
	mobileNav.init('.footer-menu');
	parallaxInterview();
	parallaxWonder();
});

var appTech = {
	checkScreenWidth : function(size, direction){
		var result = false;
		var breakpoints = {
			'xs': 0,
	    'sm': 576,
	    'md': 768,
	    'lg': 992,
	    'xl': 1200
		}

		if (direction === 'max') {
			// > 767px
			result = $(document).width() < breakpoints[size];
		} else if (direction === 'min') {
			// < 768px
			result = $(document).width() >= breakpoints[size]
		}

		return result;
	},
	checkHeaderHeight: function(){
		var headerHeight = $('.top-panel').outerHeight(true) + $('.header').outerHeight(true);
		if ($('body').hasClass('admin-bar')) headerHeight += $('#wpadminbar').outerHeight();
		return headerHeight;
	}
}

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

function initSingleSliders(){
	$('.js_single-slider').owlCarousel({
		margin:0,
		nav:true,
		stagePadding:0,
		loop: true,
		mouseDrag :false,
		touchDrag: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		navText:['<i class="kf-icon kf-icon-left-open-big" aria-hidden="true"></i>','<i class="kf-icon kf-icon-right-open-big" aria-hidden="true"></i>'],
		responsive:{
			0:{
				items:1
			},
			800:{
				items:1
			},
			1200:{
				items: 1
			}
		}
	});
}

function initSliders(){
	$('.js_ideas__slider').owlCarousel({
		margin:0,
		nav:true,
		stagePadding:0,
		loop: true,
		mouseDrag :false,
		touchDrag: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		navText:['<i class="kf-icon kf-icon-left-open-big" aria-hidden="true"></i>','<i class="kf-icon kf-icon-right-open-big" aria-hidden="true"></i>'],
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

function initSearch(){
	$('.header__search').click( function(){
	  $('body').addClass('search-active');
	  $('.input-search').focus();
	});

	$('.search__close').click( function(){
	  $('body').removeClass('search-active');
	});
}

function InvalidMsg(textbox) {

    if (textbox.value == '') {
        textbox.setCustomValidity(textbox.getAttribute('title'));
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity(textbox.getAttribute('title'));
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function customValid() {
	var _this = event.target;
	var errorClass = 'form__input--error';

	_this.setCustomValidity(' ');
	$(_this).addClass(errorClass);

	return true;
}

function initFormFooter() {
	$('.js__form-send').on('submit', formAjax);
}

function formAjax() {
	event.preventDefault();

	var form = this;
	var data = $(form).serialize();
	var pathAction = $(form).attr('action');

  $.ajax({
    url: pathAction,
    data: data,
    type: 'POST',
    success: function (dataofconfirm) {
        $(form).siblings('.form__text--success').show('slow');
        $(form).find('input:not([type="submit"])').each(function(){
        	$(this).removeClass('form__input--error');
        	$(this).val('');
        })
    }
  });
}

function initSocialSidebar() {
	var SOCIAL_CLASS = '.js-socside';
	var SOCIAL_ART_CLASS = SOCIAL_CLASS + '-article';
	var SOCIAL_ACTIVE_CLASS = 'js-socside-show';
	var SOCIAL_ALWAYS_SHOW = SOCIAL_CLASS + '-always-show';
	var isAlwaysShow = false;
	var $prlx = $('body').find('.prlx');

	if($prlx.length) {
		$(SOCIAL_CLASS).insertBefore( $prlx );
	}

	if ($(SOCIAL_ALWAYS_SHOW).length) { isAlwaysShow = true; }

	if (!$(SOCIAL_CLASS).length) return;

	// start showing when we see the article
	var $SOCIAL_ART_OBJ = $(SOCIAL_ART_CLASS);

	if (isAlwaysShow) {
		$(SOCIAL_CLASS).addClass(SOCIAL_ACTIVE_CLASS);
	} else {
		window.addEventListener("scroll", function(event) {

		  if (window.scrollY > $(SOCIAL_ART_CLASS).offset().top) {
		  	if (!$(SOCIAL_CLASS).hasClass(SOCIAL_ACTIVE_CLASS)) {
		  		$(SOCIAL_CLASS).addClass(SOCIAL_ACTIVE_CLASS);
		  	}
		  } else {
		  	if ($(SOCIAL_CLASS).hasClass(SOCIAL_ACTIVE_CLASS)) {
		  		$(SOCIAL_CLASS).removeClass(SOCIAL_ACTIVE_CLASS);
		  	}
		  }
		}, false);
	}
}

function parallaxWonder() {
	// launch only on wonder single page
	if (!$('body').hasClass('post-template-wonder-single')) return;

	if (appTech.checkScreenWidth('md', 'max')) {
		$prlxObj.addClass('mobile');
		return;
	}

	var prlxClass = '.prlx';
	var $prlxObj = $(prlxClass);
	var prlxObj_h;
	var $prlxBody = $(prlxClass + '__body');
	var $prlxContent = $(prlxClass + '__content');
	var prlxTop = $prlxObj.offset().top;
	var prlxOffset;

	setOffset();
	setProp();
	transformBody();

	function setProp() {
		$prlxObj.css({'top': prlxOffset + 'px', 'position' : 'absolute', 'height' : $(window).height() - prlxOffset + 'px'});
		prlxObj_h = $prlxObj.outerHeight( true );
		$prlxBody.css('transform', 'translateY(' + (prlxObj_h) + 'px)');
	}

	function setOffset() {
		prlxOffset = appTech.checkHeaderHeight();
	}

	function transformBody() {
		var topTranformOffset = $(window).scrollTop() - prlxOffset;
    if (topTranformOffset <= 0) topTranformOffset = 0;

		var scrollCoef = topTranformOffset / prlxObj_h;
    var topTranform = scrollCoef*450;

    	if (prlxObj_h - topTranformOffset <= 0) {
    		$prlxBody.css('transform', 'translateY(' + (0) + 'px)');
    	} else {
    		$prlxBody.css('transform', 'translateY(' + (prlxObj_h - topTranformOffset) + 'px)');
				$prlxContent.css('transform', 'translateY(' + (-topTranform) + 'px)');
    	}
	}

	$(window).scroll(function() {
		transformBody();
  });

  window.onresize = function() {
    setProp();
    transformBody();
    setOffset();
	};
}

function parallaxInterview(){
	// launch only on interview page
	if (!$('body').hasClass('post-template-interview-single')) return;

	var blockHeight, imagesCount, imgHeight;
	var $rebuildBlock = $('#js-interview-move-mobile');
	var activeClass = 'mobile-view';

	function initMethods() {
			rebuildPostHeader()
			setHeight();
	}

	initMethods(); //first init
	$rebuildBlock.removeClass('loading');
	$(window).on('resize', initMethods);

	function rebuildPostHeader() {
		var mobileView = appTech.checkScreenWidth('lg', 'max');

		$rebuildBlock.css({'height' : $(window).height() - appTech.checkHeaderHeight()});

		if ( mobileView && !$rebuildBlock.hasClass(activeClass)){
			$rebuildBlock.addClass(activeClass).prependTo('#primary');
		} else if (!mobileView && $rebuildBlock.hasClass(activeClass)){
			$rebuildBlock.removeClass(activeClass).prependTo('.post-body');
		}

		return;
	}

	function checkHeight() {
		blockHeight = $('#main').outerHeight();
		imagesCount = $('.interview__img').length;
		imgHeight = blockHeight / imagesCount;
	}

	function setHeight() {
		checkHeight();

		$('.interview__img').each(function(){
			$(this)
				.css({
					top : $(this).index() * imgHeight + 'px',
					height : imgHeight + 'px'
				})
		})
	}
}