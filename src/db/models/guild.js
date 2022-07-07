const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    GuildID: String,
    GuildName: String,
    PREFIX: String,
    Premium: Boolean,
    Message: String,
    Key: String
})

module.exports = mongoose.model("guild", dataSchema);