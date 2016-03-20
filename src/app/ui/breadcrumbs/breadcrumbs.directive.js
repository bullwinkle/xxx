module.exports = function ($interpolate, $state, $http, Categories) {
	"ngInject";
	return {
		restrict: 'EA',
		template: require('./breadcrumbs.directive.tpl.jade'),
		scope: {
			displaynameProperty: '@',
			displayPathnameProperty: '@',
			abstractProxyProperty: '@?'
		},
		link: function (scope, $el, $attrs) {

			/**
			 * Start with the current state and traverse up the path to build the
			 * array of breadcrumbs that can be used in an ng-repeat in the template.
			 */
			var getDisplayName, getDisplayPathName, getObjectValue, getWorkingState, stateAlreadyInBreadcrumbs, updateBreadcrumbsArray;
			updateBreadcrumbsArray = function () {
				var breadcrumbs, currentFragment, currentFragmentCategory, currentState, displayName, displayPath, displayPathArray, fragmentFieldName, fullPath, urlPrefix, workingState;
				workingState = void 0;
				displayName = void 0;
				breadcrumbs = [];
				currentState = $state.$current;
				while (currentState && currentState.name !== '') {
					workingState = getWorkingState(currentState);
					if (workingState) {
						displayPath = getDisplayName(workingState);
						displayPathArray = getDisplayPathName(workingState);
						if (_.isArray(displayPathArray)) {
							while (displayPathArray.length) {
								fullPath = displayPathArray.join('/');
								currentFragment = displayPathArray.pop();
								fragmentFieldName = _.get(currentState, 'data.displayPathname.fragment', '');
								currentFragmentCategory = _.find(scope.categories, function (category) {
										return decodeURIComponent(_.get(category, fragmentFieldName)) === decodeURIComponent(currentFragment);
									}) || {};
								urlPrefix = _.get(currentState, 'data.urlPrefix', '');
								breadcrumbs.push({
									displayName: currentFragmentCategory.name || currentFragment,
									url: "" + urlPrefix + fullPath
								});
							}
						} else if (displayPath !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
							fragmentFieldName = _.get(currentState, 'data.displayPathname.fragment', '');
							currentFragmentCategory = _.find(scope.categories, function (category) {
									return decodeURIComponent(_.get(category, fragmentFieldName)) === decodeURIComponent(displayPath);
								}) || {};
							breadcrumbs.push({
								displayName: currentFragmentCategory.name || displayPath,
								route: workingState.name
							});
						}
					}
					currentState = currentState.parent;
				}
				breadcrumbs.reverse();
				scope.breadcrumbs = breadcrumbs;
			};

			/**
			 * Get the state to put in the breadcrumbs array, taking into account that if the current state is abstract,
			 * we need to either substitute it with the state named in the `scope.abstractProxyProperty` property, or
			 * set it to `false` which means this breadcrumb level will be skipped entirely.
			 * @param currentState
			 * @returns {*}
			 */
			getWorkingState = function (currentState) {
				var proxyStateName, workingState;
				proxyStateName = void 0;
				workingState = currentState;
				if (currentState.abstract === true) {
					if (typeof scope.abstractProxyProperty !== 'undefined') {
						proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
						if (proxyStateName) {
							workingState = $state.get(proxyStateName);
						} else {
							workingState = false;
						}
					} else {
						workingState = false;
					}
				}
				return workingState;
			};

			/**
			 * Resolve the displayName of the specified state. Take the property specified by the `displayname-property`
			 * attribute and look up the corresponding property on the state's config object. The specified string can be interpolated against any resolved
			 * properties on the state config object, by using the usual {{ }} syntax.
			 * @param currentState
			 * @returns {*}
			 */
			getDisplayName = function (currentState) {
				var displayName, interpolationContext, propertyReference;
				interpolationContext = void 0;
				propertyReference = void 0;
				displayName = void 0;
				if (!scope.displaynameProperty) {
					return currentState.name;
				}
				propertyReference = getObjectValue(scope.displaynameProperty, currentState);
				if (propertyReference === false) {
					return false;
				} else if (typeof propertyReference === 'undefined') {
					return currentState.name;
				} else {
					interpolationContext = typeof currentState.locals !== 'undefined'
						? currentState.locals.globals
						: currentState;
					displayName = $interpolate(propertyReference)(interpolationContext);
					return displayName;
				}
			};
			getDisplayPathName = function (currentState) {
				var displayName, displayPathName, displayPathNameArray, interpolationContext, propertyReference;
				propertyReference = void 0;
				displayName = void 0;
				if (!scope.displayPathnameProperty) {
					return false;
				}
				propertyReference = getObjectValue(scope.displayPathnameProperty, currentState);
				if (!propertyReference) {
					return false;
				} else {
					interpolationContext = typeof currentState.locals !== 'undefined'
						? currentState.locals.globals
						: currentState;
					displayPathName = $interpolate(propertyReference.pathName)(interpolationContext);
					displayPathNameArray = displayPathName.split('/');
					if (displayPathNameArray.length < 2) {
						return displayPathName;
					} else {
						return displayPathNameArray;
					}
				}
			};

			/**
			 * Given a string of the type 'object.property.property', traverse the given context (eg the current $state object) and return the
			 * value found at that path.
			 *
			 * @param objectPath
			 * @param context
			 * @returns {*}
			 */
			getObjectValue = function (objectPath, context) {
				var i, propertyArray, propertyReference;
				i = void 0;
				propertyArray = objectPath.split('.');
				propertyReference = context;
				i = 0;
				while (i < propertyArray.length) {
					if (angular.isDefined(propertyReference[propertyArray[i]])) {
						propertyReference = propertyReference[propertyArray[i]];
					} else {
						return void 0;
					}
					i++;
				}
				return propertyReference;
			};

			/**
			 * Check whether the current `state` has already appeared in the current breadcrumbs array. This check is necessary
			 * when using abstract states that might specify a proxy that is already there in the breadcrumbs.
			 * @param state
			 * @param breadcrumbs
			 * @returns {boolean}
			 */
			stateAlreadyInBreadcrumbs = function (state, breadcrumbs) {
				var alreadyUsed, i;
				i = void 0;
				alreadyUsed = false;
				i = 0;
				while (i < breadcrumbs.length) {
					if (breadcrumbs[i].route === state.name) {
						alreadyUsed = true;
					}
					i++;
				}
				return alreadyUsed;
			};
			scope.breadcrumbs = [];
			Categories.query().$promise.then((function (_this) {
				return function (categories) {
					scope.categories = categories;
					if ($state.$current.name !== '') {
						updateBreadcrumbsArray();
					}
					return scope.$on('$stateChangeSuccess', function () {
						updateBreadcrumbsArray();
					});
				};
			})(this));
		}
	};
};
