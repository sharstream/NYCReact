const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema ({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true }
});

module.exports = mongoose.model("Article", articleSchema);