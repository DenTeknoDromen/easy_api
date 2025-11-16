const express = require('express')
const promBundle = require('express-prom-bundle');
const { selectDb, insertDb } = require('./mariadb_handler');
const { setBuildDate } = require("./set-build-date")

const metricsMiddleware = promBundle({includeMethod: true});
const app = express()
const port = 4000
setBuildDate()

app.use(express.json());
app.use(metricsMiddleware)


app.get('/cities/:id', async (req, res) => {
  const input = req.params.id
  selectDb(input).then(output => res.send(JSON.stringify(output[0])))
})


app.get('/image', async (req, res) => {
    res.send({build_date: process.env.BUILD_DATE})
})

app.post('/cities', (req, res) => {
  const input = req.body;
  insertDb(input)
  // res.json(input)
  // console.log(input)
  // insertDb(input)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})