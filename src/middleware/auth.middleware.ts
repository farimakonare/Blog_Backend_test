import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    // If no token, deny access
    if (!authHeader || authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }
    
    const token = authHeader.split(" ")[1];

    try {
        
        const decoded = Jwt.verify(token, JWT_SECRET) as { id: string };
        
        (req as CustomRequest).user = { id: decoded.id };
        
        next(); 
        } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

}

export interface CustomRequest extends Request {
    user?: {
      id: string;
    };
  }