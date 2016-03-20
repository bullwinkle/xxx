module.exports = function () { return function initSlickRow() {
	console.warn('initSlickRow()')
	var rowCarousel = $('.gallery');

	if (rowCarousel.length) {
		rowCarousel.slick({
			slidesToShow: 8,
			slidesToScroll: 8,
			speed: 300,
			swipeToSlide: true,
			respondTo: 'min',
			autoplay: true,
			autoplaySpeed: 2000,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 8,
						slidesToScroll: 8
					}
				}, {
					breakpoint: 770,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}, {
					breakpoint: 320,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}
			]
		});
	}
}}