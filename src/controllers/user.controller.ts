import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

//Register a user

export const createUser = async (req : Request, res: Response) => {

    try {
        const {username, password} = req.body;

         // Check if username already exists
         const existingUsername = await User.findOne({username});
         if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
          }

         // Create new user 
        const newUser = new User({username, password});
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }catch (error) {
        res.status(500).json({ message: "Server error during registration" });
      }
}

export const login = async (req : Request, res : Response) => {

    // Check if username already exists
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({ message: "Invalid input" });
          }
        
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid input" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Server error during login" });

    }
};