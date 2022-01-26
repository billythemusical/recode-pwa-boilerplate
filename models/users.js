const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  "name": String,
  "email": String,
  "closet": [
      {
          name: String,
          img: String,
          hi: Number
      }
  ]
  }
});

const db = mongoose.model('dev-d4w', users)

module.exports = db;