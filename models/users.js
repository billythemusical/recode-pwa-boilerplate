const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  "name": String,
  "email": String
});

const db = mongoose.model('todos', users)

module.exports = db;