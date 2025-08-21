const mongoose = require("mongoose");   
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [
    {
      body: String,
      date: Date,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

let BlogModel = mongoose.model("Blog", blogSchema);

// Optional function to add blog (corrected)
/*
async function addBlog() {
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

  await blog.save();
  console.log("Blog added successfully");
}

// You will call addBlog() only after connecting DB
*/

module.exports = BlogModel;
