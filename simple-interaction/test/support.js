module.exports = {createApp}

function createApp() {
  const express = require('express')
  const path = require('path')
  const basePath = path.join(__dirname, '/../')

  return express()
    .use(express.static(basePath))
    .get('*', (_, res) => res.sendFile( path.join(basePath, 'index.html') ))
}
