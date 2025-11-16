// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="nav">
            <div className="nav-left">
                <Link to="/" className="brand">Dark Patterns Watchdog</Link>
            </div>
            <nav className="nav-right">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/admin" className="nav-link">Admin</Link>
            </nav>
        </header>
    );
}
