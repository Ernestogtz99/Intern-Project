
const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const path = require('path')


router.get('/getApiInfo', async (req, res) => {

    //Fetch api to obtain all properties
    const data = await fetch('https://api.stagingeb.com/v1/properties',{
        headers : {
            'X-Authorization' : process.env.API_KEY,
        }
    }).then(data => data.json())

    //Answers with obtained json
    res.json(data.content)

})


router.get('/', (req, res) => {

    //Send html
    res.sendFile(path.resolve(__dirname + '/../../public/html/index.html'))

})


module.exports = router