module.exports = ($resource, apiMenuUrl) => {
	"ngInject";

	//return $resource(`${apiUrl}/wp-api-menus/v2/menus/:id`, {
	return $resource(`${apiMenuUrl}/menu-locations/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true,
		},
		get: {
			method: 'GET',
			isArray: true,
			cache: true
		}
	});
}