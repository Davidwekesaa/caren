const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  About: {
    type: String,
  },
});

module.exports = mongoose.model("About", aboutSchema);
