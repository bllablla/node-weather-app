const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f144392ce2bed8c152ef8eb01b57076c/' + latitude + ',' + longitude + '?units=si&lang=sr'

    request({ url, json: true }, (error, {body}) => { // url is shorthanded from url: url / body is destructed from response.body from forecast api object
        if (error) {
            callback('Error: Unable to connect to forecast service', undefined)   // we use callback() because we can't use return         
        } else if (body.error) {
            callback(body.error, undefined)   // we use callback() because we can't use return
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' Trenutna temperatura je ' + body.currently.temperature + ' stepeni Celzjusa, i postoji ' + body.currently.precipProbability + '% verovatnoce za kisu. Najniza dnevna temperatura je ' + body.daily.data[0].temperatureLow + ' stepeni Celzjusa, a najvisa dnevna ce biti ' + body.daily.data[0].temperatureHigh + ' stepeni celzjusa. Pritisak je ' + body.daily.data[0].pressure + ' milibara, a brzina vetra je ' + body.daily.data[0].windSpeed + ' metara u sekundi.')
        }
    })
    
}

module.exports = forecast
