const path = require('path')
const scriptName = path.basename(__filename)
const service = require('../services/ping')
const logger = require('../config/logger')
const sucessStatus = 200
const errorStatus = 400
const apiTerm = 'Objeto'

const get = async (req, res) => {
  const objects = await service.get()

  if (objects) {
    logger.info('Ping Solicitado!', { module: scriptName })
    res.status(sucessStatus).json(objects)
  } else {
    logger.error('Problema ao retornar ping!', { module: scriptName })
    res.status(errorStatus).send({ error: `${apiTerm} não encontrados` })
  }
}

module.exports = { get }
