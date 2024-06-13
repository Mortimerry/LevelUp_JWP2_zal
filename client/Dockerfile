# client/Dockerfile

# Step 1: Build the react app
FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]