import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
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
                zIndex: 1000,
                borderBottom: "1px solid rgba(255,255,255,0.08)"
            }}
        >
            {/* Oldal neve */}
            <Link
                to="/"
                style={{
                    fontSize: "1.9rem",
                    fontWeight: "600",
                    color: "#fff",
                    textDecoration: "none",
                    letterSpacing: "1px"
                }}
            >
                Digitális Őrszem
            </Link>

            {/* Kereső fixen jobb felül */}
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
                    style={{
                        padding: "10px 14px",
                        width: "260px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(40,40,40,0.8)",
                        color: "#fff",
                        fontSize: "1rem",
                        outline: "none"
                    }}
                />
            </div>
        </header>
    );
}
