// src/components/TwoColumnSection.jsx
import React from "react";

export default function TwoColumnSection({ leftHtml, rightHtml }) {
    return (
        <section className="two-col">
            <div className="col left" dangerouslySetInnerHTML={{ __html: leftHtml }} />
            <div className="col right" dangerouslySetInnerHTML={{ __html: rightHtml }} />
        </section>
    );
}
