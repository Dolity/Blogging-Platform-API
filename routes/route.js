const express = require('express');

const { createPost, getPosts, getPost, updatePost, deletePost, searchPost } = require('../controller/postController');
const postSchema = require('../util/validationSchemas');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();


router.post('/post', validateRequest(postSchema), createPost)
router.get('/posts', getPosts)
router.get('/post/:id', getPost)
// router.get('/posts', searchPost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

module.exports = router;