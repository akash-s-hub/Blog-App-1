const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogDescription: String
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;