module.exports = function () {
	return {
		restrict: 'C',
		scope:true,
		link: (scope, $el, attrs) => {
			console.warn('carousel gallery link')
			//var $currentSlide, $slidesNav;
			//
			//$currentSlide = $(currentSlideContainerSelector);
			//
			//if ($currentSlide.length) {
			//	$currentSlide.slick({
			//		slidesToShow: 1,
			//		slidesToScroll: 1,
			//		arrows: true,
			//		fade: true,
			//		asNavFor: sliderNavContainerSelector
			//	});
			//}
			//
			//$slidesNav = $(sliderNavContainerSelector);
			//
			//if ($slidesNav.length) {
			//	$slidesNav.slick({
			//		//slidesToShow: 3,
			//		//slidesToScroll: 1,
			//		//asNavFor: currentSlideContainerSelector,
			//		//dots: true,
			//		//centerMode: true,
			//		//focusOnSelect: true,
			//		asNavFor: currentSlideContainerSelector,
			//		dots: true,
			//		centerMode: true,
			//		focusOnSelect: true,
			//		slidesToShow: 7,
			//		slidesToScroll: 1,
			//		speed: 300,
			//		swipeToSlide: true,
			//		respondTo: 'min',
			//		//mobileFirst: true,
			//		//responsive: [
			//		//	{
			//		//		breakpoint: 1024,
			//		//		settings: {
			//		//			slidesToShow: 8,
			//		//			slidesToScroll: 1
			//		//		}
			//		//	}, {
			//		//		breakpoint: 770,
			//		//		settings: {
			//		//			slidesToShow: 6,
			//		//			slidesToScroll: 1
			//		//		}
			//		//	}, {
			//		//		breakpoint: 480,
			//		//		settings: {
			//		//			slidesToShow: 4,
			//		//			slidesToScroll: 1
			//		//		}
			//		//	}, {
			//		//		breakpoint: 320,
			//		//		settings: {
			//		//			slidesToShow: 2,
			//		//			slidesToScroll: 1
			//		//		}
			//		//	}
			//		//],
			//	});
			//}
		}
	}
}