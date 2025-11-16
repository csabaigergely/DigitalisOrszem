// src/pages/Admin.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState({
        title: "",
        slug: "",
        intro: "",
        itAnalysis: "",
        legalAnalysis: "",
        published: true
    });
    const [message, setMessage] = useState("");

    async function login(e) {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            setMessage("Logged in");
        } catch (err) {
            setMessage("Login error: " + err.message);
        }
    }

    async function doCreate(e) {
        e.preventDefault();
        try {
            const id = form.slug;
            await setDoc(doc(db, "topics", id), {
                title: form.title,
                slug: form.slug,
                intro: form.intro,
                itAnalysis: form.itAnalysis,
                legalAnalysis: form.legalAnalysis,
                published: form.published,
                author: user?.email || null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            setMessage("Topic saved.");
        } catch (err) {
            setMessage("Save error: " + err.message);
        }
    }

    async function doLogout() {
        await signOut(auth);
        setUser(null);
    }

    return (
        <div className="admin">
            <h2>Admin</h2>

            {!user ? (
                <form onSubmit={login} className="admin-login">
                    <label>Email
                        <input value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>Password
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Sign in</button>
                    <p className="muted">Enable Email/Password in Firebase Auth console and create an admin user there.</p>
                </form>
            ) : (
                <div>
                    <p>Signed in as {user.email} <button onClick={doLogout}>Logout</button></p>

                    <form onSubmit={doCreate} className="admin-form">
                        <label>Title<input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></label>
                        <label>Slug (id)<input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required /></label>
                        <label>Intro<textarea value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} /></label>
                        <label>IT Analysis (Markdown)<textarea value={form.itAnalysis} onChange={e => setForm({ ...form, itAnalysis: e.target.value })} /></label>
                        <label>Legal Analysis (Markdown)<textarea value={form.legalAnalysis} onChange={e => setForm({ ...form, legalAnalysis: e.target.value })} /></label>
                        <label>Published
                            <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
                        </label>
                        <button type="submit">Save Topic</button>
                    </form>
                </div>
            )}

            <p className="muted">{message}</p>
        </div>
    );
}
