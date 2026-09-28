# Blog / Post Management App (React + Express + local MongoDB)

## Prerequisites
- Node.js 18+
- MongoDB Community Server running locally (default port 27017)

## Run the API
    cd server
    npm install
    npm start            # http://localhost:5050

## Run the React app
    cd app
    npm install
    npm run dev          # http://localhost:5173

## Configuration
server/.env: MONGO_URI (default mongodb://127.0.0.1:27017), DB_NAME, PORT
app/.env: VITE_API_URL (default http://localhost:5050)

## REST endpoints
GET /posts, GET /posts/:id, POST /posts, PATCH /posts/:id, DELETE /posts/:id
