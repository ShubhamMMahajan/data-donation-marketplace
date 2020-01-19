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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

