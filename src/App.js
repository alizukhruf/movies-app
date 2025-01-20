import React from "react";
import Movies from './components/Movies.js';
import logo from './Images/logo.png';
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Movies App</h1>
      </header>
      <main>
        <Movies />
      </main>
    </div>
  );
};

export default App;