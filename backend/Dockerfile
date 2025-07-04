# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port (change if your backend uses a different port)
EXPOSE 5000

# Set environment variables (override in docker-compose or at runtime)
ENV NODE_ENV=production

# Start the server