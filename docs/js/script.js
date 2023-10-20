console.clear();
/* 발견되면 활성화시키는 라이브러리 시작 */
function ActiveOnVisible__init() {
  $('.active-on-visible').each(function(index, node) {
    let $node = $(node);

    let onFuncName = $node.attr('data-active-on-visible-on-func-name');
    let offFuncName = $node.attr('data-active-on-visible-off-func-name');

    $node.data('data-active-on-visible-on-func-name', onFuncName);
    $node.data('data-active-on-visible-off-func-name', offFuncName);
  });

  $(window).resize(_.debounce(ActiveOnVisible__initOffset, 500));
  ActiveOnVisible__initOffset();

  $(window).scroll(_.debounce(ActiveOnVisible__checkAndActive, 50));
  ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
  var windowHeight = $(window).height();

  $('.active-on-visible:not(.actived)').each(function(index, node) {
    let $node = $(node);

    let offsetTop = $node.offset().top;

    let matrix = $node.css('transform').replace(/[^0-9\-.,]/g, '').split(',')
    let translateX = matrix[12] || matrix[4];
    let translateY = matrix[13] || matrix[5];

    if ( translateY ) {
      offsetTop -= translateY;
    }

    $node.attr('data-active-on-visible-offsetTop', offsetTop);
    $node.data('data-active-on-visible-offsetTop', offsetTop);

    if ( !$node.attr('data-active-on-visible-diff-y') ) {
      $node.attr('data-active-on-visible-diff-y', '0');
    }

    if ( !$node.attr('data-active-on-visible-delay') ) {
      $node.attr('data-active-on-visible-delay', '0');
    }

    let diffY = $node.attr('data-active-on-visible-diff-y');
    let delay = $node.attr('data-active-on-visible-delay');

    if ( diffY.substr(-2, 2) == 'vh' ) {
      diffY = parseInt(diffY);

      diffY = windowHeight * (diffY / 100);
    }
    else if ( diffY.substr(-1, 1) == '%' ) {
      diffY = parseInt(diffY);

      diffY = $node.height() * (diffY / 100);
    }
    else {
      diffY = parseInt(diffY);
    }

    $node.attr('data-active-on-visible-diff-y-real', diffY);
    $node.data('data-active-on-visible-diff-y', diffY);
    $node.data('data-active-on-visible-delay', delay);
  });

  ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() { 
  $('.active-on-visible:not(.actived)').each(function(index, node) {
    let $node = $(node);

    let offsetTop = $node.data('data-active-on-visible-offsetTop') * 1;
    let diffY = parseInt($node.data('data-active-on-visible-diff-y'));
    let delay = parseInt($node.data('data-active-on-visible-delay'));

    let onFuncName = $node.data('data-active-on-visible-on-func-name');
    let offFuncName = $node.data('data-active-on-visible-off-func-name');

    let scrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();
    let nodeHeight = $node.height();

    if ( scrollTop + windowHeight + diffY > offsetTop ) {
      setTimeout(function() {
        if ( $node.hasClass('active') == false ) {
          $node.addClass('active');

          if ( $node.hasClass('can-active-once') ) {
            $node.addClass('actived');
          }

          if ( window[onFuncName] ) {
            window[onFuncName]($node);
          }
        }
      }, delay);
    }
    else {
      if ( $node.hasClass('active') ) {
        $node.removeClass('active');

        if ( window[offFuncName] ) {
          window[offFuncName]($node);
        }
      }
    }
  });
}

$(function() {
  ActiveOnVisible__init();
})
/* 발견되면 활성화시키는 라이브러리 끝 */
// pc 탑바 초기화
function PcTopBar__init() {
	$('.pc-top-bar__btn-show-side-bar').click(function (){
		PcSideBar__show();
	});
}
// pc 사이드바 초기화

function PcsideBar__init() {
	$('.pc-side-bar, .pc-side-bar__btn-close').click(function (){
		PcSideBar__hide(); // 사이드바 숨김
		PcMenuBox1__hide(); // 메뉴박스의 active 붙은 후손들 제거
	});


	$('.pc-side-bar__content').click(function () {
		return false;
	});
}

// pc 사이드바 노출

function PcSideBar__show() {
	$('.pc-side-bar').addClass('active');
	$('html').addClass('pc-side-bar-actived');
}

// pc 사이드바 숨김

function PcSideBar__hide() {
	$('.pc-side-bar').removeClass('active');
	$('html').removeClass('pc-side-bar-actived');
}

// pc 사이드바 메뉴 구현 시작

function PcMenuBox1__init() {

	$('.pc-menu-box-1 ul > li').click(function (){
		let $this = $(this);

		$this.siblings('.active').find(' ul')
		$this.siblings('.active').removeClass('active');

		if($this.hasClass('active')){
			$this.find('.active').removeClass('active');
			$this.removeClass('active');
		}
		else{
			$this.addClass('active');
		}
	});
	$('.pc-menu-box-1 ul').click(function (){
		return false;
	});
}

function PcMenuBox1__hide() {
	$('.pc-menu-box-1 .active').removeClass('active');
}


let pcMenuBox2ndPrevBtn = $('.pc-menu-box-1 > ul > li > ul > li > .prev-menu-page');
let pcMenuBox3ndPrevBtn = $('.pc-menu-box-1 > ul > li > ul > li > ul > li > .prev-menu-page');

pcMenuBox2ndPrevBtn.click(function() {
	$('.pc-menu-box-1 > ul > li').removeClass('active');
});

pcMenuBox3ndPrevBtn.click(function() {
	$('.pc-menu-box-1 > ul > li > ul > li').removeClass('active');
});

// pc 사이드바 메뉴 구현 끝

PcMenuBox1__init();
PcTopBar__init();
PcsideBar__init();


// mobile 탑바 초기화
function mobileTopBar__init() {
	$('.mobile-top-bar__btn-show-side-bar').click(function (){
		mobileSideBar__show();
	});
}
// mobile 사이드바 초기화

function mobilesideBar__init() {
	$('.mobile-side-bar, .mobile-side-bar__btn-close').click(function (){
		mobileSideBar__hide(); // 사이드바 숨김
		mobileMenuBox1__hide(); // 메뉴박스의 active 붙은 후손들 제거
	});


	$('.mobile-side-bar__content').click(function () {
		return false;
	});
}

//mobile 사이드바 노출

function mobileSideBar__show() {
	$('.mobile-side-bar').addClass('active');
	$('html').addClass('mobile-side-bar-actived');
}

// mobile 사이드바 숨김

function mobileSideBar__hide() {
	$('.mobile-side-bar').removeClass('active');
	$('html').removeClass('mobile-side-bar-actived');
}

// mobile 사이드바 메뉴 구현 시작

function mobileMenuBox1__init() {

	$('.mobile-menu-box-1 ul > li').click(function (){
		let $this = $(this);

		$this.siblings('.active').find(' ul')
		$this.siblings('.active').removeClass('active');

		if($this.hasClass('active')){
			$this.find('.active').removeClass('active');
			$this.removeClass('active');
		}
		else{
			$this.addClass('active');
		}
	});
	$('.mobile-menu-box-1 ul').click(function (){
		return false;
	});
}

function mobileMenuBox1__hide() {
	$('.mobile-menu-box-1 .active').removeClass('active');
}


let mobileMenuBox2ndPrevBtn = $('.mobile-menu-box-1 > ul > li > ul > li > .prev-menu-page');
let mobileMenuBox3ndPrevBtn = $('.mobile-menu-box-1 > ul > li > ul > li > ul > li > .prev-menu-page');

mobileMenuBox2ndPrevBtn.click(function() {
	$('.mobile-menu-box-1 > ul > li').removeClass('active');
});

mobileMenuBox3ndPrevBtn.click(function() {
	console.log('이전 2');
	$('.mobile-menu-box-1 > ul > li > ul > li').removeClass('active');
});

// mobile 사이드바 메뉴 구현 끝

mobileMenuBox1__init();
mobileTopBar__init();
mobilesideBar__init();

//pc 스와이퍼
function pcCollectionSwiper__init (){
	const swiper1 = new Swiper(".pc-swiper .swipeslide__slide.swiper-container", {
	slidesPerView: "auto",
	loop: true,
	spaceBetween: 150,
	centeredSlides: true,
	loopedSlides: 3,
	pagination: {
		// el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
			nextEl: '.slide__list__btn-box .slide__list__btn-next',
			prevEl: '.slide__list__btn-box .slide__list__btn-prev',
		},
});
	var currentSlide = $(swiper1.slides[swiper1.activeIndex]);
var prevSlide;
var nextSlide;
currentSlide.removeClass("off");

swiper1.on("slideChange", function () {
	currentSlide = $(swiper1.slides[swiper1.activeIndex]);
	prevSlide = swiper1.slides[swiper1.activeIndex - 1];
	nextSlide = swiper1.slides[swiper1.activeIndex + 1];
	currentSlide.removeClass("off");

	if (!$(nextSlide).hasClass("off") || !$(prevSlide).hasClass("off")) {
		$(nextSlide).addClass("off");
		$(prevSlide).addClass("off");
	} else {
		$(currentSlide).removeClass("off");
	}
});

}
pcCollectionSwiper__init();



//모바일 스와이퍼
function mobileCollectionSwiper__init() {
	const swiper2 = new Swiper(".mobile-swiper .swipeslide__slide.swiper-container", {
	slidesPerView: "auto",
	loop: true,
	spaceBetween: 20,
	centeredSlides: true,
	loopedSlides: 2,
	pagination: {
		// el: ".swiper-pagination",
		clickable: true
	}
});
	var currentSlide = $(swiper2.slides[swiper2.activeIndex]);
var prevSlide;
var nextSlide;
currentSlide.removeClass("off");

swiper2.on("slideChange", function () {
	currentSlide = $(swiper2.slides[swiper2.activeIndex]);
	prevSlide = swiper2.slides[swiper2.activeIndex - 1];
	nextSlide = swiper2.slides[swiper2.activeIndex + 1];
	currentSlide.removeClass("off");

	if (!$(nextSlide).hasClass("off") || !$(prevSlide).hasClass("off")) {
		$(nextSlide).addClass("off");
		$(prevSlide).addClass("off");
	} else {
		$(currentSlide).removeClass("off");
	}
});

}
mobileCollectionSwiper__init();
AOS.init({
  duration: 1000
});
