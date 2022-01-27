const fetch = require('node-fetch')
const config = require('./config');
const { URL, URLSearchParams } = require('url');

// --- Open Weather API ---
const owApiKey = config.OW_API_KEY


const getWeather = (req, res, next) => {
  console.log('got a weather request')
  let city = "New York"
  
  try{
    let owUrl = new URL("http://api.openweathermap.org/data/2.5/weather")
    let owParams = new URLSearchParams ({
        units: "imperial",
        appid: owApiKey,
        q: city
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
    data = await data.json()
    
    // and send to our client
    return res.json(data);
    next()
    
  } catch(error){
    
    console.error(error);
    res.json(error);
    next()
    
  }
}