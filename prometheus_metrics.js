const prometheus = require('prom-client')

const viewedCityNamesTotal = new prometheus.Counter({
    name: 'viewed_total',
    help: 'Total number of views',
    labelNames: ['cityName']
  });

module.exports = {
    viewedCityNamesTotal
}