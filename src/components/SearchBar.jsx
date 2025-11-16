import React from "react";
export default function SearchBar({ value, onChange }) {
    return (
        <div className="search-wrap">
            <input
                aria-label="Search topics"
                placeholder="Search titles..."
                className="search-input"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    )
}