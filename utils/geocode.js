const request = require('request');

const requestProx = request.defaults({'proxy': 'http://32139:Mon@proxy-east.aero.org:8080/'}); //Setting proxy for http request 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXVycmF5YjIwMTYiLCJhIjoiY2p4MHJmc2N4MDIzZjRibzcwdXNzZnE3MSJ9.GCUxSeqJK3F1sBQC2ZykdQ&limit=1';

    requestProx( {url: url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to connect to location services! Try another search.', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],   
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            });
        }
    });

};

module.exports = geocode;