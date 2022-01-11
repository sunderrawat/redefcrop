import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Fix from './components/Modal/Fix';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes></Routes>
      <Fix></Fix>
    </div>
  );
}

export default App;
