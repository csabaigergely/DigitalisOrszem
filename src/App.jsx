import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        async function fetchData() {
            try {
                const col = collection(db, "test"); // make sure you have a "test" collection in Firestore
                const snapshot = await getDocs(col);
                const data = snapshot.docs.map(doc => doc.data());
                setMessage(JSON.stringify(data, null, 2));
            } catch (err) {
                setMessage("Error connecting to Firebase: " + err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Dark Patterns Watchdog</h1>
            <pre>{message}</pre>
        </div>
    );
}
