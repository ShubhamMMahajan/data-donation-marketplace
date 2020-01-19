const plugin = require('ilp-plugin')()
const SPSP = require('ilp-protocol-spsp')

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/testpay', (req, res) => {
//  async function run () {
    console.log('paying http://localhost:8085...')
    SPSP.pay(plugin, {
      receiver: 'http://localhost:8085',
      sourceAmount: '10'
    })
  console.log('paid!')
  res.send('Paid 10 tokens!')
//  }
//  run().catch(e => console.error(e))
})

app.get('/pay', (req, res) => {
  if (typeof req.query.nonprofit === 'undefined' || typeof req.query.amount === 'undefined') {
    res.send('Request malformed. Specify \"nonprofit\" and \"amount\"')
    return
  } 
  console.log('paying', req.query.nonprofit, req.query.amount)
    SPSP.pay(plugin, {
      receiver: req.query.nonprofit,
      sourceAmount: req.query.amount
    })
  console.log('paid!')
  res.send('Paid', req.query.nonprofit, req.query.amount)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

