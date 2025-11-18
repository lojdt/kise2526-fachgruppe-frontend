import { useState } from 'react'
import CreatePet from './components/CreatePet'
import SearchPet from './components/SearchPet'
import './App.css'

type Tab = 'search' | 'create';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 Pet Store</h1>
        <p>Create and search for pets</p>
      </header>

      <nav className="app-nav">
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Pet
        </button>
        <button
          className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Pet
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'search' ? <SearchPet /> : <CreatePet />}
      </main>

      <footer className="app-footer">
        <p>© 2025 Pet Store - Built with React & TypeScript</p>
      </footer>
    </div>
  )
}

export default App
