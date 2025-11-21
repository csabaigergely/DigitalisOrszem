import React, { useState, useRef } from "react";

export default function TranslateButton({ language, setLanguage }) {
  const [loading, setLoading] = useState(false);
  const originalTexts = useRef(new Map());

  const toggleLanguage = async () => {
    if (!setLanguage) return; // safety check
    const newLang = language === "hu" ? "en" : "hu";
    setLanguage(newLang);

    if (newLang === "en") {
      setLoading(true);
      const container = document.querySelector("main.container");
      if (!container) return;

      const elements = container.querySelectorAll("*:not(script):not(style)");

      for (let el of elements) {
        if (el.children.length === 0 && el.textContent.trim().length > 0) {
          if (!originalTexts.current.has(el)) {
            originalTexts.current.set(el, el.textContent);
          }
          try {
            const res = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: el.textContent,
                source: "hu",
                target: "en",
              }),
            });
            const data = await res.json();
            el.textContent = data.translatedText || el.textContent;
          } catch (err) {
            console.error("Translation failed", err);
          }
        }
      }
      setLoading(false);
    } else {
      // revert to original texts
      originalTexts.current.forEach((txt, el) => {
        el.textContent = txt;
      });
    }
  };

  return (
    <button onClick={toggleLanguage} disabled={loading}>
      {loading ? "Translating..." : language === "hu" ? "English" : "Magyar"}
    </button>
  );
}
