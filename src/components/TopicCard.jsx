import React from "react";
import { Link } from "react-router-dom";
import SaveButton from "../components/SaveButton";

export default function TopicCard({ topic, user }) {
    const createdDate = topic.createdAt
        ? new Date(topic.createdAt.seconds * 1000).toLocaleDateString("hu-HU")
        : null;

    return (
        <article className="topic-card">

            {/* Felső sor: cím + mentés gomb külön él, nem kattinthatja meg a kártyát */}
            <div className="topic-card-top">

                {/* Cím kattintható */}
                <Link to={`/topic/${topic.slug}`} className="topic-title-link">
                    <h3>{topic.title}</h3>
                </Link>

                {/* SaveButton NEM Linkben van → nem navigál */}
                <div className="save-container">
                    <SaveButton user={user} topic={topic} />
                </div>
            </div>

            {/* Intro kattintható */}
            <Link to={`/topic/${topic.slug}`} className="topic-card-link">
                <p className="muted">{topic.intro}</p>
            </Link>

            {/* Dátum jobb alsó sarokban */}
            {createdDate && (
                <div className="topic-card-date-bottom">
                    {createdDate}
                </div>
            )}
        </article>
    );
}
