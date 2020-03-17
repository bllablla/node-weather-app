const request = require('request')

// We use callback fn because inside const geocode will be async request fn ()
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmxsYWJsbGEiLCJhIjoiMVF0OGNCdyJ9.I8NoMUcIiniydfBtLNBhug&limit=1'
    
    request({ url, json: true}, (error, {body}) => { // url is shorthanded from url: url / body is destructed from response.body from forecast api object
        if (error) {
            callback('Unable to connect to location services!', undefined) // we use callback() because we can't use return
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined) // we use callback() because we can't use return
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode