// src/components/Comments.jsx
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Comments({ slug, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, `topics/${slug}/comments`), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [slug]);

  async function postComment(e) {
    e.preventDefault();
    if (!user) return alert("Jelentkezz be a kommenteléshez.");
    if (!text.trim()) return;
    await addDoc(collection(db, `topics/${slug}/comments`), {
      text: text.trim(),
      authorUID: user.uid,
      authorName: user.displayName || user.email,
      createdAt: serverTimestamp()
    });
    setText("");
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Kommentek</h3>

      <form onSubmit={postComment} className="comment-form">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          className="comment-textarea"
          placeholder={user ? "Írj üzenetet..." : "Jelentkezz be a kommenteléshez"}
        />

        <div className="comment-button-wrap">
          <button
            type="submit"
            disabled={!user || !text.trim()}
            className="comment-submit-button"
          >
            Küldés
          </button>
        </div>
      </form>

      <div>
        {comments.map(c => (
          <div key={c.id} style={{ padding: 10, background: "var(--panel)", marginBottom: 8, borderRadius: 8 }}>
            <div style={{ fontSize: ".95rem", color: "var(--muted)" }}>
              {c.authorName} • {c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000).toLocaleString("hu-HU") : ""}
            </div>
            <div style={{ marginTop: 6 }}>{c.text}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
