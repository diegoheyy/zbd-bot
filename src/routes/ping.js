const baseRoute = '/ping'
const api = require('../api/ping')

module.exports = router => {
  router.route(`${baseRoute}`).get(api.get)
}
