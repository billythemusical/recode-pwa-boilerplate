const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const { URL, URLSearchParams } = require('url');

const PORT = config.PORT;

// ---- Connect to mongodb here ----
// read in mongoose library
const mongoose = require('mongoose');
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// --- connect to your collection ---
const todos = require('./models/todo');

// --- Open Weather API ---
const owApiKey = config.OW_API_KEY
// console.log(owApiKey)


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



// ---- ADD YOUR API ENDPOINTS HERE ----
// GET: "api/v1/todos"
app.get("/api/v1/todos", async (req, res) => {
  try{
    const data = await todos.find();
    res.json(data);
  } catch(error){
    console.error(error);
    res.json(error);
  }
});

// POST: "/weather"
app.post("/weather", async (req, res) => {
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
    res.json(data);
    
  } catch(error){
    
    console.error(error);
    res.json(error);
    
  }
});

// POST: "api/v1/todos"
app.post("/api/v1/todos", async (req, res) => {
  try{
    const newData = {
      todo: req.body.todo,
      status: req.body.status
    }
    const data = await todos.create(newData);
    res.json(data);
  } catch(error){
    console.error(error);
    res.json(error);
  }
});

// PUT: "api/v1/todos:id"
app.put("/api/v1/todos/:id", async (req, res) => {
  try{
    const updatedData = {
      todo: req.body.todo,
      status: req.body.status
    }
    const data = await todos.findOneAndUpdate({_id: req.params.id}, updatedData, {new:true});
    res.json(data);
  } catch(error){
    console.error(error);
    res.json(error);
  }
});

// DELETE: "api/v1/todos:id"
app.delete('/api/v1/todos/:id', async (req, res) => {
  try {
  const deletedDocument = await todos.findOneAndDelete(req.params.id);
  res.json({"message":"successfully removed item", "data": JSON.stringify(deletedDocument) });
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`see the magic: http://localhost:${PORT}`);
})