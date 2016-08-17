import express from 'express'
import bodyParser from 'body-parser'
import ip from 'ip'

require('colors')

// configure app
const app = express()

// configure body parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// set our port
const port = process.env.APIPORT


// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router()

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.info('Something is happening.')
  next()
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!'
  })
})

// on routes that end in /bears
// ----------------------------------------------------
router.route('/info')

// create a bear (accessed at POST http://localhost:8080/bears)
.get((req, res) => {
  res.json({
    message: 'Bear created!'
  })
})


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router)

// START THE SERVER
// =============================================================================
app.listen(port, ip.address(), err => {
  if (err) {
    console.info(err)
  }
  console.info(`➦ Api on ${ip.address()} : ${port}`)
})
