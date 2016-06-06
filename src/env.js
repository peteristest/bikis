const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

const environment = {
  development: {
    isProduction: false,
    apiHost: 'http://localhost:8888'
  },
  production: {
    isProduction: true,
    apiHost: 'http://peter.is'
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: host,
  port: port,
  app: 'peter.is'
}, environment)
