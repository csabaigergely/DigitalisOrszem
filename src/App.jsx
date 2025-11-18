// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // figyeljük a bejelentkezés állapotát
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  if (!authReady) return null; // vagy egy loading spinner

  return (
    <div className="app-root">
      <Header search={search} setSearch={setSearch} user={user} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home search={search} user={user} />} />
          <Route path="/topic/:slug" element={<TopicPage user={user} />} />
          <Route path="/admin" element={<Admin user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Digitális Őrszem</p>
      </footer>
    </div>
  );
}
