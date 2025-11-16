import React from "react";

export default function Navbar({ onMenuClick }) {
    return (
        <nav
            style={{
                width: "100%",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1c1c1c",
                borderBottom: "1px solid #333",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10
            }}
        >
            {/* Hamburger menu */}
            <div
                style={{
                    position: "absolute",
                    left: "20px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px"
                }}
                onClick={onMenuClick}
            >
                <div style={{ width: "25px", height: "3px", background: "#f4e8d1", borderRadius: "2px" }}></div>
                <div style={{ width: "25px", height: "3px", background: "#f4e8d1", borderRadius: "2px" }}></div>
                <div style={{ width: "25px", height: "3px", background: "#f4e8d1", borderRadius: "2px" }}></div>
            </div>

            {/* Center website title */}
            <h1 style={{ color: "#f4e8d1", fontSize: "24px", letterSpacing: "2px", textTransform: "uppercase" }}>
                Dark Patterns Watchdog
            </h1>
        </nav>
    );
}
