const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  "name": String,
  "status": String
});

const db = mongoose.model('todos', users)

module.exports = db;