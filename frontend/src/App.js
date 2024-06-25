import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainContent from './components/mainContent/mainContent';
import Footer from './components/footer/footer';
import Contact from './components/contact/contact';
import About from './components/about/about';
import Teams from './components/teams/teams';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/profil/Profile';
import { AuthProvider, AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const location = useLocation();
  const { clearMessage } = useContext(AuthContext);

  useEffect(() => {
    clearMessage();
  }, [location.pathname, clearMessage]); // clearMessage zur Abhängigkeitsliste hinzufügen

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
