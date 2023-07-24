import express from 'express'
import { addPost, deletePost, getPost, getPosts, updatePost, updatePostLikes } from '../controllers/post.js'
const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)
router.put('/likes/:id', updatePostLikes)

export default router