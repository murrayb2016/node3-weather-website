const request = require('request');

const requestProx = request.defaults({'proxy': 'http://32139:Mon@proxy-east.aero.org:8080/'}); //Setting proxy for http request 

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/28dc2cd36b349902fbc01b3ea558d041/'+lat+','+lon+''; 

    requestProx( {url: url, json: true} , (error, {body}={})=>{
                if(error){ //More of network error handling 
                    callback('Unable to connect to weather services!', undefined);
                }
                else if(body.error){
                    callback('Unable to connect to weather services! Try another search.', undefined);
                }
                else{
                    const curr = body.currently;
                    callback(undefined, body.daily.data[0].summary+ 'It is currently ' + curr.temperature + ' degrees out. There is a ' + curr.precipProbability+ '% chance of rain.');
                }
    });
}

module.exports = forecast;