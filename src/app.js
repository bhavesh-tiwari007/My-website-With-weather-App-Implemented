const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const { off } = require('process')
const geocode = require('./utils/geocode')
const froecast = require('./utils/forecast')
const forecast = require('./utils/forecast')
const { response } = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// define path to exprexx config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../src/template/views')
const partialPath = path.join(__dirname, "../src/template/partials")

// Setup handlebars engine and views locatio
app.set('view engine', 'hbs')
    // app.set("views", path.join(__dirname, "views"));
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static derictory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bhavesh Tiwari'
    })
})

// app.get('', (req, res) => { // domain app.com
//     res.send(`<h1> Weather App </h1>`)    // no requirement for this now
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bhavesh Tiwari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "kese ho ",
        name: "Bhavesh tiwari",
        contact: 'tdinesh7007@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            Error: 'Please provide addres to get its weather'
        })
    }
    forecast(req.query.location, (error, forecastData) => {
        if (error) {
            return { error: 'an error occured' }
        } else {
            res.send({
                forecast: forecastData,
                address: req.query.location
            })
        }
    })

    // res.send({
    //     froecast: 0,

    //     location: req.query.location
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must prvide a search value"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Bhavesh Tiwari",
        errorMessage: ' Page Not Found'
    })
})



app.listen(3000, () => { // Starts your app at localhost: 3000 port
    console.log('Server is on port 3000')
})