import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "../components/SaveButton";

export default function TopicCard({ topic, user, translations }) {
    const t = translations || {};   // <-- SAFE

    const createdDate = topic.createdAt
        ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString("hu-HU")
        : null;

    return (
        <Link to={`/topic/${topic.slug}`} className="topic-card-link">
            <article className="topic-card">

                <div className="topic-card-top">
                    <h3>{topic.title}</h3>

                    <div className="save-container">
                        <SaveButton 
                            user={user} 
                            topic={topic}
                            translations={t}
                        />
                    </div>
                </div>

                <p className="muted">{topic.intro}</p>

                {createdDate && (
                    <div className="topic-card-date-bottom">
                        {createdDate}
                    </div>
                )}
            </article>
        </Link>
    );
}
