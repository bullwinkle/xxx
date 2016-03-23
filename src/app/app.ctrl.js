// root scope controller
module.exports = function ($rootScope, $location, $state, $timeout, Mail) {
	"ngInject";

	var ninja = $rootScope;

	var $ovrl,t;
	var $body = $('body')

	ninja.globalSearchQuery = ninja.globalSearchQuery || (ninja.globalSearchQuery = "");
	ninja.submitGlobalSearch = (searchQuery) => {
		$state.go(`app.search`, {s: searchQuery})
	}
	ninja.submitContactModal = (form) => {
		console.warn('ninja.submitContactModal',form)
		var mail = {
			subject: `Вопрос${ form.name.$modelValue ? ` от ${form.name.$modelValue}` : '' }`,
			content: {
				email: form.email.$modelValue,
				name: form.name.$modelValue,
				phone: form.phone.$modelValue,
				question: form.question.$modelValue,
			},
			templateType: 'contact'
		}
		Mail.save(mail).$promise
			.then((res) => {
				$timeout(ninja.resetContactForm, 1000)
			})
			.catch((err)=> {
				console.warn(err)
			})
	}
	//ninja.showModal = () => {
	//	$ovrl || ($ovrl=$('.l-global-overlay'))
	//	$ovrl
	//		.addClass('is-visible')
	//	$body.addClass('no-scroll')
	//}
	//ninja.closeModal = (e) => {
	//	e.stopPropagation()
	//	$ovrl || ($ovrl=$('.l-global-overlay'))
	//	$ovrl
	//		.removeClass('is-visible')
	//	t = Math.max.apply(Math,$ovrl.css('transition-duration').split(',').map( (el,i)=>parseFloat(el) ))
	//	$body.removeClass('no-scroll')
	//}
	ninja.resetContactForm = () => {
		console.warn('resetContactForm',ninja.contactForm);
		ninja.contactForm.question.$setViewValue('');
		ninja.contactForm.question.$render();
		$timeout(() => {
			ninja.contactForm.$setPristine();
		})
	}
	return ninja;
};
