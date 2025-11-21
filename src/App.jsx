import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import Admin from "./pages/Admin";
import Header from "./components/Header";
import TranslateButton from "./components/TranslateButton";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [language, setLanguage] = useState("hu");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  if (!authReady) return null;

  return (
    <div className="app-root">
      <Header search={search} setSearch={setSearch} user={user}>
        <TranslateButton language={language} setLanguage={setLanguage} />
      </Header>

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
