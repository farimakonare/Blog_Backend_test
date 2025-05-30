# Blog Backend API

This is a simple blog backend built using Node.js, Express, TypeScript, and MongoDB. It supports user registration and login, and lets users create, read, update, and delete blog posts. All blog actions are protected using JWT authentication.


## What this project does

- Users can register and log in
- Authenticated users can create blog posts
- Anyone can view all blog posts or a single one by ID
- Authenticated users can update or delete their own posts


## Tech used

- Node.js and Express (for the backend server)
- MongoDB and Mongoose (for the database)
- TypeScript (for better code structure)
- bcryptjs (for password hashing)
- jsonwebtoken (for secure login)
- dotenv (for managing environment variables)


## How to set it up

### Step 1: Clone the project
### Step 2: Install dependencies
### Step 3: Set up the `.env` file

Create a `.env` file in the root folder and add the following:
PORT=8000
MONGO_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=your_jwt_secret

You would have to change `MONGO_URI` to your MongoDB Atlas URI if you’re using cloud DB.


## How to run it

To start the server in development mode with live reload:

- npm run dev (this will use `ts-node` and `nodemon`)


## How authentication works

- When a user registers or logs in, the server responds with a JWT token.
- To access blog-related endpoints (like creating or deleting a blog), you must include the token in the `Authorization` header:   =>  Authorization: Bearer "token"


## API endpoints

### Auth

- `POST /auth/register` : register a new user
- `POST /auth/login` : login and get a token

### Blog posts

- `GET /blogs` : get all blog posts
- `GET /blogs/:id` : get a single post by ID
- `POST /blogs` : create a new post
- `PUT /blogs/:id` : update a post
- `DELETE /blogs/:id` : delete a post

## How to deploy on Render

1. Push your project to GitHub
2. Go to render.com
3. Create a new Web Service
4. Connect your GitHub repo
5. Set the environment variables in Render:
   - `PORT`
   - `MONGO_URI` 
   - `JWT_SECRET`
6. Set the build and start commands:
   - Build command: `npm install && npm run build`
   - Start command: `node dist/server.js`

## Extra notes

- `.gitignore` is already set to ignore unnecessary files like `node_modules`, `.env`, and build folders.
