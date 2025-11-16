import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
    const [data, setData] = useState("Loading...");

    useEffect(() => {
        async function fetchData() {
            try {
                const col = collection(db, "test");
                const snapshot = await getDocs(col);
                setData(JSON.stringify(snapshot.docs.map(doc => doc.data()), null, 2));
            } catch (err) {
                setData("Error connecting to Firebase: " + err.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Dark Patterns Watchdog</h1>
            <pre>{data}</pre>
        </div>
    );
}
