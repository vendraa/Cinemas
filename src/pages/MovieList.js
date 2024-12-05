import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNowShowingMovies, fetchUpcomingMovies } from '../api/tmdb';
import Header from '../components/Header';
import '../styles/MovieList.css';

const MovieList = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [activeSection, setActiveSection] = useState(section || 'now_playing');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data = [];
        if (activeSection === 'now_playing') {
          data = await fetchNowShowingMovies(25);
        } else if (activeSection === 'upcoming') {
          data = await fetchUpcomingMovies(50);
        }
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, [activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate(`/movies/${section}`);
  };

  return (
    <>
      <Header />
      <div className="movie-list">
        <div className="back-button" onClick={() => navigate('/home')}>
          &#8592;
        </div>

        <div className="section-buttons">
          <button
            className={`section-button ${activeSection === 'now_playing' ? 'active' : ''}`}
            onClick={() => handleSectionChange('now_playing')}
          >
            Now Showing
          </button>
          <button
            className={`section-button ${activeSection === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleSectionChange('upcoming')}
          >
            Upcoming Movies
          </button>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.id}
              onClick={() =>
                navigate(`/movie/${movie.id}`, { state: { section: activeSection } })
              }
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <p className="movie-title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
