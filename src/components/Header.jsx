import React from "react";
import SearchBar from "./SearchBar";

export default function Header({ search, setSearch }) {
    return (
        <header className="site-header">
            <h1 className="site-title">Dark Patterns Watchdog</h1>

            <div className="header-search-area">
                <SearchBar value={search} onChange={setSearch} />
            </div>
        </header>
    );
}
