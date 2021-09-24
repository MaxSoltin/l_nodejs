const express = require('express')
const router = express.Router()
const { getPost, getEditPost, editPost, deletePost, getPosts, addPost, getAddPost } = require('../controllers/post-controller')

router.get('/post/:id', getPost)
router.get('/edit/:id', getEditPost)
router.put('/edit/:id', editPost)
router.delete('/post/:id', deletePost)
router.get('/posts', getPosts)
router.post('/add-post', addPost)
router.get('/add-post', getAddPost)

module.exports = router