import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import MainContent from './components/mainContent/mainContent';
import Footer from './components/footer/footer';
import Contact from './components/contact/contact';
import About from './components/about/about';
import Teams from './components/teams/teams'; // Import the new Teams component
import Games from './components/games/games'; // Import the new Games component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/teams" element={<Teams />} /> {/* Add the route for Teams */}
          <Route path="/games" element={<Games />} /> {/* Add the route for Games */}
          <Route path="/games/:gameId" element={<Games />} /> {/* Add the dynamic route for individual games */}
          <Route path="/teams/:teamId" element={<Teams />} /> {/* Add the dynamic route for individual teams */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
