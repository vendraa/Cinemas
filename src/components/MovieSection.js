import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNowShowingMovies, fetchUpcomingMovies } from '../api/tmdb';

const MovieSection = ({ title, apiEndpoint, limit }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data = [];
        if (apiEndpoint === 'now_playing') {
          data = await fetchNowShowingMovies(limit);
        } else if (apiEndpoint === 'upcoming') {
          data = await fetchUpcomingMovies(limit);
        }
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, [apiEndpoint, limit]);

  const handleSeeAllClick = () => {
    if (apiEndpoint === 'now_playing') {
      navigate('/movies/now_playing');
    } else if (apiEndpoint === 'upcoming') {
      navigate('/movies/upcoming');
    }
  };

  return (
    <section className="movie-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="see-all" onClick={handleSeeAllClick}>
          See All &gt;
        </button>
      </div>
      <div className="movies">
        {movies.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`, { state: { section: apiEndpoint } })} 
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="movie-title">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
