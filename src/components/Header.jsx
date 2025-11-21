// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { logout } from "../firebase";

export default function Header({
  search,
  setSearch,
  user,
  language,
  translateUI,
  translations
}) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="site-header">

        {/* BAL: kereső */}
        <div className="header-left">
          <input
            type="text"
            className="header-search-input"
            placeholder={translations.searchPlaceholder || "Keresés..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* KÖZÉP: cím */}
        <Link to="/" className="site-title">
          {translations.siteTitle || "Digitális Őrszem"}
        </Link>

        {/* JOBB: English + login/logout */}
        <div className="header-right">

          {/* 🌍 NYELVGOMB */}
          <button
            onClick={translateUI}
            className="header-button"
            style={{ marginRight: 8 }}
          >
            {language === "en" ? "Hungarian" : "English"}
          </button>

          {!user ? (
            <button onClick={() => setShowLogin(true)} className="header-button">
              {translations.login || "Bejelentkezés"}
            </button>
          ) : (
            <>
              {/* PROFIL ICON */}
              <Link
                to="/profile"
                title={translations.profile || "Profil"}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "var(--muted)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>

              {/* KILÉPÉS */}
              <button onClick={logout} className="header-button">
                {translations.logout || "Kilépés"}
              </button>
            </>
          )}
        </div>
      </header>

      <div className="header-divider"></div>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
