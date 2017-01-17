const path = require('path')
const http = require('http')
const express = require('express')
const basePath = path.join(__dirname, '/../')

function app(basePath) {
	return express().use(express.static(basePath)).get('*', (_, res) => res.sendFile(path.join(basePath, 'index.html')));
}

module.exports = app;
