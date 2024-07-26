

"use client"
"use client"
import MovieCard from './Fetch_Movie.js';
import React, { useState, useEffect } from 'react';
import AddMovieForm from "./Add_Movie_Form";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=6e402fefddaeafa1a8ad84381f6a8115')
        .then((response) => response.json())
        .then((movies) => setMovies(movies.results))
    };

    fetchData();
  }, []);

  const handleVoteUp = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, votes: (movie.votes || 0) + 1 };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const handleVoteDown = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        const votes = movie.votes || 0;
        return { ...movie, votes: votes - 1 };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };
  
  const handleDelete = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  const compareVotes = (a, b) => {
    return (b.votes || 0) - (a.votes || 0);
  };

  const sortedData = [...movies].sort(compareVotes);

  const onMovieAdd = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {sortedData.slice(0, 10).map((movie) => ( // Display only the top 10 movies
        <MovieCard
          key={movie.id}
          movie={movie}
          onVoteUp={handleVoteUp}
          onVoteDown={handleVoteDown}
          onDelete={handleDelete}
        />
      ))}
      <div className="footer-content">
        <h1 className="footer-header">Add A New Movie</h1>
        <p className="footer-para">
          To add a movie, you have to fill out the form. The added movie will appear in the list above.
        </p>
        {showForm ? (
          <AddMovieForm onMovieAdd={onMovieAdd} onHideForm={handleHideForm} />
        ) : (
          <img
            className="addMovie"
            src="addMovie.svg"
            alt="Add Movie"
            onClick={handleShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;

