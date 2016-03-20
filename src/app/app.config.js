module.exports = ($provide, $locationProvider, $urlMatcherFactoryProvider, $resourceProvider, $sceProvider) => {
	"ngInject";

	$sceProvider.enabled(false); // TODO remove this ( https://docs.angularjs.org/api/ng/service/$sce#can-i-disable-sce-completely- )

	$locationProvider.hashPrefix('!');
	$locationProvider.html5Mode({
		enabled: true,
		//requireBase: false,
		rewriteLinks: true
	});

	$urlMatcherFactoryProvider.strictMode(false)
	// Don't strip trailing slashes from calculated URLs
	//$resourceProvider.defaults.stripTrailingSlashes = true;

	//$urlMatcherFactoryProvider.strictMode(false);

	window.ENV = ENV
	$provide.constant('ENV', ENV);
	$provide.constant('apiUrl', `${ENV.API_ORIGIN}${ENV.API_PATH}`)
	$provide.constant('apiMenuUrl', `${ENV.API_ORIGIN}${ENV.API_MENU_PATH}`)
}