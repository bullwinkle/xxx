module.exports = ($resource, apiUrl, News) => {
	"ngInject";

	return $resource(`${apiUrl}/media/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true,
			params: {
				"filter[category_name]": 'news'
			}
		},
		get: {
			method: 'GET',
			cache: true
		}
	});
}