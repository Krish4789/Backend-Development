const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  content:
  { 
    type: String, 
    required: true 
  },
  date: { type: Date, default: Date.now },
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



const BlogModel = mongoose.model('Blog', blogSchema);
module.exports = BlogModel;