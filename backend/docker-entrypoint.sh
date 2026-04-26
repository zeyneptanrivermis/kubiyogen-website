#!/bin/sh

# Wait for database to be ready (optional but recommended)
echo "Waiting for database..."

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed

# Start the application
npm run start
