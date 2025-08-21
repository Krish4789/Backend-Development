const express = require('express');

const app = express();

const mongoose = require('mongoose');

const BlogModel = require("./model/blogs")

app.use(express.static(__dirname + "/public"));

app.get("/health", (req, res) => {
    res.json({
        status: "Ok",
        message: "Server is running ok"
    });
});



mongoose.connect('mongodb://127.0.0.1:27017/G14')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))

function addBlog() {
    let blog = new BlogModel({
    title: "My First Blog",
    author: "Krish",
    body: "This is my first blog created using Mongoose!",
    comments: [
      {
        body: "Great post!",
        date: new Date(),
      },
    ],
    hidden: false,
    meta: {
      votes: 10,
      favs: 5,
    },
  });

  let newBlog = new BlogModel(blog);
  newBlog.save().then(() => {
    console.log("Blog added successfully")
  })
}

addBlog()

app.listen(3323, () => {
    console.log("Server Started on port 3323");
});
