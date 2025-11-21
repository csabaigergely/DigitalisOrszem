import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Admin({ translations }) {
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
        if (!title || !slug) return alert(translations.missingFields || "Hiányzó mezők!");

        await addDoc(collection(db, "topics"), {
            title,
            slug,
            createdAt: new Date(),
            intro: "",
            itAnalysis: "",
            legalAnalysis: ""
        });

        alert(translations.topicAdded || "Téma létrehozva!");
    }

    return (
        <div className="container">
            <h1>{translations.adminPanel || "Admin Felület"}</h1>

            <div className="panel-block">
                <label>{translations.title || "Cím"}:</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>{translations.slug || "Slug"}:</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} />

                <button onClick={addTopic}>
                    {translations.addTopic || "Téma hozzáadása"}
                </button>
            </div>

            <h2 style={{ marginTop: 40 }}>
                {translations.existingTopics || "Meglévő témák"}
            </h2>

            <ul>
                {topics.map(t => <li key={t.id}>{t.title}</li>)}
            </ul>
        </div>
    );
}
