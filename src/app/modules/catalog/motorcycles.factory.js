module.exports = ($resource, apiUrl ) => {
	"ngInject";

	return $resource(`${apiUrl}/posts/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true,
			params: {
				"filter[category_name]": 'motorcycles'
			}
		},
		get: {
			method: 'GET',
			cache: true
		}
	});
}