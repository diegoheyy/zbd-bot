const bodyParser = require('body-parser')

const helmet = require('helmet')
const cors = require('cors')
const log = require('./log')

module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use(log)
}
