const sendResponse = (res, success, message, data = null) => {
  res.json({ success, message, data });
};

module.exports = { sendResponse };