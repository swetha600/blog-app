import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../api.js";
import { formatDate } from "../components/PostSummary.jsx";

export default function Archive() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts().then(setPosts).catch((e) => setError(e.message));
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  if (!posts && !error) return <p className="notice">Loading posts…</p>;

  return (
    <>
      <h1>Archive</h1>
      {error && <p className="notice error">{error}</p>}
      {posts && posts.length === 0 && <p className="notice">Nothing here yet.</p>}
      <ul className="archive">
        {posts?.map((p) => (
          <li key={p._id}>
            <span className="date">{formatDate(p.createdAt)}</span>
            <Link to={`/post/${p._id}`}>{p.title}</Link>
            <span className="actions">
              <Link to={`/edit/${p._id}`}>Edit</Link>
              <button className="link danger" onClick={() => remove(p._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
