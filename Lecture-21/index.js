const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./model/user");
const Blog = require("./model/blog");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Add User (with email check)
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.json({ message: "User saved successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Blog
// Add Blog (requires userId)
app.post("/blogs", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const blog = new Blog({ userId, title, content });
    await blog.save();

    res.json({ message: "Blog saved successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Blogs with user details
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("userId", "name email"); // populate user details
  res.json(blogs);
});

// Get all Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
