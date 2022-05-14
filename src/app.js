const path = require('path');
const express = require('express');
const hbs = require('hbs');
//import {path} from 'path';
//import {express} from 'express';
//import {hbs} from 'hbs';
//const geocode = require('./utils/geocode');
//const forecast = require('./utils/weather');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
//import {geocode} from './utils/geocode.js';
//import {weather} from './utils/weather.js';

//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));
//Declaring paths
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

const app = express(); 
const port = process.env.PORT || 3000;

//Set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Aniket'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name: 'Aniket'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        message:'this message is rendered dynamically',
        title:'Help',
        name: 'Aniket'
    });
});

//app.get('', (req,res) => {
//    res.send('<h1>Hello Express!</h1>');
//});

//app.get('/help', (req,res) => {
//    res.send([{
//        name: 'Aniket',
//        age: 20
//    },{
//        name: 'Shobhit',
//        age: 20
//    }]);
//});

//app.get('/about', (req,res) => {
//    res.send('<h1>About Page<h1>');
//});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        weather({latitude,longitude},(forecasterror,forecastData) => {
            if(forecasterror) {
                return res.send({ error });
            }
            res.send({
                location,
                Forecast:forecastData 
            });
        });
    });
    //res.send({
    //    address: req.query.address
    //});
});

app.get('/products',(req,res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    //console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) =>{
    res.render('404-page',{
        title: '404',
        name: 'Aniket',
        message:'Help article not found'
    });
});

app.get('*',(req,res) => {
    res.render('404-page',{
        title: '404',
        name: 'Aniket',
        message: 'Page not found'
    });
});

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port ' + port);
});
