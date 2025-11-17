import React from "react";
import { Link } from "react-router-dom";

export default function Header({ search, setSearch }) {
    return (
        <>
            <header className="site-header">
                <h1 className="site-title">Digitális Őrszem</h1>

                <input
                    type="text"
                    className="header-search-input"
                    placeholder="Keresés..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </header>

            {/* Fix elválasztó vonal */}
            <div className="header-divider"></div>

            {/* A header alatt legyen hely, hogy ne lógjon rá a tartalomra */}
            <div style={{ height: "110px" }}></div>
        </>
    );
}
