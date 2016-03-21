import 'angular-material/angular-material.css';
import angular from 'angular';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import _ from 'lodash';

angular
	.module('vendor', [
		ngAria,
		ngAnimate,
		ngMaterial,
		ngMessages,
		uiRouter
	])
	.constant('_', _);
