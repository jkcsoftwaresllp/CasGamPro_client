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

# Expose port 1060 to match docker-compose
EXPOSE 1060

# Start the app using port 1060
CMD ["serve", "-s", "dist", "-l", "1060"]
