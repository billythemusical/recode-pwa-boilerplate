// more info https://stackoverflow.com/questions/16998998/mongodb-how-to-define-a-schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  name: String,
  email: String,
  default_closet: String
  closet: [ 
      {
          name: String,
          category: String,
          img: String,
          temp: { hi: Number, lo: Number },
          priority: Number
      }
  ]
});

const defaultCloset = [
        {
            name: "beanie",
            category: "hat",
            default_set: ["male", "female", "non"],
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/beanie.png?v=1642731833951")
        },
        {
            name: "body",
            category: "none",
            default_set: ["male", "female", "non"],
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/body.png?v=1642731834063")
        },
        {
            name: "jacket",
            category: "top",
            default_set: ["male", "female", "non"],
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/jacket.png?v=1642731834040")
        },
        {
            name: "jeans",
            category: "bottom",
            default_set: ["male", "female", "non"],
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/jeans.png?v=1642731834628")
        },
        {
            name: "parka",
            category: "top",
            default_set: ["male", "non"],
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/parka.png?v=1642731834675")
        },
        {
            name: "shorts",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/shorts.png?v=1642731834200")
        },
        {
            name: "snow-pants",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/snow-pants.png?v=1642731834707")
        },
        {
            name: "sunglasses",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/sunglasses.png?v=1642731834851")
        },
        {
            name: "tank-top",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/tank-top.png?v=1642731834978")
        },
        {
            name: "tshirt",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/tshirt.png?v=1642731835589")
        },
        {
            name: "umbrella",
            img: loadImage("https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/umbrella.png?v=1642731835865")
        }
    ];
]
const db = mongoose.model('dev-d4w', users)

module.exports = db;


// {
//   "name": String, // user short name
//   "email": String, // user email for logging in
//   "default_set": String, // male, female, non - to deliver a basic set of clothes
//"closet": [ // the clothes in their closet, everyone starts out with a set
//       {
//           name: String, // "red beanie", user defined?
//           category: String, // "top", "bottom", "hat", "accessory"
//           img: String, // url to image, should be on server or cdn
//           temp: { hi: Number, lo: Number }, // to parse for temp, when to show it
//           priority: Number, // from 0 to n, which piece to show in range for multiple, when tapped, it cycles through
//       }
//   ]
// }