// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";
import TopicCard from "../components/TopicCard";

export default function Home() {
    const [topics, setTopics] = useState([]);
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

    return (
        <div className="home">
            <h2 className="page-title">Topics</h2>
            {loading ? <p>Loading...</p> : (
                <div className="topic-list">
                    {topics.map(t => <TopicCard key={t.slug || t.id} topic={t} />)}
                </div>
            )}
        </div>
    );
}
