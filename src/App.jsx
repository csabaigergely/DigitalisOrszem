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

function extractTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    const trimmed = n.nodeValue.trim();
    if (trimmed.length > 0) {
      nodes.push({ node: n, text: trimmed });
    }
  }
  return nodes;
}


  // 🔥 AI-fordítás hívása (JAVÍTVA — most működni fog)
  const translateUI = async () => {
  const textNodes = extractTextNodes(document.body);

  const texts = textNodes.map(t => t.text);

  const response = await fetch("/translate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ texts })
  });

  const data = await response.json();

  if (!data.translatedTexts) {
    console.error("Translation error:", data);
    return;
  }

  // Írd vissza a DOM-ba
  textNodes.forEach((item, i) => {
    item.node.nodeValue = data.translatedTexts[i];
  });
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
