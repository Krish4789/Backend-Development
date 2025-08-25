const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: { type: String, required: true },  
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required: true}
});
module.exports = mongoose.model("Blog", blogSchema);
