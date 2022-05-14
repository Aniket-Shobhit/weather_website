const request = require('request');
//import request from 'request';
const geocode = (address,callback) => {
    //1st api key = e2e92149378fc6991312294ecbc4b927
    //2nd api key = 8caa80157eda92ce665d0559b6dd5e50
    const url = `http://api.positionstack.com/v1/forward?access_key=8caa80157eda92ce665d0559b6dd5e50&%20query=${address}&limit=1`;
    request({url, json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to the geocoding service',undefined);
        } 
        //else if(body.data.length===0) {
        else if(body.error || body.data.length===0) {
            callback('Unable to find location',undefined);
        }
        else {
            const data = {
                longitude: body.data[0].longitude,
                latitude: body.data[0].latitude,
                location: body.data[0].label
            };
            callback(undefined,data);
        }
    });
};

module.exports = geocode;