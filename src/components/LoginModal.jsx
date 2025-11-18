// src/components/LoginModal.jsx
import React, { useState } from "react";
import { registerWithEmail, loginWithEmail } from "../firebase";

export default function LoginModal({ visible, onClose }) {
  const [mode, setMode] = useState("login"); // 'login' vagy 'register'
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  if (!visible) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      if (mode === "register") {
        await registerWithEmail(displayName, email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.5)", zIndex: 20000
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "var(--panel)", padding: 20, borderRadius: 12, width: 360, color: "var(--text)"
      }}>
        <h3 style={{ marginTop: 0 }}>{mode === "login" ? "Bejelentkezés" : "Regisztráció"}</h3>

        {mode === "register" && (
          <label style={{ display: "block", marginBottom: 8 }}>
            Felhasználónév
            <input required value={displayName} onChange={e => setDisplayName(e.target.value)} style={{ width: "100%", marginTop:6 }} />
          </label>
        )}

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", marginTop:6 }} />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Jelszó
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", marginTop:6 }} />
        </label>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button type="submit" style={{ padding: "8px 12px" }}>
            {mode === "login" ? "Bejelentkezés" : "Regisztráció"}
          </button>
          <button type="button" onClick={onClose} style={{ padding: "8px 12px" }}>Mégse</button>
          <button type="button" onClick={() => setMode(m => m === "login" ? "register" : "login")} style={{ marginLeft: "auto", background: "transparent" }}>
            {mode === "login" ? "Regisztrálok" : "Van már fiókom"}
          </button>
        </div>

        {msg && <p style={{ color: "salmon", marginTop: 8 }}>{msg}</p>}
      </form>
    </div>
  );
}
