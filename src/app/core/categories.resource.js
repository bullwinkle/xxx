module.exports = ($resource, apiUrl) => {
	"ngInject";

	return $resource(`${apiUrl}/categories/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true,
			params: {
				"per_page": 100 // TODO change to 20 and implement pagination
			}
		},
		get: {
			method: 'GET',
			cache: true
		},
		getBySlug: {
			method: 'GET',
			cache: true,
			isArray: false,
			transformResponse: (data, headersGetter) => {
				var parsed;
				try {
					parsed = _.get( JSON.parse(data), '[0]', null);
				} catch(err) {
					throw 'category parse error'
				}
				return parsed
			}
		}
	});
}