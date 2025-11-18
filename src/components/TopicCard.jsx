import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "../components/SaveButton";

export default function TopicCard({ topic, user }) {
    const createdDate = topic.createdAt
        ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString("hu-HU")
        : null;

    return (
        <Link to={`/topic/${topic.slug}`} className="topic-card-link">
            <article className="topic-card">
                <h3>{topic.title}</h3>
                <div className="topic-bottom-row">
                    <p className="muted">{topic.intro}</p>
                    {createdDate && <span className="topic-date">{createdDate}</span>}
                </div>
                <SaveButton user={user} topic={topic} />
            </article>
        </Link>
    );
}
