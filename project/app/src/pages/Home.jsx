import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api.js";
import PostSummary from "../components/PostSummary.jsx";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts().then(setPosts).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="notice error">Couldn't load posts: {error}</p>;
  if (!posts) return <p className="notice">Loading posts…</p>;
  if (posts.length === 0)
    return <p className="notice">No posts yet. <Link to="/create">Write the first one.</Link></p>;

  return (
    <>
      <h1>Latest posts</h1>
      {posts.slice(0, 5).map((p) => <PostSummary key={p._id} post={p} />)}
      {posts.length > 5 && <p><Link to="/archive">See all {posts.length} posts in the archive</Link></p>}
    </>
  );
}
