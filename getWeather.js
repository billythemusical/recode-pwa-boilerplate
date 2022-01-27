const fetch = require('node-fetch');
const config = require('./config');
const { URL, URLSearchParams } = require('url');

// --- Open Weather API ---
const apiKey = config.OW_API_KEY


async function getWeather (req, res) {

  console.log('getWeather', req.body)
  
  try{
    
    let url = new URL("http://api.openweathermap.org/data/2.5/weather")
    let params = new URLSearchParams ({
        units: "imperial",
        appid: apiKey,
        q: "New York"
    })
    
    // Check if the request has a city or coordinates
    if (req.body.city) {
      params.q = req.body.city
    } else if (req.body.coords) {
      let {lat, lon} = req.body.coords
      params.lat = `lat=${lat}`
      params.lon = `lon=${lon}`
    }
    
    url.search = params
    
    // Ping OW API to get weather and wait for it...
    let data = await fetch(url);
    data = await data.json()
        
    console.log('got weather, sending weather to client')
    return res.json(data)
    
  } catch(error){
    console.error(error);
    return res.json(error);
  }
}

module.exports = getWeather