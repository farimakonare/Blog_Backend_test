# Use Node.js 22 base image
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the server
CMD ["npm", "run", "dev"]

