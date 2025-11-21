// src/components/TranslateButton.jsx
import React, { useState } from "react";

export default function TranslateButton({ language, setLanguage }) {
  const [loading, setLoading] = useState(false);

  const toggleLanguage = async () => {
    const newLang = language === "hu" ? "en" : "hu";
    setLanguage(newLang);

    // Find all text nodes and translate them
    if (newLang === "en") {
      setLoading(true);
      const nodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const textNodes = [];
      while (nodes.nextNode()) {
        const n = nodes.currentNode;
        if (n.nodeValue.trim().length > 0) textNodes.push(n);
      }

      for (let node of textNodes) {
        try {
          const res = await fetch("/.netlify/functions/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              q: node.nodeValue,
              source: "hu",
              target: "en",
            }),
          });
          const data = await res.json();
          node.nodeValue = data.translatedText || node.nodeValue;
        } catch (err) {
          console.error("Translation failed", err);
        }
      }
      setLoading(false);
    } else {
      // Reload page to restore original Hungarian text
      window.location.reload();
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={loading}
      style={{ marginLeft: 8 }}
    >
      {loading
        ? "Translating..."
        : language === "hu"
        ? "English"
        : "Magyar"}
    </button>
  );
}
