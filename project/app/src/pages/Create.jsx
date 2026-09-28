import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api.js";

const empty = { title: "", author: "", content: "" };

// Serves both /create and /edit/:id
export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) { setForm(empty); return; }
    getPost(id)
      .then((p) => setForm({ title: p.title, author: p.author, content: p.content }))
      .catch((e) => setError(e.message));
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const saved = id ? await updatePost(id, form) : await createPost(form);
      navigate(`/post/${saved._id}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <>
      <h1>{id ? "Edit post" : "New post"}</h1>
      <form onSubmit={submit}>
        <label>Title
          <input name="title" value={form.title} onChange={change} required />
        </label>
        <label>Author
          <input name="author" value={form.author} onChange={change} required />
        </label>
        <label>Content
          <textarea name="content" rows="12" value={form.content} onChange={change} required />
        </label>
        {error && <p className="notice error">{error}</p>}
        <div className="row">
          <button className="btn" disabled={busy}>{busy ? "Saving…" : id ? "Save changes" : "Publish post"}</button>
          <button type="button" className="link" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </>
  );
}
