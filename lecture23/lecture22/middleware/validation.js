const mongoose = require('mongoose');
const { sendResponse } = require('../utils/response');

const validateObjectId = (req, res, next) => {
  const { blogId, userId } = req.body;
  if (blogId && !mongoose.Types.ObjectId.isValid(blogId)) {
    return sendResponse(res, false, "Invalid Blog ID format");
  }
  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return sendResponse(res, false, "Invalid User ID format");
  }
  next();
};

module.exports = { validateObjectId };