import React from "react";
import { Link } from "react-router-dom";


export default function TopicCard({ topic }) {
    return (
        <Link to={`/topic/${topic.slug}`} className="topic-card-link">
            <article className="topic-card">
                <h3>{topic.title}</h3>
                <p className="muted">{topic.intro}</p>
            </article>
        </Link>
    )
}