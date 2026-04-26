# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --quiet

# Generate Prisma Client
RUN npx prisma generate

# Copy app source
COPY . .

# Build TypeScript
RUN npm run build

# Copy entrypoint script
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Expose port
EXPOSE 5000

# Use entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
