import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList'; // import MovieList
import Movie from './Movies/Movie'; // import Movie

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movies' slice of state
          setMovies(response.data); // Set the response data as the 'movies' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // Check if the movie is already saved in the saved list
    if (!saved.includes(id)) {
      // If not, add it to the saved list
      setSaved([...saved, id]);
    }
  };

  return (
    <div>
      <SavedList list={saved} />

      <Routes>
        <Route path='/' element={<MovieList movies={movies} />} />
        <Route path='/movies/:id' element={<Movie addToSavedList={addToSavedList} />} />
      </Routes>
    </div>
  );
}
