module.exports = ($interpolate, $state, $http, Categories) ->
	"ngInject"

	restrict: 'EA'
	template: require('./breadcrumbs.directive.tpl.jade')

	scope:
		displaynameProperty: '@'
		displayPathnameProperty: '@'
		abstractProxyProperty: '@?'

	link: (scope, $el, $attrs) ->
		###*
		  # Start with the current state and traverse up the path to build the
		  # array of breadcrumbs that can be used in an ng-repeat in the template.
		  ###
		updateBreadcrumbsArray = ->
			workingState = undefined
			displayName = undefined
			breadcrumbs = []
			currentState = $state.$current
			while currentState and currentState.name != ''
				workingState = getWorkingState(currentState)
				if workingState
					displayPath = getDisplayName(workingState)
					displayPathArray = getDisplayPathName(workingState)
					if _.isArray displayPathArray
						while displayPathArray.length
							fullPath = displayPathArray.join('/')
							currentFragment = displayPathArray.pop()
							fragmentFieldName = _.get(currentState,'data.displayPathname.fragment','')
							currentFragmentCategory = _.find(scope.categories, (category) -> decodeURIComponent(_.get(category,fragmentFieldName)) is decodeURIComponent(currentFragment) ) or {}
							urlPrefix = _.get(currentState,'data.urlPrefix','')
							breadcrumbs.push
								displayName: currentFragmentCategory.name or currentFragment
#								route: workingState.name
								url: "#{urlPrefix}#{fullPath}"

					else if displayPath != false and !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)
						fragmentFieldName = _.get(currentState,'data.displayPathname.fragment','')
						currentFragmentCategory = _.find(scope.categories, (category) -> decodeURIComponent(_.get(category,fragmentFieldName)) is decodeURIComponent(displayPath) ) or {}
						breadcrumbs.push
							displayName: currentFragmentCategory.name or displayPath
							route: workingState.name

				currentState = currentState.parent
			breadcrumbs.reverse()
			scope.breadcrumbs = breadcrumbs
			return

		###*
		  # Get the state to put in the breadcrumbs array, taking into account that if the current state is abstract,
		  # we need to either substitute it with the state named in the `scope.abstractProxyProperty` property, or
		  # set it to `false` which means this breadcrumb level will be skipped entirely.
		  # @param currentState
		  # @returns {*}
		  ###

		getWorkingState = (currentState) ->
			proxyStateName = undefined
			workingState = currentState
			if currentState.abstract == true
				if typeof scope.abstractProxyProperty != 'undefined'
					proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState)
					if proxyStateName
						workingState = $state.get(proxyStateName)
					else
						workingState = false
				else
					workingState = false
			workingState

		###*
		  # Resolve the displayName of the specified state. Take the property specified by the `displayname-property`
		  # attribute and look up the corresponding property on the state's config object. The specified string can be interpolated against any resolved
		  # properties on the state config object, by using the usual {{ }} syntax.
		  # @param currentState
		  # @returns {*}
		  ###

		getDisplayName = (currentState) ->
			interpolationContext = undefined
			propertyReference = undefined
			displayName = undefined
			if !scope.displaynameProperty
# if the displayname-property attribute was not specified, default to the state's name
				return currentState.name
			propertyReference = getObjectValue(scope.displaynameProperty, currentState)
			if propertyReference == false
				false
			else if typeof propertyReference == 'undefined'
				currentState.name
			else
# use the $interpolate service to handle any bindings in the propertyReference string.
				interpolationContext = if typeof currentState.locals != 'undefined' then currentState.locals.globals else currentState
				displayName = $interpolate(propertyReference)(interpolationContext)
				displayName

		getDisplayPathName = (currentState) ->
			propertyReference = undefined
			displayName = undefined
			if !scope.displayPathnameProperty then return false
			propertyReference = getObjectValue(scope.displayPathnameProperty, currentState)
			if !propertyReference then return false
			else
# use the $interpolate service to handle any bindings in the propertyReference string.
				interpolationContext = if typeof currentState.locals != 'undefined' then currentState.locals.globals else currentState
				displayPathName = $interpolate(propertyReference.pathName)(interpolationContext)
				displayPathNameArray = displayPathName.split('/')
				if displayPathNameArray.length < 2
					return displayPathName
				else
					return displayPathNameArray

		###*
		  # Given a string of the type 'object.property.property', traverse the given context (eg the current $state object) and return the
		  # value found at that path.
		  #
		  # @param objectPath
		  # @param context
		  # @returns {*}
		  ###

		getObjectValue = (objectPath, context) ->
			i = undefined
			propertyArray = objectPath.split('.')
			propertyReference = context
			i = 0
			while i < propertyArray.length
				if angular.isDefined(propertyReference[propertyArray[i]])
					propertyReference = propertyReference[propertyArray[i]]
				else
# if the specified property was not found, default to the state's name
					return undefined
				i++
			propertyReference

		###*
		  # Check whether the current `state` has already appeared in the current breadcrumbs array. This check is necessary
		  # when using abstract states that might specify a proxy that is already there in the breadcrumbs.
		  # @param state
		  # @param breadcrumbs
		  # @returns {boolean}
		  ###

		stateAlreadyInBreadcrumbs = (state, breadcrumbs) ->
			i = undefined
			alreadyUsed = false
			i = 0
			while i < breadcrumbs.length
				if breadcrumbs[i].route == state.name
					alreadyUsed = true
				i++
			alreadyUsed

		scope.breadcrumbs = []

		Categories.query().$promise.then (categories) =>
			scope.categories = categories

			if $state.$current.name != ''
				updateBreadcrumbsArray()

			scope.$on '$stateChangeSuccess', ->
				updateBreadcrumbsArray()
				return

		return