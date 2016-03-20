module.exports = ($resource, apiUrl) => {
	"ngInject";

	return $resource(`${apiUrl}/tags/:id`, {
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
		}
	});
}