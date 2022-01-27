// more info https://stackoverflow.com/questions/16998998/mongodb-how-to-define-a-schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { defaultCloset } = require('./defaultCloset')

const users = new Schema( 
  { users: [
      {
        name: String,
        email: String,
        default_set: ["male", "female", "non"],
        closet: defaultCloset
      }
    ]
  }
)

const db = mongoose.model('dev-d4w', users)

module.exports = {
  db,
  defualtCloset
}


// {
//   "name": String, // user short name
//   "email": String, // user email for logging in
//   "default_set": String, // male, female, non - to deliver a basic set of clothes
//   "closet": [ // from defaultCloset.js, the default clothes in their closet based on any gender input, everyone starts out with a set from non?
//       {
//           name: String, // "red beanie", user defined?
//           category: String, // "top", "bottom", "hat", "accessory"
//           default_set: ["male", "female", "non"],
//           temp_range: {hi: 0, lo: 0},
//           img: String, // url to image, should be on server or cdn
//           temp_range: { hi: Number, lo: Number }, // to parse for temp, when to show it
//           priority: Number, // from 0 to n, which piece to show in range for multiple, when tapped, it cycles through
//       }
//   ]
// }