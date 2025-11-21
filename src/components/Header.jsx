import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import { logout } from "../firebase";
import TranslateButton from "./TranslateButton";

export default function Header({ search, setSearch, user }) {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <header className="site-header">
                <div className="header-left">
                    <input
                        type="text"
                        className="header-search-input"
                        placeholder="Keresés..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <Link to="/" className="site-title">
                    Digitális Őrszem
                </Link>

                <div className="header-right">
                    <TranslateButton />

                    {!user ? (
                        <button onClick={() => setShowLogin(true)} className="header-button">
                            Bejelentkezés
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/profile"
                                title="Profil"
                                style={{
                                    width: 38,
                                    height: 38,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "transparent",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    color: "var(--muted)",
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M4 20c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                                </svg>
                            </Link>

                            <button onClick={logout} className="header-button">Kilépés</button>
                        </>
                    )}
                </div>
            </header>

            <div className="header-divider"></div>
            <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
        </>
    );
}
