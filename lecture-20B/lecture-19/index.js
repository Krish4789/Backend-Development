const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BlogModel = require("./model/blogs")

app.use(express.json()); // ✅ To parse JSON request bodies
app.use(express.static(__dirname + "/public"));

app.get("/health", (req, res) => {
    res.json({
        status: "Ok",
        message: "Server is running ok"
    });
});

// ✅ Read All Blogs
app.get("/readAllBlogs", async (req, res) => {
  try {
    let allblogs = await BlogModel.find();
    res.json({
      success: true,
      data: allblogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ✅ Add Blog
app.post("/addBlog", async (req, res) => {
  try {
    const { title, author, body, comments, hidden, meta } = req.body;

    let newBlog = new BlogModel({
      title,
      author,
      body,
      comments,
      hidden,
      meta
    });

    await newBlog.save();

    res.json({
      success: true,
      message: "Blog added successfully",
      data: newBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ✅ Update Blog
app.put("/updateBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    let updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // return updated doc
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ✅ Delete Blog
app.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedBlog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/G14')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))

app.listen(3323, () => {
    console.log("Server Started on port 3323");
});
