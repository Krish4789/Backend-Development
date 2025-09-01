const UserModel = require('../model/user');
const { sendResponse } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return sendResponse(res, false, "User already exists");
    }
    const newUser = await UserModel.create({ name, email, password });
    sendResponse(res, true, "User added successfully", newUser);
  } catch (err) {
    sendResponse(res, false, "Error adding user: " + err);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate('blogs');
    sendResponse(res, true, "Users fetched successfully", users);
  } catch (err) {
    console.error('Error in getUsers:', err);
    sendResponse(res, false, "Error fetching users: " + err.message);
  }
};

module.exports = { register, getUsers };