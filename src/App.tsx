import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import AddPetForm from './components/AddPetForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/add-pet" element={<AddPetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
