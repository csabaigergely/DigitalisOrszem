import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function fetchTopics() {
            try {
                const col = collection(db, "topics");
                const snapshot = await getDocs(col);
                const data = snapshot.docs.map(doc => doc.data());
                setTopics(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchTopics();
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#1a1a1a",
                minHeight: "100vh",
                color: "#e5e5e5",
                paddingTop: "70px",
                fontFamily: "Georgia, serif"
            }}
        >
            <Navbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Page Content */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    margin: "40px auto",
                    padding: "0 20px",
                    animation: "fadeIn 1s ease-out"
                }}
            >
                <h2 style={{ color: "#f4e8d1", marginBottom: "20px" }}>Available Topics</h2>

                {/* Topic cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {topics.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                background: "#242424",
                                borderRadius: "10px",
                                padding: "20px",
                                cursor: "pointer",
                                transition: "transform 0.2s ease, background 0.2s ease"
                            }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <h3 style={{ color: "#f4e8d1" }}>{t.title}</h3>
                            <p style={{ opacity: 0.7 }}>{t.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
        </div>
    );
}
