import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Movies from './components/Movies';
import Users from './components/Users';
import UserForm from './components/UserForm';
import logo from './Images/logo.png';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={logo} alt="Logo" className="logo" />
          
          <nav>
            <ul>
              <li><Link to="/">Movies</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/user-form">User Form</Link></li>

            </ul>
          </nav>
          <h1>Movies App</h1>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Movies />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user-form" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;