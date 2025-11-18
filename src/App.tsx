// Replaced App to import and show CreatePet and SearchPet and to initialize the mock backend.
import './App.css';
import CreatePet from './components/CreatePet';
import SearchPet from './components/SearchPet';
import { initializeMockBackend } from './api/mockBackend';

initializeMockBackend();

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Petstore — Create & Search</h1>
        <p className="subtitle">Primary color: #F55500 — Secondary color: #555555</p>
      </header>

      <main className="grid">
        <CreatePet />
        <SearchPet />
      </main>

      <footer className="footer">Mock backend based on petstore.openAPI.yaml</footer>
    </div>
  );
}

export default App;
