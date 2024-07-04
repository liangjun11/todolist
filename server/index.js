const express = require('express')
const appSetup = require('./appSetup')
const app = express()
const port = 3000
require('./dbSetup')

appSetup(app)
app.listen(port, () => {
  console.log(`Todolist app listening on port ${port}`)
})
