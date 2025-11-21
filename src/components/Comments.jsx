import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Comments({ slug, user, translations }) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function load() {
            const q = query(
                collection(db, `topics/${slug}/comments`),
                orderBy("createdAt", "desc")
            );
            const snap = await getDocs(q);
            setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
        load();
    }, [slug]);

    async function send() {
        if (!user) {
            alert(translations.mustLogin || "Be kell jelentkezned.");
            return;
        }
        if (!text.trim()) return;

        await addDoc(collection(db, `topics/${slug}/comments`), {
            text,
            user: user.email,
            createdAt: new Date()
        });

        setText("");
    }

    return (
        <div className="comments-block">
            <h3>{translations.comments || "Hozzászólások"}</h3>

            <textarea
                className="comment-box"
                placeholder={translations.writeComment || "Írj egy hozzászólást..."}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="comment-button-wrap">
                <button className="comment-submit-button" onClick={send}>
                    {translations.sendComment || "Küldés"}
                </button>
            </div>

            <div className="comment-list">
                {comments.map(c => (
                    <div key={c.id} className="comment-item">
                        <p className="comment-user">{c.user}</p>
                        <p className="comment-text">{c.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
