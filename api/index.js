'use strict';

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const json = bodyParser.json;
const find = _.find;
const remove = _.remove;
const uniqueId = _.uniqueId;

const app = express();
const api = express.Router();
const items = [];

const PORT = process.env.PORT;
const ENDPOINT = '/api/v1/items';

api.get('/:id?', (req, res) => {
	const id = req.params.id;
	if (!id) {
		res.json({data: {items}});
	} else {
		const item = find(items, {id});
		if (item) {
			res.json({data: {item}});
		} else {
			res.json({err: 'Not found'});
		}
	}
});


api.post('/:id?', (req, res) => {
	const id = req.params.id;
	if (!id) {
		const item = req.body;
		item.id = uniqueId();
		items.push(item);
		res.json({data: {item}});
	} else {
		const item = find(items, {id});
		if (item) {
			Object.assign(item, req.body);
			res.json({data: {item}});
		} else {
			res.json({err: 'Not found'});
		}
	}
});

api.delete('/:id', (req, res) => {
	const id = req.params.id;
	const item = remove(items, {id})[0];
	if (item) {
		res.json({data: {item}});
	} else {
		res.json({err: 'Not found'});
	}
});

app.use(json());
app.use(ENDPOINT, api);
app.listen(PORT, () => {
	console.log('[api]', `Api on port ${PORT}`);
});
