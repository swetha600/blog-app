import "../loadEnvironment.mjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI || "");

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error("MongoDB connection failed:", e.message);
  process.exit(1);
}

const db = conn.db(process.env.DB_NAME || "blog");
export default db;
