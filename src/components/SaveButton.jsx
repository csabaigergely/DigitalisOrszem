import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function SaveButton({ user, topic, translations }) {
  const [saved, setSaved] = useState(false);

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

  async function toggleSave(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return alert(translations.mustLogin || "Jelentkezz be a mentéshez.");

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

  return (
    <button
      onClick={toggleSave}
      style={{
        padding: "6px 12px",
        fontSize: "0.85rem",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.18)",
        background: saved
          ? "rgba(201,184,154,0.16)"
          : "rgba(255,255,255,0.05)",
        color: "var(--text)",
        cursor: "pointer",
        transition: "all .25s ease",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {saved
        ? (translations.saved || "Mentve")
        : (translations.saveToProfile || "Mentés a profilra")}
    </button>
  );
}
