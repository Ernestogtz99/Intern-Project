
const express = require('express')
const router = express.Router()
const path = require('path')
const fetch = require('node-fetch')


let property_data 


router.get('/getPropertyData', (req, res) => {

    //Answers with json data previously stored
    res.json(property_data)

})


router.post('/saveContactRequest', async (req, res) => {
    
    let contact_request = JSON.stringify(req.body)
    
    //Send contact request
    const data = await fetch('https://api.stagingeb.com/v1/contact_requests/',{
        method : 'POST',
        headers : {
            'X-Authorization' : process.env.API_KEY,
        },
        body : contact_request
    })
    
    //End response
    res.end()
    
})


router.get('/:id', async (req, res) => {
    
    //Fetch api to obtain property info
    const data = await fetch('https://api.stagingeb.com/v1/properties/' + req.params.id ,{
        headers : {
            'X-Authorization' : process.env.API_KEY,
        }
    })
        .then(data => data.json())
        .then(data => {
            
            //Check if data holds a property info
            if (data.hasOwnProperty('title'))
            {
                //Stores json data for later use
                property_data = data

                //Send html
                res.sendFile(path.resolve(__dirname + '/../../public/html/property.html'))
            }
            else
            {
                res.status(400).send('Invalid Property Id')
            }
        }) 
})


module.exports = router