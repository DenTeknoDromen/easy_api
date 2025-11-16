const promBundle = require('express-prom-bundle');
const { selectDb } = require('./mariadb_handler');
const metricsMiddleware = promBundle({includeMethod: true});


const express = require('express')
const app = express()
const port = 4000

app.use(express.json());
app.use(metricsMiddleware)


app.get('/cities/:id', async (req, res) => {
  const input = req.params.id
  selectDb(input).then(output => res.send(JSON.stringify(output[0])))
})


app.get('/image', async (req, res) => {
    res.send({thisis: "banan"})
    //res.send({thisis: process.env.IMAGE_DATE})
})


app.post('/cities', (req, res) => {
  const input = req.body;
  res.json(input)
  console.log(input)
  insertDb(input)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})