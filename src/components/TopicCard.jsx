import React from "react";
import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
    const createdDate = topic.createdAt
        ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString("hu-HU")
        : null;

    return (
        <Link to={`/topic/${topic.slug}`} className="topic-card-link">
            <article className="topic-card">
                <h3>{topic.title}</h3>
                <p className="muted">{topic.intro}</p>

                {createdDate && (
                    <div className="topic-date">
                        {createdDate}
                    </div>
                )}
            </article>
        </Link>
    );
}
