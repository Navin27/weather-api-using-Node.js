const request = require('request');
var api_key = '3502878cf620a9816c7d4e5a4028ba55';


var getWeather =(latitude, longnitude, callback)=>{
  request(
    {
      url :`https://api.darksky.net/forecast/${api_key}/${latitude},${longnitude}`,
      json : true
    },(error, response, body) =>
      {
        if(!error && response.statusCode===200)
        {
          callback(undefined, {
            temperature : body.currently.temperature ,
            humidity : body.currently.humidity
          });
        }
        else
        {
          callback('Unable to fetch the weather.');
        }
  });
};

module.exports.getWeather = getWeather;
