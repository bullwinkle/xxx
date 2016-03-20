module.exports = ($resource, apiUrl) => {
	"ngInject";

	return $resource(`${apiUrl}/pages/:id`, {
		id: '@id'
	}, {
		query: {
			method: 'GET',
			isArray: true,
			cache: true
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
					throw 'page parse error'
				}
				return parsed
			}
		}
	});
}