// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
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

    const [language, setLanguage] = useState("hu");
    const [translations, setTranslations] = useState({});

    const baseHu = {
        availableTopics: "Elérhető Témák",
        loading: "Keresés...",
        loadMore: "Több betöltése",
        aboutTitle: "Rólunk",
        aboutP1: "Az eredeti hosszú szöveg…",
        aboutP2: "Második szövegrész…",
        footerTitle: "Digitális Őrszem",
        searchPlaceholder: "Keresés...",
        siteTitle: "Digitális Őrszem",
        login: "Bejelentkezés",
        logout: "Kilépés",
        profile: "Profil"
    };

    useEffect(() => {
        const savedLang = localStorage.getItem("language");
        if (savedLang) setLanguage(savedLang);

        const savedTranslations = localStorage.getItem("translations");
        if (savedTranslations) setTranslations(JSON.parse(savedTranslations));
        else setTranslations(baseHu);
    }, []);

    const extractTextNodes = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];
        while (walker.nextNode()) {
            const n = walker.currentNode;
            const trimmed = n.nodeValue.trim();
            if (trimmed.length > 0) nodes.push({ node: n, text: trimmed });
        }
        return nodes;
    };

    const translateUI = async () => {
      // wait a tiny bit to make sure all React content is rendered
      setTimeout(async () => {
        const textNodes = extractTextNodes(document.body);
        if (textNodes.length === 0) return;

        const texts = textNodes.map(t => t.text);

        try {
          const res = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texts }),
          });

          const data = await res.json();
          if (!data.translatedTexts) throw new Error("No translatedTexts returned");

          textNodes.forEach((item, i) => {
            item.node.nodeValue = data.translatedTexts[i];
          });

          setLanguage(language === "hu" ? "en" : "hu");
        } catch (err) {
          console.error("UI translation failed:", err);
        }
      }, 100); // 100ms delay ensures React has rendered all components
    };


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
                <p>© {new Date().getFullYear()} {translations.footerTitle || "Digitális Őrszem"}</p>
            </footer>
        </div>
    );
}
