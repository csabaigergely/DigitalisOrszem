import React from "react";

export default function App() {
    return (
        <div style={{ fontFamily: "serif", backgroundColor: "#f7f5ef", minHeight: "100vh", color: "#333" }}>

            {/* Top Navbar */}
            <header style={{
                padding: "1.5rem 3rem",
                fontSize: "1.4rem",
                fontWeight: "bold",
                borderBottom: "1px solid #ddd",
                backgroundColor: "#faf8f2",
                position: "sticky",
                top: 0
            }}>
                Dark Patterns Watchdog
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: "900px", margin: "3rem auto", padding: "0 1rem" }}>
                <h2 style={{ marginBottom: "1rem", fontSize: "2rem" }}>Topics</h2>

                <p style={{ marginBottom: "2rem", color: "#555" }}>
                    Choose a topic to learn about modern dark UX practices, legal aspects, and how to protect yourself.
                </p>

                {/* Topic List */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                        "What Are Dark Patterns?",
                        "Misleading Cookie Banners",
                        "Hidden Subscription Traps",
                        "Manipulative Checkout Flows",
                        "Legal Rights Against Dark UX",
                        "How Companies Track You"
                    ].map((topic) => (
                        <li
                            key={topic}
                            style={{
                                padding: "1.2rem 1rem",
                                marginBottom: "1rem",
                                backgroundColor: "#ffffff",
                                borderRadius: "8px",
                                border: "1px solid #e0dcd2",
                                cursor: "pointer",
                                transition: "0.2s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0ede6"}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#ffffff"}
                        >
                            {topic}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
