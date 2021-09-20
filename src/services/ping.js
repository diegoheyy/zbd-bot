const os = require('os')
const packageJsonInfo = require('../../package.json')

const get = () => {
  return { info: `SSBot is LIVE on ${os.hostname()}, env: ${process.env.NODE_ENV}, backend version: ${packageJsonInfo.version}` }
}

module.exports = { get }
