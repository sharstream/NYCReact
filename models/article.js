const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(new Schema ({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true }
}), articleSchema);