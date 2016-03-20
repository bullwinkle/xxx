module.exports = ($resource, apiUrl) => {
	"ngInject";

	var Articles = $resource(`${apiUrl}/posts/:id`, {
		id: '@id',
	});

	return Articles;
}