import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import Admin from "./pages/Admin";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";


export default function App() {
    const [titleLarge, setTitleLarge] = useState(true);
    return (
        <div className="app-root">
            <header className="site-header">
                <h1 className="site-title">Dark Patterns Watchdog</h1>
                <div className="search-area" />
            </header>


            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/topic/:slug" element={<TopicPage />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </main>


            <footer className="site-footer">
                <p>© {new Date().getFullYear()} Dark Patterns Watchdog</p>
            </footer>
        </div>
    )
}