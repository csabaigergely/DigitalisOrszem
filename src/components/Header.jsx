// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { logout } from "../firebase"; // helper

export default function Header({ search, setSearch, user }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Digitális Őrszem</h1>

        {/* Search (jobb felső, de profil ikon elé) */}
        <input
          type="text"
          className="header-search-input"
          placeholder="Keresés..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* jobb felső sarok: profil vagy bejelentkezés */}
        <div style={{ position: "absolute", right: "16px", top: "26px" }}>
          {!user ? (
            <button
              onClick={() => setShowLogin(true)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              Bejelentkezés
            </button>
          ) : (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Mentés ikon, profil ikon: egyszerű pálcikaember */}
              <button
                title="Profil"
                onClick={() => { /* később profil oldalra viszhet */ }}
                style={{
                  width: 38, height: 38, borderRadius: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "transparent", border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--muted)"
                }}
              >
                {/* minimal person icon using unicode / svg */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>

              <button
                onClick={async () => { await logout(); }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--muted)",
                  cursor: "pointer",
                }}
              >
                Kilépés
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="header-divider"></div>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
