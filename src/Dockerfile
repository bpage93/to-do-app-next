# Step 1: Use the official Node.js image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies

# Step 4: Copy the rest of the app
COPY . .

EXPOSE 8080

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose port and start the app

CMD ["npm", "run", "start"]
