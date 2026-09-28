# Post Desk: Blog / Post Management Application

A full-stack web application for creating, viewing, updating and deleting blog posts.

**Flow:** React Frontend → `fetch()` → Express REST API → MongoDB

## Features

- Create a new post
- View all posts (latest posts on the home page, full list in the archive)
- View a single post
- Edit an existing post
- Delete a post (with a confirmation prompt)
- Loading, empty and error states on every page

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (local instance, or MongoDB Atlas) |
| Database driver | MongoDB Node.js driver |
| API calls | Browser's native `fetch()` |
| Configuration | `.env` files |

## Project Structure

```
project/
├── app/
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js              # all fetch() calls
│       ├── index.css
│       ├── components/
│       │   └── PostSummary.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Create.jsx      # used for both create and edit
│           ├── Post.jsx
│           └── Archive.jsx
└── server/
    ├── .env
    ├── package.json
    ├── index.mjs
    ├── loadEnvironment.mjs
    ├── db/
    │   └── conn.mjs
    └── routes/
        └── posts.mjs
```

## Prerequisites

- Node.js 18 or newer (`node -v` to check)
- MongoDB Community Server installed and running locally on port 27017
  (or a MongoDB Atlas connection string)

## Setup and Run

### 1. Start the API (Terminal 1)

```bash
cd server
npm install
npm start
```

The server runs on http://localhost:5050. You should see `Connected to MongoDB` and `Server listening on port 5050`.

### 2. Start the React app (Terminal 2)

```bash
cd app
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Configuration

**`server/.env`**

```
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=blog
PORT=5050
```

To use MongoDB Atlas instead, set `MONGO_URI` to your Atlas connection string:
`mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

**`app/.env`**

```
VITE_API_URL=http://localhost:5050
```

If you change the server `PORT`, update `VITE_API_URL` to match and restart `npm run dev`.

## REST API

Base URL: `http://localhost:5050/posts`

| Method | Endpoint | Description | Success |
|--------|----------|-------------|---------|
| GET | `/posts` | Get all posts (newest first) | 200 |
| GET | `/posts/:id` | Get a single post | 200 |
| POST | `/posts` | Create a post | 201 |
| PATCH | `/posts/:id` | Update a post | 200 |
| DELETE | `/posts/:id` | Delete a post | 200 |

**Request body (POST and PATCH):**

```json
{
  "title": "My first post",
  "author": "Sweth",
  "content": "Hello world"
}
```

**Post document stored in MongoDB:**

```json
{
  "_id": "ObjectId",
  "title": "string",
  "author": "string",
  "content": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Error responses:**

| Status | Meaning |
|--------|---------|
| 400 | Invalid post id, or `title`, `author` or `content` missing |
| 404 | Post not found |
| 500 | Internal server error |

## Pages

| Route | Page |
|-------|------|
| `/` | Home: latest posts |
| `/archive` | Archive: all posts with edit and delete |
| `/create` | New post form |
| `/edit/:id` | Edit post form |
| `/post/:id` | Single post view |

## Troubleshooting

- **Server exits with "MongoDB connection failed":** MongoDB is not running, or `MONGO_URI` is wrong. For Atlas, also check the username, password and Network Access IP list.
- **"Couldn't load posts" in the browser:** the API is not running, or the port in `app/.env` does not match the server port.
- **`localhost` fails to connect to MongoDB:** use `127.0.0.1` in `MONGO_URI`.
