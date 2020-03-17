const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

// # Creates Express application
// - express() fn is top level fn
const app = express() //  storing express() in variable for later use

const port = process.env.PORT || 3000 // setting port for Heroku OR for local


// # Define paths for Express config
// - express by default expects view files to be in VIEWS folder 
const publicDirPath = path.join(__dirname, '../public') // storing joined path for PUBLIC folder in variable
const viewsPath = path.join(__dirname, '../templates/views') // storing joined path for TEMPLATES folder in variable
const partialPath = path.join(__dirname, '../templates/partials') // storing joined path for PARTIALS fodler in variable

// # Settings for express
// # Setup handlebars engine and views location
app.set('view engine', 'hbs') // setting handlebars hbs files (changing default extensions for hbs extension)
app.set('views', viewsPath) // changing default VIEWS folder to TEMPLATES folder
hbs.registerPartials(partialPath) // settings partials

// # Setup static directory to serve
app.use(express.static(publicDirPath))

// # Renders template
app.get('', (req, res) => {
    res.render('index', {  // 1.arg where to render, 2.arg what to render
        title: 'Weather App',
        name: 'Dzoni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Dzoni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Dzoni',
        message: 'This is helm message'
    })
})


// routing if we receive an request
// 1. arg - path, string...
// 2. arg is callback fn - what to do
// callback fn receive 2 arg:  1.(req) object  with info about incoming request to the server, 2.(res) methods what to send back to requestor
// Scenario: localhost:3000 is url (1.arg), we requested in browser and responded (2.arg)
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>') // Sends the HTTP response., in this case send html code to browser page
// })

// app.get('/help', (req, res) => { // in this case sending json (converting object to json string) to browser page - it can be object, array...
//     res.send([
//         {
//         name: 'Dzoni',
//         age: 35
//     }, {
//         name: 'Andrew',
//         age: 27
//     }])
// })


app.get('/weather', (req, res) => {
    
    // check if address is provided
    if (!req.query.address) {
        return res.send({
            error: 'Error! Please provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // second arg is destructing object's properties / setting empty(default) object 
    
        if (error) {
            return res.send({
                error // shorthand because we already have var with the same name
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error // shorthand because we already have var with the same name
                })
            }
            
            res.send({
                forecast: forecastData,
                location, // shorthand because we already have var with the same name
                address: req.query.address
            })

        })
    
    })


})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ //return stops program if there's no search (below is another response and there can't be 2 responses)
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        text: 'Article not found'
    })
})

// # Router for 404 page
// - * give me all that aren't listed above (just in root, not subpages)
// - must be last
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        text: 'Error 404'
    })
})

// starts server
// starts on port:3000
// calback fn - do something while server running (optional)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})