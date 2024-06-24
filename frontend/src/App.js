import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainContent from './components/mainContent/mainContent';
import Footer from './components/footer/footer';
import Contact from './components/contact/contact';
import About from './components/about/about';
import Teams from './components/teams/teams';
import Games from './components/games/games';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/games" element={<Games />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
