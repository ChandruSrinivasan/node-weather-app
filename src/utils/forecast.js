const request = require('postman-request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f41305fd019679802176df1ce3764991&query='+ lat +',' + long + '&units=f'

    request({url, json: true}, (error, {body}) =>{
        
        if(error){
            callback('Unable to connect to services', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, 
                (body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature))
        }

    })
}

//before destruct
// const forecast = (lat, long, callback) =>{
//     const url = 'http://api.weatherstack.com/current?access_key=f41305fd019679802176df1ce3764991&query='+ lat +',' + long + '&units=f'

//     request({url, json: true}, (error, response) =>{
        
//         if(error){
//             callback('Unable to connect to services', undefined)
//         } else if(response.body.error) {
//             callback('Unable to find location', undefined)
//         }else{
//             callback(undefined, 
//                 (response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature))
//         }

//     })
// }

module.exports = forecast