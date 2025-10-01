FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

ENV PORT=3001
# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm","run","dev"]
