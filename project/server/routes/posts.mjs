import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const collection = db.collection("posts");

const validate = (body) => {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  if (!title || !content || !author) return null;
  return { title, content, author };
};

const parseId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

// GET /posts - all posts, newest first
router.get("/", async (_req, res, next) => {
  try {
    const results = await collection.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(results);
  } catch (e) { next(e); }
});

// GET /posts/:id - single post
router.get("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const post = await collection.findOne({ _id });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (e) { next(e); }
});

// POST /posts - create
router.post("/", async (req, res, next) => {
  try {
    const data = validate(req.body);
    if (!data) return res.status(400).json({ error: "title, content and author are required" });
    const doc = { ...data, createdAt: new Date(), updatedAt: new Date() };
    const result = await collection.insertOne(doc);
    res.status(201).json({ ...doc, _id: result.insertedId });
  } catch (e) { next(e); }
});

// PATCH /posts/:id - update
router.patch("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const data = validate(req.body);
    if (!data) return res.status(400).json({ error: "title, content and author are required" });
    const result = await collection.findOneAndUpdate(
      { _id },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(result);
  } catch (e) { next(e); }
});

// DELETE /posts/:id - remove
router.delete("/:id", async (req, res, next) => {
  try {
    const _id = parseId(req.params.id);
    if (!_id) return res.status(400).json({ error: "Invalid post id" });
    const result = await collection.deleteOne({ _id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (e) { next(e); }
});

export default router;
