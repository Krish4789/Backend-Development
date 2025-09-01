const BlogModel = require('../model/blog');
const UserModel = require('../model/user');
const { sendResponse } = require('../utils/response');

const createBlog = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    if (!userId) {
      return sendResponse(res, false, "User ID is required");
    }
    
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return sendResponse(res, false, "User does not exist");
    }

    const newBlog = await BlogModel.create({ title, content, userId });
    userExists.blogs.push(newBlog._id);
    await userExists.save();
    
    sendResponse(res, true, "Blog created successfully", newBlog);
  } catch (err) {
    sendResponse(res, false, "Error creating blog: " + err.message);
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      return sendResponse(res, false, "Blog not found");
    }
    sendResponse(res, true, "Blog fetched successfully", blog);
  } catch (err) {
    sendResponse(res, false, "Error fetching blog: " + err.message);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate('userId');
    sendResponse(res, true, "Blogs fetched successfully", blogs);
  } catch (err) {
    sendResponse(res, false, "Error fetching blogs: " + err.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { blogId, userId } = req.body;
    
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return sendResponse(res, false, "Blog not found");
    }

    if (blog.userId.toString() !== userId) {
      return sendResponse(res, false, "You are not authorized to delete this blog");
    }

    await BlogModel.findByIdAndDelete(blogId);
    
    const user = await UserModel.findById(userId);
    if (user) {
      user.blogs = user.blogs.filter(bid => bid.toString() !== blogId);
      await user.save();
    }

    sendResponse(res, true, "Blog deleted successfully");
  } catch (err) {
    sendResponse(res, false, "Error deleting blog: " + err.message);
  }
};

module.exports = { createBlog, getBlog, getAllBlogs, deleteBlog };