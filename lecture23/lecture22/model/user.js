const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  blogs:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
  ]
});



const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
