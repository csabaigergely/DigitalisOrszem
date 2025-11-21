// src/App.jsx
import ProfilePage from "./pages/ProfilePage";
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

  // 🔥 NYELV ÉS FORDÍTÁSOK
  const [language, setLanguage] = useState("hu");
  const [translations, setTranslations] = useState({});

  // 🌐 Alap magyar szövegek — ezeket fogjuk angolra fordítani
  const baseHu = {
    availableTopics: "Elérhető Témák",
    loading: "Keresés...",
    loadMore: "Több betöltése",
    aboutTitle: "Rólunk",
    aboutP1: "Az eredeti hosszú szöveg…",
    aboutP2: "Második szövegrész…",
    footerTitle: "Digitális Őrszem"
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);

    const savedTranslations = localStorage.getItem("translations");
    if (savedTranslations) setTranslations(JSON.parse(savedTranslations));
    else setTranslations(baseHu); // első betöltéskor használja a magyar alapot
  }, []);

  // 🔥 AI-fordítás hívása (JAVÍTVA — most működni fog)
  const translateUI = async () => {
    try {
      const response = await fetch("/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: JSON.stringify(baseHu)
        })
      });

      const data = await response.json();

      const translated = JSON.parse(data.translatedText);

      setTranslations(translated);
      setLanguage("en");

      localStorage.setItem("language", "en");
      localStorage.setItem("translations", JSON.stringify(translated));
    } catch (err) {
      console.error("Translation error:", err);
    }
  };

  // 🔥 Firebase auth figyelése
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
      <Header
        search={search}
        setSearch={setSearch}
        user={user}
        language={language}
        translateUI={translateUI}
        translations={translations}
      />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home search={search} user={user} translations={translations} />} />
          <Route path="/topic/:slug" element={<TopicPage user={user} translations={translations} />} />
          <Route path="/admin" element={<Admin user={user} translations={translations} />} />
          <Route path="/profile" element={<ProfilePage user={user} translations={translations} />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()}{" "}
          {translations.footerTitle || "Digitális Őrszem"}
        </p>
      </footer>
    </div>
  );
}
