module.exports = ($resource, ENV) => {
	"ngInject";

	return $resource(`${ENV.API_ORIGIN}/wp-send-custom-mail.php`);
}