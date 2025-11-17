import React, { useEffect, useState } from "react";
import TopicCard from "../components/TopicCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
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

    const shown = topics.slice(0, visible);

    return (
        <div className="home">

            {/* Fejléc cím */}
            <div className="top-row">
                <h2 className="section-title">Elérhető Témák</h2>
            </div>

            {loading ? (
                <p>Keresés...</p>
            ) : (
                <div className="topic-grid">
                    {shown.map(t => (
                        <TopicCard key={t.slug || t.id} topic={t} />
                    ))}
                </div>
            )}

            {topics.length > visible && (
                <div className="load-more-wrap">
                    <button className="load-more" onClick={() => setVisible(v => v + 10)}>
                        Több betöltése
                    </button>
                </div>
            )}

            {/* Rólunk */}
            <section className="about">
                <h3>Rólunk</h3>
                <p>
                    A Digitális Őrszem manipulációs digitális mintákat és UX-technikákat elemez
                    technikai és jogi nézőpontból. Minden elemzés két részre oszlik: technológiai magyarázat
                    és jogi következmények — ezzel segítve a kutatókat, szakembereket és állampolgárokat
                    megérteni a kockázatokat és a lehetséges megoldásokat.
                </p>
            </section>
        </div>
    );
}
