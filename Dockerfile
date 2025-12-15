# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm config set registry https://registry.npmjs.org/ && npm install --omit=dev

# Copy the rest of the application
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose app port
EXPOSE 5000

# Environment variables
ENV NODE_ENV=production

# Start the app
CMD ["node", "index.js"]
