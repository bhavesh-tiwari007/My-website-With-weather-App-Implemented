const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhdmVzaC10aXdhcmkiLCJhIjoiY2t5bDhrYXN3MXZ2YjJ3cDAwZ3g1a2c1ZCJ9.S3unHYIFPPqx_bvYoOj0Uw&limit=1'

    request({ url: url, json: true }, (error, Response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (Response.body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {

            callback(undefined, {
                longitude: Response.body.features[0].center[0],
                latitude: Response.body.features[0].center[1],
                location: Response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode