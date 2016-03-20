window.__VIEWS = '/assets/views'
window.__FONT = '/assets/fonts'
window.__IMG = '/assets/img'

# Handle broken images, doesn`t need to be in document.ready handler
$('img').on 'error', (e) =>
	$(e.currentTarget)
	.attr "src", "/assets/img/no-image.jpg"
	.addClass 'image-broken'

$ ->
	console.info 'start'

	FastClick.attach(document.body)

	# Highlighting current menu link
	location = _.compact(window.location.pathname.split('/'))[0]
	$currentMenuItem = $(".l-main-navigation-item a[href*='#{location}']")
	if $currentMenuItem.length
		$currentMenuItem
		.parent()
		.addClass('active')
		.siblings()
		.removeClass('active')

	# Initing UI elements, plugins etc...

	# Row carousel
	rowCarousel = $('.ui-carousel .items')
	if rowCarousel.length then rowCarousel.slick
		slidesToShow: 8
		slidesToScroll: 8
		speed: 300
		swipeToSlide: true
		respondTo: 'min'
		#mobileFirst: true
		autoplay: true
		autoplaySpeed: 2000
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 8
					slidesToScroll: 8
				}
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]


	# Carousel Syncing
	currentSlideContainerSelector = '.ui-images-gallery .current-slide-container ul'
	sliderNavContainerSelector = '.ui-images-gallery .slides-container ul'
	sliderControlsContainerSelector = '.ui-images-gallery .controls'

	$currentSlide = $ currentSlideContainerSelector
	if $currentSlide.length then $currentSlide.slick
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: sliderNavContainerSelector

	$slidesNav = $ sliderNavContainerSelector
	if $slidesNav.length then $slidesNav.slick
#		slidesToShow: 3,
#		slidesToScroll: 1,
#		asNavFor: currentSlideContainerSelector,
#		dots: true,
#		centerMode: true,
#		focusOnSelect: true

		asNavFor: currentSlideContainerSelector,
		dots: true,
		centerMode: true,
		focusOnSelect: true
		slidesToShow: 7
		slidesToScroll: 1
		speed: 300
		swipeToSlide: true
		respondTo: 'min'
		#mobileFirst: true
#		responsive: [
#			{
#				breakpoint: 1024,
#				settings: {
#					slidesToShow: 8
#					slidesToScroll: 1
#				}
#			},
#			{
#				breakpoint: 770,
#				settings: {
#					slidesToShow: 6,
#					slidesToScroll: 1
#				}
#			},
#			{
#				breakpoint: 480,
#				settings: {
#					slidesToShow: 4,
#					slidesToScroll: 1
#				}
#			},
#			{
#				breakpoint: 320,
#				settings: {
#					slidesToShow: 2,
#					slidesToScroll: 1
#				}
#			}
#		]

	$sliderControls = $ sliderControlsContainerSelector


	# Load-more button
	$loadMoreButton  = $('.ui-load-more-button')
	if $loadMoreButton.length then $loadMoreButton.on 'click', ->
		$(@).toggleClass('is-loading')