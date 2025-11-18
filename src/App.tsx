import { useState } from 'react'
import { CreatePet } from './components/CreatePet'
import { SearchPet } from './components/SearchPet'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'search'>('create')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 Pet Store</h1>
        <p>Create and search for pets</p>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Pet
        </button>
        <button 
          className={`nav-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Pet
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'create' && <CreatePet />}
        {activeTab === 'search' && <SearchPet />}
      </main>
    </div>
  )
}

export default App
