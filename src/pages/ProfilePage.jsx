import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function ProfilePage({ user }) {
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);

    if (!user) return <p>Be kell jelentkezned...</p>;

    useEffect(() => {
        async function load() {
            const snap = await getDocs(collection(db, `users/${user.uid}/saved`));
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setSaved(data);
            setLoading(false);
        }
        load();
    }, [user.uid]);

    return (
        <div className="container">
            <h1>Profil</h1>
            <p>Email: {user.email}</p>
            <p>Üdv újra!</p>

            <h2 style={{ marginTop: 30 }}>Elmentett témák</h2>

            {loading ? (
                <p>Betöltés...</p>
            ) : saved.length === 0 ? (
                <p style={{ marginTop: 20, fontStyle: "italic", color: "var(--muted)" }}>
                    Jelenleg nincs elmentett témád. Fedezd fel tartalmainkat...
                </p>
            ) : (
                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                    {saved.map(item => (
                        <Link key={item.slug} to={`/topic/${item.slug}`} style={{
                            padding: 14,
                            borderRadius: 0,
                            background: "var(--panel)",
                            textDecoration: "none",
                            color: "var(--text)",
                            display: "block"
                        }}>
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
