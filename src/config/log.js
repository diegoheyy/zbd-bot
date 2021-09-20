// const service = require('../services/log')

module.exports = (req, res, next) => {
  res.on('finish', () => {
    // service.insert(req)
  })
  next()
}
