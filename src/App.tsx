import './App.css';
import CreatePet from './components/CreatePet';
import SearchPet from './components/SearchPet';
import { initializeMock } from './services/petService';

// initialize mock storage with a sample pet if empty
initializeMock();

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <div>
                    <h1>Petstore — Create & Search</h1>
                    <div className="subtitle">Primary color: #F55500 — Secondary color: #555555</div>
                </div>
                <div className="logos">
                    <a href="https://vite.dev" target="_blank" rel="noreferrer">
                        <img src="/vite.svg" className="logo" alt="Vite" />
                    </a>
                </div>
            </header>

            <main className="grid">
                <CreatePet />
                <SearchPet />
            </main>

            <footer className="footer">This UI uses a local mock service that mirrors POST /pet and GET /pet/{'{petId}'}</footer>
        </div>
    );
}

export default App;
