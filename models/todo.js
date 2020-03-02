const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  "todo": String,
  "status": String
});

const db = mongoose.model('todos', todoSchema)

module.exports = db;