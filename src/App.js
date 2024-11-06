import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ImageProvider } from './context/ImageContext';
import HomePage from './pages/HomePage';
import ImageDetailPage from './pages/ImageDetailPage';
import './App.css';

function App() {
  return (
    <ImageProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>NASA Image Explorer</h1>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/image/:nasaId" element={<ImageDetailPage />} />
          </Routes>
        </div>
      </Router>
    </ImageProvider>
  );
}

export default App;