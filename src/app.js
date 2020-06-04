const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


const publicPathDirectory = path.join(__dirname,'../public')

//Dynamic web templating
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicPathDirectory))
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.get('',(req , res) =>{
    res.render('index',{
        title : 'Weather App',
        name : 'Harsh Shah'
    })
})


//Basic express routing 
// app.get('',(req , res)=>{
//     res.send('Welcome to expess web server')
// })

// app.get('/home',(req,res) =>{
//     res.send('This is my home page ')
// })

app.get('/about', (req , res) =>{
    res.render('home',{
        title : 'Weather App',
        name : 'Harsh Shah'
    })
})

app.get('/weather',(req , res) =>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address , (error,{latitude , longitude , location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude ,longitude , (error , forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })

    })
    
})

app.listen(port , () =>{
    console.log('Web server is running on port '+port)
})