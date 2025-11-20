// src/components/SaveButton.jsx
import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function SaveButton({ user, topic }) {
  const [saved, setSaved] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!user) { setSaved(false); return; }
    let mounted = true;
    const check = async () => {
      const d = await getDoc(doc(db, `users/${user.uid}/saved`, topic.slug));
      if (mounted) setSaved(d.exists());
    };
    check();
    return () => { mounted = false; };
  }, [user, topic.slug]);

  async function toggleSave() {
    if (!user) return alert("Jelentkezz be a mentéshez.");
    const ref = doc(db, `users/${user.uid}/saved`, topic.slug);
    if (!saved) {
      await setDoc(ref, {
        slug: topic.slug,
        title: topic.title,
        savedAt: new Date()
      });
      setSaved(true);
    } else {
      await deleteDoc(ref);
      setSaved(false);
    }
  }

  const baseBorder = "1px solid rgba(255,255,255,0.18)";
  const hoverBorder = "1px solid var(--accent)";
  const savedBackground = "rgba(201,184,154,0.15)"; // finom bézs árnyalat
  const hoverBackground = !saved ? "rgba(255,255,255,0.06)" : "rgba(201,184,154,0.20)";

  return (
    <button
      onClick={toggleSave}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "6px 12px",
        borderRadius: 10,
        border: hover ? hoverBorder : baseBorder,
        background: saved
          ? savedBackground
          : hover
          ? hoverBackground
          : "transparent",
        color: saved ? "var(--accent)" : "var(--text)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "0.95rem",
        cursor: "pointer",
        transition: "all 0.25s ease",
        backdropFilter: "blur(4px)"
      }}
    >
      {saved ? "Mentve" : "Mentés a profilra"}
    </button>
  );
}
