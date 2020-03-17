// # Fetch is client side function (not nodejs)
// First arg - url for fetching
// Second arg (must be in .then() fn)- callback fn because fetch is async fn (we are waiting response/data)
// 'Fetch data from this url and THEN run this function'
// response.json() parses the JSON response from our request into a JavaScript object so we can work with it , we don't use JSON.parse() because JSON.parse() is synch fn and we need async
// (data) => {} callback fn will run when json data arrive
//  
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => { // this callback fn will run when json data arrived / podsetnik-> 
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form') // we put it in var for easy access later
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents default refreshing browser

    const location = searchElement.value // storing input value in variable 

    messageOne.textContent = 'Loading...' // setting default message until it render real data

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

    

    
})