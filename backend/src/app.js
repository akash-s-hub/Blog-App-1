const express = require("express");
const cors = require("cors");
const blogModel = require("./models/blog.model");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogModel.find();

    res.status(200).json({
      message: "blogs fetched successfully",
      blogs: blogs
    })
  } catch (e) {
    res.status(400).json({
      message: "error fetching notes"
    })
  }

})

app.get("/blogs/:blogid", async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blog = await blogModel.findOne({
      _id: blogid
    })

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message: "blog fetched successfully",
      blog: blog
    })
  } catch (e) {
    res.status(400).json({
      message: "error fetching note"
    })
  }
})

app.post("/create-blog", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    await blogModel.create({
      blogTitle: title,
      blogDescription: description
    })
    res.status(201).json({
      message: "blog created successfully"
    })
  } catch (e) {
    res.status(500).json({
      message: "failed to create blog"
    })
  }

})

module.exports = app;