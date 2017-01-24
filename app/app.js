const path = require('path')
const http = require('http')
const express = require('express')
const basePath = path.join(__dirname, '/../')

function app(basePath) {
	const app = express();
	app.use(express.static(basePath));
	app.use('/node_modules', express.static(path.join(basePath, 'node_modules')));
	app.get('*', (_, res) => res.sendFile(path.join(basePath, 'index.html')));

	return app;
}

module.exports = app;
