const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BlogModel = require('./model/blog');
let UserModel = require('./model/user');


app.use(express.static(__dirname+'/public'));
app.use(express.json());              
app.use(express.urlencoded({ extended: true }));  

app.get('/health', (req, res) => 
  {
    res.json(
      {
        status:"ok",
        message: "Welcome to the server!"
      }
    )
  }
);

mongoose.connect('mongodb://127.0.0.1:27017/user')
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error', err));


app.post('/register', async(req, res) => {
  try {
    const { name, email,password } = req.body;
    let userexists = await UserModel.findOne({ email: email });
    if (userexists) {
      return res.json({
        success: false,
        message: "User already exists"
      });
    }
    let newuser = await UserModel.create({ 
      name:name, 
      email:email,
      password:password 
    })
    res.json({
      success: true,
      message: "User added successfully",
      data: newuser
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error adding user: " + err
    });
  }
}
);

app.get('/users', async(req, res) => {
  try {
    let users = await UserModel.find().populate('blogs');
    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error fetching users: " + err
    });
  }
});


app.post('/blogs', async(req, res) => {
  let { title, content, userId } = req.body;
  if(!userId)
  {
    return res.json({
      success: false,
      message: "User ID is required"
    });
  }
  let userExists = await UserModel.findById(userId);
  if (userExists == null)
  {
    return res.json({
      success: false,
      message: "User does not exist"
    });
  }

  let newBlog = await BlogModel.create(
  { 
    title: title, 
    content: content, 
    userId: userId
   });
  res.json({
    success: true,
    message: "Blog created successfully",
    data: newBlog
  });
  //add blog in user also
  userExists.blogs.push(newBlog._id);
  await userExists.save();
}
);

app.get('/blogs/:id', async(req, res) => 
{
  let blogId = req.params.id;
  let blog = await BlogModel.findById(blogId);
  if(blog == null)
  {
    return res.json({
      success: false,
      message: "Blog not found"
    });
  }
  res.json({
    success: true,
    message: "Blog fetched successfully",
    data: blog
  }); 
});

app.get('/allblogs', async(req, res) => 
{
  let blogs = await BlogModel.find().populate('userId');
  res.json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs
  });

})


// app.delete('/blogs', async(req, res) =>
// {
//   let { blogId, userId } = req.body;
//   if(!blogId || !userId)
//   {
//     return res.json({
//       success: false,
//       message: "Blog ID and User ID are required"
//     });
//   }
//   let blog = await BlogModel.findById(blogId);
//   if(blog == null)
//   {
//     return res.json({
//       success: false,
//       message: "Blog not found"
//     });
//   }
//   if(blog.userId.toString() !== userId)
//   {
//     return res.json({
//       success: false,
//       message: "You are not authorized to delete this blog"
//     });
//   }
//   await BlogModel.findByIdAndDelete(blogId);
//   // let user = await UserModel.findById(userId);
//   // user.blogs = user.blogs.filter(bid => bid.toString() !== blogId);
//   // await user.save();


// });

app.delete('/blogs', async (req, res) => {
  let { blogId, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.json({
      success: false,
      message: "Invalid Blog ID or User ID format"
    });
  }

  let blog = await BlogModel.findById(blogId);
  if (!blog) 
  {
    return res.json({
      success: false,
      message: "Blog not found"
    });
  }

  if (blog.userId.toString() !== userId) {
    return res.json({
      success: false,
      message: "You are not authorized to delete this blog"
    });
  }

  await BlogModel.findByIdAndDelete(blogId);

  let user = await UserModel.findById(userId);
  if (user) {
    user.blogs = user.blogs.filter(bid => bid.toString() !== blogId);
    await user.save();
  }

  res.json({
    success: true,
    message: "Blog deleted successfully"
  });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);