import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Admin({ translations }) {
    const t = translations || {};   // <-- SAFE

    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    useEffect(() => {
        async function load() {
            const snap = await getDocs(collection(db, "topics"));
            setTopics(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
        load();
    }, []);

    async function addTopic() {
        if (!title || !slug) return alert(t.missingFields || "Hiányzó mezők!");

        await addDoc(collection(db, "topics"), {
            title,
            slug,
            createdAt: new Date(),
            intro: "",
            itAnalysis: "",
            legalAnalysis: ""
        });

        alert(t.topicAdded || "Téma létrehozva!");
    }

    return (
        <div className="container">
            <h1>{t.adminPanel || "Admin Felület"}</h1>

            <div className="panel-block">
                <label>{t.title || "Cím"}:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>{t.slug || "Slug"}:</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} />

                <button onClick={addTopic}>
                    {t.addTopic || "Téma hozzáadása"}
                </button>
            </div>

            <h2 style={{ marginTop: 40 }}>
                {t.existingTopics || "Meglévő témák"}
            </h2>

            <ul>
                {topics.map(t => <li key={t.id}>{t.title}</li>)}
            </ul>
        </div>
    );
}
