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
                <h2 className="section-title">Available Topics</h2>
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
                <h3>About</h3>
                <p>Dark Patterns Watchdog analyses manipulative UX practices from both a technical and legal perspective. Each article is split into two columns — IT analysis and legal implications — to help researchers, practitioners and citizens understand the risks and remedies.</p>
            </section>
        </div>
    )
}