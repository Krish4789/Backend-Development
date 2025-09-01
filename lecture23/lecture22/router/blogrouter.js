const express = require('express');
const router = express.Router();
const { createBlog, getBlog, getAllBlogs, deleteBlog } = require('../controllers/blogController');
const { validateObjectId } = require('../middleware/validation');

router.post('/blogs', createBlog);
router.get('/blogs/:id', getBlog);
router.get('/blogs', getAllBlogs);
router.get('/allblogs', getAllBlogs);
router.delete('/blogs', validateObjectId, deleteBlog);

module.exports = router;