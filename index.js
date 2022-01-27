const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
// const { URL, URLSearchParams } = require('url');
const getWeather = require('./getWeather')

const app = express();

const PORT = config.PORT;

// ---- Connect to mongodb here ----
// read in mongoose library
const mongoose = require('mongoose');
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// --- connect to your collection ---
const db = require('./models/users');

// --- Open Weather API ---
const owApiKey = config.OW_API_KEY

// Handle data in a nice way
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// Set your static html file
app.get("/", (req, res) => {
  res.sendFile( path.resolve(__dirname + "/views/index.html"))
});

// app.get("/images", (req,res) => {
//   res.sendFile(path.resolve(`${__dirname}/images`))
// })

// POST: "/weather"
app.get("/weather", getWeather, (req, res) => {
  console.log('got a weather request')
  console.log('req:', req)
  console.log('res:', res)
//   let city = "New York"
//   try{
//     let owUrl = new URL("http://api.openweathermap.org/data/2.5/weather")
//     let owParams = new URLSearchParams ({
//         units: "imperial",
//         appid: owApiKey,
//         q: city
//     })

//     // Check if the request has a city or coordinates
//     if (req.body.city) {
//       owParams.q = req.body.city
//     } else if (req.body.coords) {
//       let {lat, lon} = req.body.coords
//       owParams.lat = `lat=${lat}`
//       owParams.lon = `lon=${lon}`
//     }
//     owUrl.search = owParams
    
//     // Ping OW API to get weather 
//     let data = await fetch(owUrl);
//     data = await data.json()
    
//     // and send to our client
    // res.json(data);
    
//   } catch(error){
    
//     console.error(error);
//     res.json(error);
    
//   }
});

// Start listening
app.listen(PORT, () => {
  console.log(`see the magic: http://localhost:${PORT}`);
})