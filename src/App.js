import React from "react";
import Movies from './components/Movies.js';

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Movies App</h1>
      </header>
      <main>
        
        <Movies />
       
      </main>
    </div>

  );
};

export default App;
