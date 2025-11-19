import { useState } from "react";
import PetSearch from "./components/PetSearch";
import PetCreate from "./components/PetCreate";

export default function App() {
    const [view, setView] = useState<"search" | "create">("search");

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="brand">Pet Store</h1>
                <nav className="nav">
                    <button
                        className={`nav-btn ${view === "search" ? "active" : ""}`}
                        onClick={() => setView("search")}
                    >
                        Search Pets
                    </button>
                    <button
                        className={`nav-btn ${view === "create" ? "active" : ""}`}
                        onClick={() => setView("create")}
                    >
                        Add Pet
                    </button>
                </nav>
            </header>

            <main className="container">
                {view === "search" ? <PetSearch /> : <PetCreate />}
            </main>

            <footer className="footer">
                <small>Primary: #F55500 — Secondary: #555555</small>
            </footer>
        </div>
    );
}
