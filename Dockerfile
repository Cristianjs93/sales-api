# Base Node.js image
FROM node:20.11.1-alpine

# Work directory
WORKDIR /app

# Copy the project files to the container
COPY package*.json ./
COPY prisma ./prisma

# Dependencies installation
RUN npm cache clean --force
RUN npm install

# Prisma client generation
RUN npx prisma generate

# Copy the remaining files
COPY . .

# App building
RUN npm run build

# Port exhibition
EXPOSE 3000

# Run command
CMD ["npm", "run", "start:migrate:prod"]
