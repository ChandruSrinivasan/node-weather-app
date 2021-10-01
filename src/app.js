const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirecPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(publicDirecPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Chandru bot'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Nature',
        name: 'Chandru bot'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Chandru bot',
        helpText: 'This is some help text'
    })
})



//app.use(express.static(path.join(__dirname, '../public')))

// 2 parameter, url and function
// app.get('', (req, res) =>{
//     res.send('<h1>hello express</h1>')
// })

// app.get('/help', (req, res) =>{
//     res.send({
//         name:'chandru',
//         age: 27
//     })
// })

// app.get('/about', (req, res) =>{
//     res.send('about page')
// })

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error) {
            return res.send({
                error: error
            })
            //or
            // return res.send({
            //     error
            // })
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
            //console.log(location)
            //console.log(forecastdata)
        })
    })

    
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404error', {
        title:'404',
        name:'chandru',
        errormessage: 'help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404error', {
        title:'404',
        name:'chandru',
        errormessage: 'My 404 page'
    })
})

// to start up the server
app.listen(port, () => {
    console.log('Server is up on port' + port)
})
