const app = require('express')()
const setupMiddlewares = require('./middlewares')
const setupRoutes = require('./routes')
require('../../bot')

setupMiddlewares(app)
setupRoutes(app)

module.exports = app
