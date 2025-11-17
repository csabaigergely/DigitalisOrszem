import React, { useEffect, useState } from "react";
import TopicCard from "../components/TopicCard";
import SearchBar from "../components/SearchBar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";


export default function Home() {
    const [topics, setTopics] = useState([]);
    const [visible, setVisible] = useState(10);
    const [search, setSearch] = useState("");
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
    }, [])


    const filtered = topics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    const shown = filtered.slice(0, visible);


    return (
        <div className="home">
            <div className="top-row">
                <h2 className="section-title">Elérhető Témák</h2>
                <SearchBar value={search} onChange={setSearch} />
            </div>


            {loading ? <p>Loading...</p> : (
                <div className="topic-grid">
                    {shown.map(t => <TopicCard key={t.slug || t.id} topic={t} />)}
                </div>
            )}


            {filtered.length > visible && (
                <div className="load-more-wrap">
                    <button className="load-more" onClick={() => setVisible(v => v + 10)}>Load more</button>
                </div>
            )}


            <section className="about">
                <h3>Rólunk</h3>
                <p>A Digitális Őrszem manipulációs digitális mintákat és UX-technikákat elemez
                    technikai és jogi nézőpontból. Minden elemzés két részre oszlik:
                    technológiai magyarázat és jogi következmények — ezzel segítve a kutatókat,
                    szakembereket és állampolgárokat megérteni a kockázatokat és a lehetséges megoldásokat.
                </p>
                <p>© 2025 Digitális Őrszem</p>
            </section>
        </div>
    )
}