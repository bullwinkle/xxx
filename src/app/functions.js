module.exports = {
	mapEntityByIds: (ids, items) => {
		return _(ids)
			.map(id => _.find(items, item => item.id == id))
			.value()
	}
}