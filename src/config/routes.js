const path = require('path')
const scriptName = path.basename(__filename)
const logger = require('./logger')
const { Router } = require('express')
const fg = require('fast-glob')

module.exports = async (app) => {
  const router = Router()
  app.use(router)

  await fg.sync('**/src/routes/**.js', { ignore: ['**/src/routes/**.test.js'] }).map(async (file) => {
    const route = await require(`../../${file}`)
    route(router)
    logger.info(`Imported route from: ${file}`, { module: scriptName })
  })

  logger.info('Imported default route', { module: scriptName })

  router.route('*').all((req, res) => {
    logger.info(`Chamada em rota inválida: ${req.method}:${req.path}`, { module: scriptName })
    res.status(404).send({ error: { message: 'Rota inválida', code: 404 } })
  })
}
