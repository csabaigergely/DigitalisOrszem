import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SaveButton from "../components/SaveButton";

export default function TopicCard({ topic, user }) {
    const navigate = useNavigate();

    const createdDate = topic.createdAt
        ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString("hu-HU")
        : null;

    return (
        <div 
            className="topic-card"
            onClick={() => navigate(`/topic/${topic.slug}`)}
            style={{ cursor: "pointer" }}
        >
            <div className="topic-card-top">

                {/* Cím – NINCS többé Link! */}
                <h3 className="topic-title">{topic.title}</h3>

                {/* Save: NEM navigál → stopPropagation() */}
                <div
                    className="save-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <SaveButton user={user} topic={topic} />
                </div>

            </div>

            <p className="muted">{topic.intro}</p>

            {createdDate && (
                <div className="topic-card-date-bottom">
                    {createdDate}
                </div>
            )}
        </div>
    );
}
