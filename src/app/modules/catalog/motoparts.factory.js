module.exports = ($resource, apiUrl, News) => {
	"ngInject";

	return $resource(`${apiUrl}/posts/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true,
			params: {
				"filter[category_name]": 'motoparts'
			}
		},
		get: {
			method: 'GET',
			cache: true
		}
	});
}