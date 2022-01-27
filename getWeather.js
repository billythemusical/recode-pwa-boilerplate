const fetch = require('node-fetch');
const config = require('./config');
const { URL, URLSearchParams } = require('url');

// --- Open Weather API ---
const owApiKey = config.OW_API_KEY


async function getWeather (req, res, next) {
  console.log('<<-->>')
  console.log('getWeather req', req.body)
  
  try{
    let owUrl = new URL("http://api.openweathermap.org/data/2.5/weather")
    let owParams = new URLSearchParams ({
        units: "imperial",
        appid: owApiKey,
        q: "New York"
    })

    // Check if the request has a city or coordinates
    if (req.body.city) {
      owParams.q = req.body.city
    } else if (req.body.coords) {
      let {lat, lon} = req.body.coords
      owParams.lat = `lat=${lat}`
      owParams.lon = `lon=${lon}`
    }
    owUrl.search = owParams
    
    // Ping OW API to get weather 
    let data = await fetch(owUrl);
    data = data.json()
    
    // and send to our client
    return res.json(data)
    
    
  } catch(error){
    
    console.error(error);
    return res.json(error);
    
  }
  
next()
  
}

module.exports = getWeather