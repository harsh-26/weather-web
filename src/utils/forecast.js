const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.weatherapi.com/v1/current.json?key=1b739f9bebdd4283b3e03755203005&q='+latitude+','+longitude
    
    request({url : url , json : true }, (error,response) =>{
        if(error){
            callback('Unable to connect to weather services')
        }else if(response.body.error){
            callback('No matching location found')
        }else{
            callback(undefined,'Weather condition is '+ response.body.current.condition.text + ' and the current temperature is '+response.body.current.temp_c)
        }
    })
}


module.exports = forecast