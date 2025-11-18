// src/components/SaveButton.jsx
import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function SaveButton({ user, topic }) {
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

  return (
    <button onClick={toggleSave} style={{
      padding: "6px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.06)",
      background: saved ? "rgba(201,184,154,0.12)" : "transparent",
      color: "var(--text)"
    }}>
      {saved ? "Mentve" : "Mentés a profilra"}
    </button>
  );
}
