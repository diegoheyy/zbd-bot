const path = require('path')
const scriptName = path.basename(__filename)
const app = require('./config/app')
const logger = require('./config/logger')
const port = process.env.PORT || 4000

app.listen(port, () => {
  logger.info(`Process start at ${port}, env: ${process.env.NODE_ENV}`, {
    module: scriptName
  })
})
