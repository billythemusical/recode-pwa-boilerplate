let dev = true;

let clothes;
let outfit;
let city = "Brooklyn"
let loc = {}
let gotWeather = false
let temp = "Waiting..."
let tempMin = ""
let tempMax = ""
let tempSlider;
let weather;

let tb; // text box
let bt; // big temp display

function setup () {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  // imageMode(CENTER);
  
  // To simulate temperature changes
  tempSlider = createSlider(0, 100, 20, 1)
  tempSlider.position(10, 180)
  tempSlider.elt.oninput = newTempInput
  // tempSlider.elt.addEventListener("touchstart", newTempInput)

  // Setting up our text box
  tb = createDiv(temp);
  tb.style("font-family", "Courier");
  tb.style("font-size", "15px");
  tb.position(20, 20);
  // tb.size(windowWidth, windowHeight);

  // Setting up our temp box
  bt= createDiv(temp);
  bt.style("font-family", "Arial");
  bt.style("font-size", "110px");
  bt.position(10, 60);
  // bt.size(windowWidth, windowHeight);

  // Get the clothes out of the closet
  clothes = closet()
  
  // Get your location if possible (which kicks over to checkWeather)
  getLocation()
  
  // Set the refresh button
  document.getElementsByClassName('refresh-button')[0]
    .addEventListener('click', () => {
      console.log('Refreshing the weather')
      refreshWeather()
    })
};

function draw () {
  background(200);
  displayWeather();
  getDressed();
};

function windowResized () {
  resizeCanvas(windowWidth, windowHeight);
  // tb.size(windowWidth, windowHeight);
  // bt.size(windowWidth, windowHeight);

}

const checkWeather = async () => {
  
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
  if(loc.lat && loc.lon) {
    options.body = JSON.stringify({ "coords": { "lat": loc.lat, "lon": loc.lon } })
  } else {
    options.body = JSON.stringify({"city": city})                
  }
  
  try {
    // Get the weather from our server
    let data = await fetch('/weather', options)
    data = await data.json()
    // console.log('got data from /weather', data)
    
    if (data.weather && data.main) {
      
      temp = parseInt(data.main["temp"])
      tempMin = parseInt(data.main["temp_min"])
      tempMax = parseInt(data.main["temp_max"])
      weather = data.weather[0]
      
      // Set the favicon of the site to the weather
      const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}.png`
      setFavicon(iconUrl)
      
      // console.log('weather id: ', weather.id)
      console.log("Got the weather", temp + 'º F with ' + weather.description)
      
      // Now...
      pickOutfit();
      
      // Set the slider to match the weather
      tempSlider.value(temp)
      
      // Keep checking the weather 
      if(!dev) setTimeout(checkWeather, 5000)

      return true // for setting gotWeather
      
    }

  } catch (e) {
    console.log("Error: ", e)
    if(!dev) setTimeout(checkWeather, 5000)
    return false
    
  }
  
}

const refreshWeather = async () => {
  temp = "0"
  tempMin = "0" 
  tempMax = "0" 
  weather.description = "..."
  
  console.log('refreshing weather')
  
  await new Promise(r => setTimeout(r, 1000)); // artificial waiting
  
  checkWeather()
}

const displayWeather = async () => {
  
  if(weather && temp) {
    let info = ''
    info += city + '<br>'
    info += tempMin + 'º to ' + tempMax + 'º F<br>'
    info += 'Currently ' + temp + 'º F and ' + weather.description
    tb.html(info) // update the text box
    bt.html(temp + 'º') // Uudate big temp display
  }
  
}

const pickOutfit = () => {

  outfit = []

  switch (true) {
    case temp < 30:
      outfit = ["beanie", "parka", "snow-pants", "gloves", "scarf"]
      break
    case temp < 40:
      outfit = ["beanie", "parka", "jeans", "scarf"]
      break
    case temp < 50:
      outfit = ["jacket", "jeans", "scarf"]
      break
    case temp < 65:
      outfit = ["jacket", "jeans"]
      break
    case temp < 80:
      outfit = ["tshirt", "jeans"]
      break
    case temp < 90:
      outfit = ["tshirt", "shorts"]
      break
    case temp >= 90 && temp < 100:
      outfit = ["tank-top", "shorts", "flip-flops"]
      break
    case temp === 100:
      outfit = ["tank-top", "shorts", "flip-flops", "sunglasses,", "umbrella"]
      break
  }

  switch (true) {
    case weather.id >= 200 && weather.id < 600:
      outfit.push('umbrella')
      break
    case weather.id == 800:
      outfit.push('sunglasses')
      break
  }

  // console.log('Picked outfit')
  // if(outfit) console.log(outfit.toString())
}

const getDressed = () => {
  if(clothes && outfit) {
    // Look through all our clothes
    for (let c of clothes) {
      // if the outfit calls for a piece of clothing
      if (outfit.includes(c.name)) {
        // display that piece of clothing
        let w = c.img.width,
            h = c.img.height, 
            scale = 0.8
        image(c.img, -50, 50, w*scale, h*scale)
        // console.log("outfit: ", c.name, c.image)
      }
    }
  }
}

const newTempInput = (e) => {
  // temp = Math.floor(Math.abs(e.value))
  temp = tempSlider.value()
  pickOutfit()
  // console.log('Change clothes!')
}

const setFavicon = (iconUrl) => {
  // From https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
  }
  // link.href = iconUrl;  // http could be effecting the PWA install
}

const getLocation = async () => {
  console.log("Running getLocation")
  
  try {
    
    await navigator.geolocation.getCurrentPosition(async position => {
      loc.lat = position.coords.latitude
      loc.lon = position.coords.longitude
      console.log(`Your location is:\nlat: ${loc.lat} lon:${loc.lon}`)
      // Check the weather and let everyone know if we did  
      console.log('got location, checking weather')
      gotWeather = checkWeather()
    })
  } 
  catch (error) {
    console.error(`There was an error getting your exact location:\n${error}`)
    // Check the weather and let everyone know if we did
    console.log('got location, checking weather')
    gotWeather = checkWeather()
  }
}


/*
{
  "coord": {
	"lon": -74.006,
	"lat": 40.7143
  },
  "weather": [
	{
	  "id": 800,
	  "main": "Clear",
	  "description": "clear sky",
	  "icon": "01n"
	}
  ],
  "base": "stations",
  "main": {
	"temp": 16.59,
	"feels_like": 11.89,
	"temp_min": 11.12,
	"temp_max": 20.32,
	"pressure": 1029,
	"humidity": 44
  },
  "visibility": 10000,
  "wind": {
	"speed": 3,
	"deg": 330,
	"gust": 3
  },
  "clouds": {
	"all": 0
  },
  "dt": 1642293503,
  "sys": {
	"type": 2,
	"id": 2037026,
	"country": "US",
	"sunrise": 1642249070,
	"sunset": 1642283559
  },
  "timezone": -18000,
  "id": 5128581,
  "name": "New York",
  "cod": 200
}
*/