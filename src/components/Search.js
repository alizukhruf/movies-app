import React from 'react';

const Search = ({ searchQuery, setSearchQuery, handleKeyUp, searchMovies }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button className="search-btn" onClick={searchMovies}>Search</button>
    </div>
  );
};

export default Search;