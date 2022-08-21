
require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = 8000


//Static files
app.use(express.static(__dirname + '/../public'))


//Routes
app.use('/', require(path.join(__dirname, '/routes/index')))
app.use('/property', require(path.join(__dirname, '/routes/property')))


//Handle unknown routes
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 Page not found</h1>')
})


//Run server
app.listen(port, () => console.log('Server running on port 8000'))

