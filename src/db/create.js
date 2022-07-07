const mongoose = require('mongoose')

module.exports = {
  connect: (url) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: false
    }).then((db) => {
      console.log("Connected to the Mongodb database.", "log");
    }).catch((err) => {
      console.log("Unable to connect to the Mongodb database. Error:" + err, "error");
    });
  }
}