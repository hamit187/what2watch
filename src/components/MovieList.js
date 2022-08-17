import { Fragment, useEffect, useState } from "react";

import classes from './MovieList.module.scss';

const apiKey = process.env.REACT_APP_API_KEY;

const MovieList = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    
    try {
      setMovies(data.results);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={classes.layout}>
      <h1>¿What2Watch?</h1>
      <div>
        {movies && movies.map((movie) => (
          <div className={classes.movie} key={movie.id}>
            <p>{movie.original_title}</p>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
