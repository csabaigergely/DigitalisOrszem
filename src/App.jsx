import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import Admin from "./pages/Admin";
import Header from "./components/Header";

export default function App() {
    const [search, setSearch] = useState("");

    return (
        <div className="app-root">
            {/* Globális fejléc keresővel */}
            <Header search={search} setSearch={setSearch} />

            {/* Tartalom */}
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home search={search} />} />
                    <Route path="/topic/:slug" element={<TopicPage />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </main>

            {/* Lábléc */}
            <footer className="site-footer">
                <p>© {new Date().getFullYear()} Digitális Őrszem</p>
            </footer>
        </div>
    );
}
