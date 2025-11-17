import React from "react";
import { Link } from "react-router-dom";

export default function Header({ search, setSearch }) {
    return (
        <>
            <header className="site-header">

                {/* CÍM KÖZÉPEN */}
                <Link to="/" className="site-title">
                    Digitális Őrszem
                </Link>

                {/* KERESŐ JOBB FENT */}
                <div className="search-wrap header-search">
                    <input
                        type="text"
                        placeholder="Keresés a címekben..."
                        className="header-search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <div className="header-divider"></div>
        </>
    );
}
