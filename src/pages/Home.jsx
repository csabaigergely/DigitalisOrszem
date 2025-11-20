import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TopicCard from "../components/TopicCard";

export default function Home({ search }) {
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
                <h2 className="section-title">Elérhető Témák</h2>
            </div>

            {loading ? (
                <p>Keresés...</p>
            ) : (
                <div className="topic-grid">
                    {shown.map(t => (
                        <TopicCard key={t.slug || t.id} topic={t} user={user} />
                    ))}
                </div>
            )}

            {filtered.length > visible && (
                <div className="load-more-wrap">
                    <button
                        className="load-more"
                        onClick={() => setVisible(v => v + 10)}
                    >
                        Több betöltése
                    </button>
                </div>
            )}

            <section className="about">
                <h3>Rólunk</h3>

                <p>
                    Előfordult már Önnel, hogy egy internetes applikáció által kínált ingyenes próbaidőszak lejárta után egyszerűen nem találta azt a bizonyos “előfizetés lemondása” menüpontot? Vagy esetleg olyan, hogy az online vásárlás legvégén vett csak észre egy plusz tételt a kosarában, amelyet biztosan nem Ön tett bele? Esetleg találkozott már olyan bűntudatkeltő üzenettel, amely igyekezett eltántorítani attól, hogy leiratkozzon egy hírlevélről?
                </p>

                <div className="fancy-divider">— ✦ —</div>

                <p>
                    Az ilyen helyzetek ritkán a véletlen művei, sokkal inkább tudatos, technológiai tervezés eredményei: ezek az ún, “sötét minták”, vagyis a dark patterns. A jelenségre Harry Brignull UX-tervező hívta fel a figyelmet, aki így nevezi azokat az etikátlan felhasználói felületmegoldásokat, amelyek célja, hogy a felhasználókat manipulatív módon, pszichológiai trükkökkel és megtévesztő dizájnnal befolyásolják a saját érdekeivel szembemenő döntések meghozására a profit növelése érdekében.
                </p>
            </section>
        </div>
    );
}
