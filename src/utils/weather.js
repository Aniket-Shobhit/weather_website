//import request from 'request';
const request = require('request');
const weather = ({latitude,longitude},callback) => {
    //1st api key = 420792a99cd81f13f95947f0894e29ea
    //2nd api key = 674afa1be112f847affb272f56db4f36
    const url = `http://api.weatherstack.com/current?access_key=674afa1be112f847affb272f56db4f36&query=${latitude},${longitude}&units=m`;
    request({url, json:true},(error,{body}) => {
        if(error) {
            callback('Unable to connect to the weather forecast',undefined);
        }
        else if(body.error) {
            callback('Unable to find location');
        }
        else {
            const data = {
                weather: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                location: body.location.region
            };
            callback(undefined,data);
        }
    });
};
module.exports = weather;