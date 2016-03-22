// Vendor styles
//require('./vendor.styl')
// JS vendors
var ENV = ENV;

import jQuery from 'jquery';
window.$ = jQuery;
import 'slick-carousel';

import _ from 'lodash';
import moment from 'moment/moment';
window.ENV = ENV;
window._ = _;
window.moment = moment

// Native angular vendors
import angular from 'angular';
import 'angular-i18n/angular-locale_ru-ru.js';
import 'angular-aria';
import 'angular-touch';
import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-cache';

// 3rd party angular vendors
import 'angular-ui-router/release/angular-ui-router';
import 'angular-ui-bootstrap';
import 'angular-ui-notification';
//import 'angular-carousel'
import 'ngstorage';

// Main vendor module
angular.module('vendor', [
	'ngAria',
	'ngTouch',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngMessages',
	'ngStorage',
	'ui.router',
	'ui.bootstrap',
	'angular-cache',
	'ui-notification'
	//'angular-carousel'
]);


// Fastclick initialization
angular
	.module('vendor')
	.config( ($localStorageProvider) => {
		"ngInject";
		$localStorageProvider.setKeyPrefix(`ninja's workshop: `)
	})

	.run( () => {
		"ngInject";
		var FastClick = require('fastclick/lib/fastclick');
		FastClick.attach(document.body);
	});