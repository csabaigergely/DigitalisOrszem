// src/pages/Topic.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { marked } from "marked";
import TwoColumnSection from "../components/TwoColumnSection";

export default function Topic() {
    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            // assume doc id is slug
            const d = await getDoc(doc(db, "topics", slug));
            if (d.exists()) {
                setTopic({ id: d.id, ...d.data() });
            } else {
                setTopic(null);
            }
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!topic) return <p>Topic not found.</p>;

    const introHtml = marked.parse(topic.intro || "");
    const leftHtml = marked.parse(topic.itAnalysis || "");
    const rightHtml = marked.parse(topic.legalAnalysis || "");

    return (
        <article className="topic-page">
            <h1 className="topic-title">{topic.title}</h1>
            <div className="topic-intro" dangerouslySetInnerHTML={{ __html: introHtml }} />
            <TwoColumnSection leftHtml={leftHtml} rightHtml={rightHtml} />
        </article>
    );
}
