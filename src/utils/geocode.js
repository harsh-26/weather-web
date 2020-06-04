const request = require('request')

const geocode = (address,callback) =>{
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFyc2gtMjYiLCJhIjoiY2thc3h5NXg2MG8ybDJ1bXMxd3VlMTl1ZSJ9.Qf0XHTbUEKDd5Uw3cYL-Kg'
    request({url : geourl , json : true } ,(error,response) =>{
        if(error){
            callback('Unable to connect to location services....')
        }else if(response.body.features.length === 0){
            callback('Unable to find the location. Try different search .....')
        }
        else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    
    })
}

module.exports = geocode;