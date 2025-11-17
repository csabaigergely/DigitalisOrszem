import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [search, setSearch] = useState("");

    return (
        <>
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(20,20,20,0.85)",
                    backdropFilter: "blur(10px)",
                    zIndex: 1000
                }}
            >
                {/* Oldal neve */}
                <Link
                    to="/"
                    style={{
                        fontSize: "2rem",
                        fontWeight: "600",
                        color: "#fff",
                        textDecoration: "none",
                        letterSpacing: "1px"
                    }}
                >
                    Digitális Őrszem
                </Link>

                {/* Kereső jobb oldalt */}
                <div
                    style={{
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Keresés a címekben..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="header-search-input"
                    />
                </div>
            </header>

            {/* Divider a fejléc alatt */}
            <div
                style={{
                    width: "100vw",
                    height: "1px",
                    marginTop: "70px",
                    background: "rgba(255,255,255,0.25)",
                    marginLeft: "calc(50% - 50vw)"
                }}
            ></div>
        </>
    );
}
