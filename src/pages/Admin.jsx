import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";


export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState({ title: "", slug: "", intro: "", itAnalysis: "", legalAnalysis: "", published: true });
    const [msg, setMsg] = useState("");


    async function login(e) {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            setMsg('Signed in')
        } catch (err) { setMsg(err.message) }
    }


    async function save(e) {
        e.preventDefault();
        try {
            await setDoc(doc(db, "topics", form.slug), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            setMsg('Saved')
        } catch (err) { setMsg(err.message) }
    }


    return (
        <div className="admin">
            {!user ? (
                <form onSubmit={login} className="admin-login">
                    <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
                    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
                    <button type="submit">Sign in</button>
                    <p className="muted">Enable Email/Password auth in Firebase and create an admin user.</p>
                </form>
            ) : (
                <div>
                    <p>Signed in as {user.email} <button onClick={async () => { await signOut(auth); setUser(null) }}>Logout</button></p>
                    <form onSubmit={save} className="admin-form">
                        <label>Title<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></label>
                        <label>Slug<input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} /></label>
                        <label>Intro<textarea value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} /></label>
                        <label>IT Analysis<textarea value={form.itAnalysis} onChange={e => setForm({ ...form, itAnalysis: e.target.value })} /></label>
                        <label>Legal Analysis<textarea value={form.legalAnalysis} onChange={e => setForm({ ...form, legalAnalysis: e.target.value })} /></label>
                        <label>Published<input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} /></label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
            <p className="muted">{msg}</p>
        </div>
    )
}