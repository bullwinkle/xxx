module.exports = function () { return function () {
	console.warn('_initFullGallery')
	var currentSlideContainerSelector = '.ui-images-gallery .current-slide-container ul'
	var sliderNavContainerSelector = '.ui-images-gallery .slides-container ul'
	var sliderControlsContainerSelector = '.ui-images-gallery .controls'

	var $currentSlide, $slidesNav;

	$currentSlide = $(currentSlideContainerSelector);

	if ($currentSlide.length) {
		$currentSlide.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			//fade: true,
			swipeToSlide: true,
			speed: 300,
			asNavFor: sliderNavContainerSelector
		});
	}

	$slidesNav = $(sliderNavContainerSelector);

	if ($slidesNav.length) {
		$slidesNav.slick({
			//slidesToShow: 3,
			//slidesToScroll: 1,
			//asNavFor: currentSlideContainerSelector,
			//dots: true,
			//centerMode: true,
			//focusOnSelect: true,
			asNavFor: currentSlideContainerSelector,
			//dots: true,
			centerMode: true,
			focusOnSelect: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 300,
			swipeToSlide: true,
			respondTo: 'min',
			//mobileFirst: true,
			//responsive: [
			//	{
			//		breakpoint: 1024,
			//		settings: {
			//			slidesToShow: 8,
			//			slidesToScroll: 1
			//		}
			//	}, {
			//		breakpoint: 770,
			//		settings: {
			//			slidesToShow: 6,
			//			slidesToScroll: 1
			//		}
			//	}, {
			//		breakpoint: 480,
			//		settings: {
			//			slidesToShow: 4,
			//			slidesToScroll: 1
			//		}
			//	}, {
			//		breakpoint: 320,
			//		settings: {
			//			slidesToShow: 2,
			//			slidesToScroll: 1
			//		}
			//	}
			//],
		});
	}
}}