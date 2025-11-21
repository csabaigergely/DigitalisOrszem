import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TopicCard from "../components/TopicCard";

export default function Home({ search, user, translations }) {
    const [topics, setTopics] = useState([]);
    const [visible, setVisible] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const q = query(collection(db, "topics"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setTopics(data);
            setLoading(false);
        }
        load();
    }, []);

    const filtered = topics.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    const shown = filtered.slice(0, visible);

    return (
        <div className="home">
            <div className="top-row">
                <h2 className="section-title">
                    {translations.availableTopics || "Elérhető Témák"}
                </h2>
            </div>

            {loading ? (
                <p>{translations.loading || "Keresés..."}</p>
            ) : (
                <div className="topic-grid">
                    {shown.map(t => (
                        <TopicCard 
                            key={t.slug || t.id} 
                            topic={t}
                            user={user}
                            translations={translations}
                        />
                    ))}
                </div>
            )}

            {filtered.length > visible && (
                <div className="load-more-wrap">
                    <button
                        className="load-more"
                        onClick={() => setVisible(v => v + 10)}
                    >
                        {translations.loadMore || "Több betöltése"}
                    </button>
                </div>
            )}

            <section className="about">
                <h3>{translations.aboutTitle || "Rólunk"}</h3>

                <p>{translations.aboutP1 || "Az eredeti hosszú szöveg…"}</p>

                <div className="fancy-divider">— ✦ —</div>

                <p>{translations.aboutP2 || "Második szövegrész…"}</p>
            </section>
        </div>
    );
}
