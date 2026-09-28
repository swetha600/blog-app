import { Link } from "react-router-dom";

export const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function PostSummary({ post }) {
  const excerpt = post.content.length > 180 ? post.content.slice(0, 180).trimEnd() + "…" : post.content;
  return (
    <article className="summary">
      <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
      <p className="meta">{post.author} · {formatDate(post.createdAt)}</p>
      <p>{excerpt}</p>
    </article>
  );
}
