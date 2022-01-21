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

// GET: "/weather"
app.get("weather", async (req, res) => {
  try{
    let city;
    if (req.body.city) {
      city = req.body.city
    } else if (req.body.coords) {
      city = req.body.coords
    }
    const owUrl = "http://api.openweathermap.org/data/2.5/weather"
    const owParams = new URLSearchParams ({
      q: city.JSONStringify(),
        units: "imperial",
          appid: owApiKey
    })
    owUrl.search = owParams
    const data = await fetch(owUrl);
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