const { insertDb, selectDb } = require('./db_handler')
const apiMetrics = require('prometheus-api-metrics');


const express = require('express')
const app = express()
const port = 4000

app.use(express.json());
app.use(apiMetrics());

app.get('/cities/:id', async (req, res) => {
  const input = req.params.id
  selectDb(input).then(output => res.send(JSON.stringify(output[0])))
})

app.post('/cities', (req, res) => {
  const input = req.body;
  res.json(input)
  console.log(input)
  insertDb(input)
  
})

app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})