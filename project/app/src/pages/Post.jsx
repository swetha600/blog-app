import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost } from "../api.js";
import { formatDate } from "../components/PostSummary.jsx";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getPost(id).then(setPost).catch((e) => setError(e.message));
  }, [id]);

  async function remove() {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    try {
      await deletePost(id);
      navigate("/archive");
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) return <p className="notice error">{error}</p>;
  if (!post) return <p className="notice">Loading post…</p>;

  return (
    <article className="full">
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author} · {formatDate(post.createdAt)}
        {post.updatedAt !== post.createdAt && ` · edited ${formatDate(post.updatedAt)}`}
      </p>
      <div className="body">{post.content}</div>
      <div className="row">
        <Link className="btn" to={`/edit/${post._id}`}>Edit post</Link>
        <button className="link danger" onClick={remove}>Delete post</button>
      </div>
    </article>
  );
}
