const request = require('request');

var geocodeAddress = (address, callback) =>{

  var encodedAddress = encodeURIComponent(address);

  request(
    {
      url :`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json : true
    },(error, response, body) =>
      {
        if(error)
        {
          callback('Unable to connect to Google Srver.');
        }
        else if(body.status==='ZERO_RESULTS')
        {
          callback('Unable to find the address.');
        }
        else if(body.status==='OK')
        {
          callback(undefined, {
            address : body.results[0].formatted_address,
            Latitude : body.results[0].geometry.location.lat,
            Longnitude : body.results[0].geometry.location.lng
          });
        }
  });
};

module.exports.geocodeAddress= geocodeAddress;