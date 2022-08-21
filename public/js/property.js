
function loadPage()
{

    //Add eventListener to submit form
    document.getElementById('form-submit').addEventListener('click', (event) => {
        event.preventDefault()
    
        const name = document.getElementById('form-name').value
        const phone = document.getElementById('form-number').value
        const email = document.getElementById('form-email').value
        const message = document.getElementById('form-text-area').value
        const property_id = document.getElementById('public-id').innerText
        const source = window.location.href
    
        
        //POST request to /contact_request api
        fetch('/property/saveContactRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                property_id,
                message,
                source
            })
        })
    })

    //Load property info in html
    loadPropertyInfo()

}


async function loadPropertyInfo()
{
    
    //GET request to server
    let data = await fetch('/property/getPropertyData').then(data => data.json())
    

    //Load info in html
    document.getElementById('public-id').innerText = data.public_id
    document.getElementById('title').innerText = data.title
    document.getElementById('description').innerText = data.description
    document.getElementById('image').src = data.property_images[0].url
    document.getElementById('property-type').innerText = data.property_type
    document.getElementById('location').innerText = data.location.name
    
}


loadPage()
