const BASE = `${import.meta.env.VITE_API_URL || "http://localhost:5050"}/posts`;

async function request(path = "", options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const getPosts = () => request();
export const getPost = (id) => request(`/${id}`);
export const createPost = (post) => request("", { method: "POST", body: JSON.stringify(post) });
export const updatePost = (id, post) => request(`/${id}`, { method: "PATCH", body: JSON.stringify(post) });
export const deletePost = (id) => request(`/${id}`, { method: "DELETE" });
