import React from 'react';
import './App.css';
import Header from './header';
import Nav from './nav';
import MainContent from './mainContent';
import Footer from './footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
