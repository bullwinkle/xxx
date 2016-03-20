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
				"filter[category_name]": 'articles'
			}
		},
		get: {
			method: 'GET',
			cache: true
		}
	});
}