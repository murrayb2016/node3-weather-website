const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require(path.join(__dirname, '../utils/geocode.js'));
const forecast = require(path.join(__dirname, '../utils/forecast.js'));

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express Config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebards engine and views location
app.set('view engine','hbs'); //sets handle bars on express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req,res)=>{ 
    res.render('index', {
        title: 'Weather App',  
        name: 'Bradley Murray'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me', 
        name: 'Bradley Murray'
    });
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help Page', 
        name: 'Bradley Murray', 
        helpText: 'This is my help text'
    });
});
 
app.get('/weather', (req,res)=>{

    let address = req.query.address

    if(!address){
        return res.send({
            error: 'Please provide a search item!'  
        });
    }

    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => { 
            if(error){
                return res.send({  
                    error
                });
            }

            res.send({
                forecast: forecastData, 
                location,
                address: address 
            });  

        });
    });

    
});

app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    
    res.send({
        products: []
    });
});

app.get('/help/*',(req,res)=>{  //catch all for help 404
    res.render('404', {
        message: 'Could not find article!'
    });
});

app.get('*', (req,res)=>{ //catch all for all 404
    res.render('404', {
        message: 'Page not found!'
    }); 
}); 

app.listen(3000, ()=>{
   // console.log('Server is up on port 3000.');
});
