const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 

//define paths for express confing
const publicDir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,"../templates/views") 
const partialspath = path.join(__dirname,"../templates/partials") 


//setup handlebars engine and views location
app.set("views", viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialspath)

// setup sattic derectory to serve
app.use(express.static(publicDir))

app.get('', (req,res) =>{
    res.render('index', {
        title: "weather app",
        name:'Ashvin Vanol'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: "About Me",
        About:'Ashvin vanol',
        name:'Ashvin Vanol'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: "help Page",
        Help:'thank for help',
        name:'Ashvin Vanol'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
// app.get('/wether', (req,res) => {
//     if(!req.query.address){
//         return res.send({Error:'you must provide a address'})
//     }
//     console.log(req.query);
//     res.send([
//         {
//             forcast: "there is for cast",
//             weather:" cloudy",
//             address: req.query.address
//         }])
// })

app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({Error:'you must provide a search term'})
    }
    console.log(req.query);
    res.send([{
        product: []
        }])
})


// wildcard charector 
app.get('/help/*', (req,res) => {
    res.render('Error', {
        title: "404 Page",
        data: " Help article not found ",
        Help:'thank for help',
        name:'Ashvin Vanol'
    })})
app.get('*', (req,res) => {
    res.render('Error', {
        title: "404 Page",
        data: " Page not found ",
        Help:'thank for help',
        name:'Ashvin Vanol'
    })})


app.listen(5000, ()=>{
    console.log("server is running in 3000 port");
})
