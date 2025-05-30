import express from "express";
import { createPost, getPosts, getPost, updatePost, deletePost } from "../controllers/post.controller";

const router =  express.Router();

router.post('/blogs', createPost);
router.get('/blogs', getPosts);
router.get('/blogs/:id', getPost);
router.put('/blogs/:id', updatePost);
router.delete('/blogs/:id', deletePost);

export default router;
