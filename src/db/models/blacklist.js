const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  user: String,
  guild: String
})
module.exports = mongoose.model('blacklist', schema)