const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=137dfd3a4df218d182e3d8a8a8178110&query=' + encodeURIComponent(address)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Forecast Services', undefined)
        } else if (response.body.request === 0) {
            callback('Unable to find the location, try different search', undefined)
        } else {
            callback(undefined, {
                Temp: response.body.current.temperature,
                feelsLike: response.body.current.feelsLike,
                weatherDiscription: response.body.current.weather_descriptions

            })
        }       
    })
}


// const url1= 'http://api.weatherstack.com/current?access_key=137dfd3a4df218d182e3d8a8a8178110&query='+ encodeURIComponent(address)
module.exports = forecast