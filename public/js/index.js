

async function loadPage()
{
    
    //GET request to server
    let data = await fetch('/getApiInfo').then(data => data.json())
    
    createPropertyElements(data)

}


function createPropertyElements(data)
{

    const divPropertyList = document.getElementById('property-list')

    //Create html elements for each property
    data.forEach(element => {
        
        let newElements = []

        newElements.push(createElement('p', element.public_id))
        newElements.push(createElement('h3', element.title))
        newElements.push(createElement('h2', element.property_type))
        newElements.push(createElement('h2', element.location))
        newElements.push(createElement('img', element.title_image_thumb))


        //Create <div> with newElements inside
        let divTag = document.createElement('div')
        divTag.className = 'property'
        newElements.forEach( element => divTag.appendChild(element) );
        //tag.appendChild(document.createElement('hr'))

        //Create <a> tag
        let aTag = createElement('a', '/property/' + element.public_id)
        aTag.append(divTag)

        //Add property to html
        divPropertyList.appendChild(aTag)
        
    });

}


function createElement(tag, value)
{

    let newTag = document.createElement(tag)
    switch(tag)
    {
        case 'img': newTag.src = value;     break
        case 'a':   newTag.href = value;    break
        default:    
                content = document.createTextNode(value);
                newTag.appendChild(content); 
            break
    }

    return newTag

}


loadPage()
