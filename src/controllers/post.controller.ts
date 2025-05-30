import Post from "../models/post.model";
import { Request, Response } from "express";

// Create a blog post

export const createPost = async (req : Request, res: Response) => {

    try {
        
        const {title, content, author} = req.body;
        const newPost = new Post({title, content, author});
        await newPost.save();

        const formatedOutput = newPost.toObject() as any;

        const response = {
            "id": formatedOutput._id,
            "title": formatedOutput.title,
            "content": formatedOutput.content,
            "author": formatedOutput.author,
            "createdAt": formatedOutput.createdAt,
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(404).json({"message" : "Failed to create a blog post"});
    }
};


// Get all blog posts 

export const getPosts = async (req : Request , res : Response) => {
    
    try {
        const posts = await Post.find();

        const formatedOutput = posts.map((eachPost) => {
            const post = eachPost.toObject() as any;

            return {
                "id": post._id,
                "title": post.title,
                "content": post.content,
                "author": post.author,
                "createdAt": post.createdAt,
            }
        });

        res.json(formatedOutput);
    } catch (error) {
        res.status(404).json({'message' : 'Error on the server'});
    }
};

// Get a single blog post
  
  export const getPost = async (req: Request, res: Response): Promise<void> => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message : 'Post not found!'});
            return;
        }

        const formatedOutput = post.toObject() as any;

        const response = {
            "id": formatedOutput._id,
            "title": formatedOutput.title,
            "content": formatedOutput.content,
            "author": formatedOutput.author,
            "createdAt": formatedOutput.createdAt,
        }

        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
};


// Update a blog post

export const updatePost = async (req : Request, res : Response): Promise<void> => {

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new : true, runValidators : true}
        );
        if (!updatedPost){
            res.status(404).json({ message : 'blog post not found!'});
            return;
        }  

        const formatedOutput = updatedPost.toObject() as any;

        const response = {
            "id": formatedOutput._id,
            "title": formatedOutput.title,
            "content": formatedOutput.content,
            "author": formatedOutput.author,
            "updatedAt": formatedOutput.updatedAt,
        }

        res.json(response);
    } catch (error) {
        res.status(400).json({ message : 'failed to update the blog post'});
    }
};

// Delete a blog post

export const deletePost = async (req : Request, res : Response): Promise<void> => {
    
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            res.status(404).json({'message' : 'Blog post not found!'});
            return;
        }  
        res.json({message : 'Blog post deleted successfully'});
    } catch (error) {
        res.status(400).json({ message : 'failed to delete the blog post'});
    }
};

 