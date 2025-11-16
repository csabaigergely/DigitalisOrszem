import React from "react";

export default function Sidebar({ open, onClose }) {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: open ? 0 : "-260px",
                height: "100vh",
                width: "260px",
                backgroundColor: "#141414",
                padding: "30px 20px",
                boxShadow: open ? "4px 0 15px rgba(0,0,0,0.5)" : "none",
                transition: "left 0.4s ease-in-out",
                zIndex: 20
            }}
        >
            <h2 style={{ color: "#f4e8d1", marginBottom: "30px" }}>Menu</h2>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                <li style={{ color: "#d9d9d9", cursor: "pointer" }}>Home</li>
                <li style={{ color: "#d9d9d9", cursor: "pointer" }}>Reports</li>
                <li style={{ color: "#d9d9d9", cursor: "pointer" }}>About</li>
            </ul>

            {/* Close button */}
            <div
                onClick={onClose}
                style={{
                    marginTop: "40px",
                    padding: "10px 15px",
                    border: "1px solid #f4e8d1",
                    color: "#f4e8d1",
                    width: "fit-content",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Close
            </div>
        </div>
    );
}
