import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movies.css';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const fetchMovies = async (setMovies, setError) => {
  try {
    const response = await axios.get(`${apiUrl}api/movies?apiKey=${apiKey}`);
    setMovies(response.data);
  } catch (err) {
    setError('Failed to fetch results. Please try again later.');
  }
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies(setMovies, setError);
  }, []);

  const searchMovies = async () => {
    if (searchQuery.trim() === '') {
      fetchMovies(setMovies, setError);
    } else {
      try {
        const response = await axios.get(`${apiUrl}api/movies?s=${searchQuery}&apiKey=${apiKey}`);
        setMovies(response.data);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  return (
    <div className="container mt-5" >
      <h2 className="text-center mb-4">Movies</h2>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button className="search-btn" onClick={searchMovies}>Search</button>
      </div>
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="card shadow-sm">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    className="card-img-top"
                    alt={movie.title}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300x400?text=No+Image"
                    className="card-img-top"
                    alt=""
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Release Year: {movie.releaseYear}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">
          <p>No movies found. Please try searching for a different title.</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Movies;