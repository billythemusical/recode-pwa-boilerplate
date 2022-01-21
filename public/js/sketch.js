let dev = true;

// if (!dev) {
// 	let slider = document.getElementById('tempSlider')
// 	slider.style.display = "none"
// }

let newTempInput;
let clothes;
let outfit;
let city = "New York"
let gotWeather = false
let temp = "Waiting..."
let tempMin = ""
let tempMax = ""
let weather = ""

let tb; // text box
let bt; // big temp display

function setup () {
  // Create the canvas
   createCanvas(windowWidth, windowHeight);

  // Setting up our text box
  tb = createDiv(temp);
  tb.style("font-family", "Courier");
  tb.style("font-size", "15px");
  tb.position(width * 0.05, height * 0.05);
  tb.size(500, 500);

  // Setting up our temp box
  bt= createDiv(temp);
  bt.style("font-family", "Arial");
  bt.style("font-size", "130px");
  bt.position(width * 0.05, height * 0.1);
  bt.size(500, 500);

  // Get the clothes out of the closet
  clothes = closet(p);

  // Check the weather and let everyone know if we did
  gotWeather = checkWeather();
};

function draw () {
  background(200);
  displayWeather();
  getDressed();
};

function windowResized () => {
		p.resizeCanvas(p.windowWidth, p.windowHeight);
	}

	const checkWeather = async () => {
		try {
			let apiKey = "2f60ed4cfa911d3aaea5e3418a10bf74"
			let url = "http://api.openweathermap.org/data/2.5/weather?q=New%20York&units=imperial&appid=" + apiKey
			let response = await fetch(url) //, { credentials: "same-origin" })
			let data = await response.json()
			// These may come in as strings so we put them into integers
			temp = parseInt(data.main["temp"])
			tempMin = parseInt(data.main["temp_min"])
			tempMax = parseInt(data.main["temp_max"])
			weather = data.weather[0]
			console.log('weather id: ', weather.id)
			console.log('weather descritpion: ', weather.description)

			console.log("Got the weather", temp + 'º F')

			// Now...
			pickOutfit();
			document.getElementById('tempSlider').value = temp;
			console.log('setting the temp slider value')

			return true

		} catch (e) {
			console.log("Error: ", e)
			return false
		}	
		
	}

	const displayWeather = async () => {
		// Display all the stuff we want to display
		// p.text("New York", 10, 20);
		// p.text(tempMin + "º to " + tempMax + "º F", 10, 40);
		// p.text("Currently " + temp + "º F and " + weather, 10, 60);

		if(gotWeather) {
			let info = ''
			info += city + '<br>'
			info += tempMin + 'º to ' + tempMax + 'º F<br>'
			info += 'Currently ' + temp + 'º F and ' + weather.description
			tb.html(info)

			bt.html(temp + 'º')
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
			case weather.id == 800 && temp > 50:
				outfit.push('sunglasses')
				break
		}

		console.log('Picked outfit')
		if(outfit) outfit.forEach(o => console.log(o))
	}

	const getDressed = () => {
		if(clothes && outfit) {
			// Look through all our clothes
			for (let c of clothes) {
				// if the outfit calls for a piece of clothing
				if (outfit.includes(c.name)) {
					// display that piece of clothing
					p.image(c.image, 0, 0)
					// console.log("outfit: ", c.name, c.image)
				}
			}
		}
	}

	newTempInput = (e) => {
		temp = Math.floor(Math.abs(e.value))
		pickOutfit()
		console.log('Change clothes!')
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