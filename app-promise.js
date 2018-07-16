const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

  axios.get(geocodeUrl).then((response) => {
      if(response.data.status==='ZERO_RESULTS')
      {
        throw new Error('Unable to find that address');
      }
      var latitude = response.data.results[0].geometry.location.lat;
      var longnitude = response.data.results[0].geometry.location.lng;
      var api_key = '3502878cf620a9816c7d4e5a4028ba55';
      var wheatherUrl = `https://api.darksky.net/forecast/${api_key}/${latitude},${longnitude}`;
      console.log(response.data.results[0].formatted_address);
      return axios.get(wheatherUrl);
  }).then((response) => {
      var temperature = response.data.currently.temperature;
      var humidity = response.data.currently.humidity;
      console.log(`Its temperature : ${temperature}`);
      console.log(`Its humidity : ${humidity}`);

  }).catch((e) =>{
      if(e.code==='ENOTFOUND')
      {
        console.log('Unable to connect to API Server');
      }
      else {
        console.log(e.message);
      }
  })
