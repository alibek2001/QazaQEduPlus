#!/bin/bash

# Set environment variables
export MONGODB_URI="mongodb+srv://alibekniyaz01:EbKzLOQF8PmuXkIw@cluster0.ysa0va2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export JWT_SECRET="qazaqeduplus_secret_key"
export PORT=5001

# Start the frontend in the background
echo "Starting frontend..."
cd "$(dirname "$0")"
npm run dev &
FRONTEND_PID=$!

# Start the backend in the background
echo "Starting backend..."
cd "$(dirname "$0")/server"
npm run dev &
BACKEND_PID=$!

# Function to clean up processes on exit
cleanup() {
  echo "Shutting down..."
  kill $FRONTEND_PID
  kill $BACKEND_PID
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM

# Wait for processes
echo "Project is running! Press Ctrl+C to stop."
wait
