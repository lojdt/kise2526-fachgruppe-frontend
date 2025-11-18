import { useState } from 'react'
import './App.css'
import CreatePet from './components/CreatePet'
import SearchPet from './components/SearchPet'
import type { Pet } from './types/pet.types'

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'search'>('search')

  const handlePetCreated = (pet: Pet) => {
    console.log('Pet created:', pet)
  }

  const handlePetFound = (pet: Pet) => {
    console.log('Pet found:', pet)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐾 Pet Store Management</h1>
        <p className="subtitle">Create and Search for Pets</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          🔍 Search Pet
        </button>
        <button
          className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          ➕ Create Pet
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'search' && (
          <SearchPet onPetFound={handlePetFound} />
        )}
        {activeTab === 'create' && (
          <CreatePet onPetCreated={handlePetCreated} />
        )}
      </main>

      <footer className="app-footer">
        <p>Pet Store API - Mock Backend Implementation</p>
      </footer>
    </div>
  )
}

export default App
