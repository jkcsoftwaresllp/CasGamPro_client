FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port to match docker-compose
EXPOSE 2060

# Start the app using port 
CMD ["serve", "-s", "dist", "-l", "2060"]
