// src/components/LoginModal.jsx
import React, { useState } from "react";
import { registerWithEmail, loginWithEmail } from "../firebase";


export default function LoginModal({ visible, onClose }) {
  const [mode, setMode] = useState("login"); 
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
    <div className="login-overlay">
      <form className="login-modal" onSubmit={handleSubmit}>
        <h3>{mode === "login" ? "Bejelentkezés" : "Regisztráció"}</h3>

        {mode === "register" && (
          <label>
            Felhasználónév
            <input
              required
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </label>
        )}

        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Jelszó
          <input
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <div className="login-buttons">
          <button type="submit">
            {mode === "login" ? "Bejelentkezés" : "Regisztráció"}
          </button>
          <button type="button" onClick={onClose}>Mégse</button>
          <button
            type="button"
            className="switch-button"
            onClick={() => setMode(m => (m === "login" ? "register" : "login"))}
          >
            {mode === "login" ? "Regisztrálok" : "Van már fiókom"}
          </button>
        </div>

        {msg && <p className="error">{msg}</p>}
      </form>
    </div>
  );
}
