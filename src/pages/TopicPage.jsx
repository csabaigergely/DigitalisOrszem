import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { marked } from "marked";
import TwoColumn from "../components/TwoColumnSection";
import Comments from "../components/Comments";
import SaveButton from "../components/SaveButton";

marked.setOptions({
  mangle: false,
  headerIds: false
});

export default function TopicPage({ user, translations }) {
    const t = translations || {};   // <-- SAFE FALLBACK

    const { slug } = useParams();
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const d = await getDoc(doc(db, "topics", slug));
            if (d.exists()) setTopic({ id: d.id, ...d.data() });
            setLoading(false);
        }
        load();
    }, [slug]);

    if (loading) return <p>{t.loading || "Keresés..."}</p>;
    if (!topic) return <p>{t.notFound || "Nem található"}</p>;

    const intro = marked.parse(topic.intro || "");
    const left = marked.parse(topic.itAnalysis || "");
    const right = marked.parse(topic.legalAnalysis || "");

    return (
        <article className="topic-page">
            <h1 className="topic-title-for-page">{topic.title}</h1>
            <div className="topic-intro-for-page" dangerouslySetInnerHTML={{ __html: intro }} />
            <TwoColumn leftHtml={left} rightHtml={right} />

            <div style={{ marginTop: 40, marginBottom: 40 }}>
                <SaveButton user={user} topic={topic} translations={t} />
            </div>

            <Comments slug={slug} user={user} translations={t} />
        </article>
    );
}
