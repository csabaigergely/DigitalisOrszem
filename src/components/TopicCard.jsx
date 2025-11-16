// src/components/TopicCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
    return (
        <article className="topic-card">
            <h3>{topic.title}</h3>
            <p className="muted">{topic.intro}</p>
            <Link to={`/topic/${topic.slug}`} className="read-more">Read →</Link>
        </article>
    );
}
