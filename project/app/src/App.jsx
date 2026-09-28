import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <>
      <header className="masthead">
        <NavLink to="/" className="brand">Post Desk</NavLink>
        <nav>
          <NavLink to="/" end>Latest</NavLink>
          <NavLink to="/archive">Archive</NavLink>
          <NavLink to="/create" className="btn">New post</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<p className="notice">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
