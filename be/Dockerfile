# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from build stage
COPY --from=build /app ./

# Expose port
EXPOSE 3000

# Set Node environment to production
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"] 