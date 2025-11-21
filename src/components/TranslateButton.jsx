import React, { useState } from "react";

const translateMap = new WeakMap();

export default function TranslateButton() {
  const [lang, setLang] = useState("hu");

  const extractTextNodes = (root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) {
      const n = walker.currentNode;
      const trimmed = n.nodeValue.trim();
      if (trimmed.length > 0) nodes.push(n);
    }
    return nodes;
  };

  const translatePage = async () => {
    const textNodes = extractTextNodes(document.body);
    if (!textNodes.length) return;

    if (lang === "hu") {
      // Save original texts
      textNodes.forEach(n => translateMap.set(n, n.nodeValue));

      const texts = textNodes.map(n => n.nodeValue);

      try {
        const res = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: texts,
            source: "hu",
            target: "en",
            format: "text"
          })
        });

        const data = await res.json();
        const translations = data.translatedText || data; // handle array response

        textNodes.forEach((n, i) => {
          n.nodeValue = translations[i] || n.nodeValue;
        });

        setLang("en");

      } catch (err) {
        console.error("Translation failed", err);
      }

    } else {
      // Restore original Hungarian
      textNodes.forEach(n => {
        if (translateMap.has(n)) n.nodeValue = translateMap.get(n);
      });
      setLang("hu");
    }
  };

  return (
    <button onClick={translatePage}>
      {lang === "hu" ? "English" : "Magyar"}
    </button>
  );
}
