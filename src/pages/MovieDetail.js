import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetail } from '../api/tmdb';
import Header from '../components/Header';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ directors: [], producers: [], writers: [], productionCompanies: [] });

  const section = location.state?.section;

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const data = await fetchMovieDetail(id);
        setMovie(data);

        const creditUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=0aead095f12020638d4ce7acb388591f`;
        const creditResponse = await fetch(creditUrl);
        const creditData = await creditResponse.json();

        const directors = creditData.crew.filter((crew) => crew.job === 'Director');
        const producers = creditData.crew.filter((crew) => crew.job === 'Producer');
        const writers = creditData.crew.filter((crew) => crew.job === 'Screenplay' || crew.job === 'Writer');
        const productionCompanies = data.production_companies;

        setCredits({ directors, producers, writers, productionCompanies });
      } catch (error) {
        console.error('Error fetching movie details or credits:', error);
      }
    };

    loadMovieDetail();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const isNowShowing = section === 'now_playing';

  return (
    <div>
      <Header />
      <div className="detail-back-button" onClick={() => navigate(-1)}>
        &#8592;
      </div>
      <div className="main-content">
        <div className="poster-container">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/assets/placeholder.png'}
            alt={movie.title}
            className="poster"
          />
          <div className="buy-ticket">
            <button
               onClick={isNowShowing ? () => navigate(`/booking/${movie.id}`, { state: { movie } }) : null} 
              className={`buy-button ${isNowShowing ? '' : 'disabled'}`} 
            >
              Buy Ticket
            </button>
          </div>
        </div>

        <div className="movie-info">
          <div className="title-meta">
            <h1>{movie.title.toUpperCase()}</h1>
            <div className="movie-meta">
              <div className="meta-item">
                <img src="/assets/Icon_Star.png" alt="Runtime Icon" className="meta-icon" />
                <span>{Math.floor(movie.runtime / 60)}H {movie.runtime % 60}M</span>
              </div>
              <div className="meta-item">
                <img src="/assets/Icon_Star.png" alt="Age Icon" className="meta-icon" />
                <span>{movie.adult ? '18+' : '13+'}</span>
              </div>
              <div className="meta-item">
                <img src="/assets/Icon_Star.png" alt="Rating Icon" className="meta-icon" />
                <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="genres">
            {movie.genres.map((genre) => (
              <span className="genre-box" key={genre.id}>
                {genre.name}
              </span>
            ))}
          </div>

          <p className="overview">{movie.overview}</p>

          <div className="additional-info">
            <p><strong>Director(s):</strong> {credits.directors.map((d) => d.name).join(', ')}</p>
            <p><strong>Producer(s):</strong> {credits.producers.map((p) => p.name).join(', ')}</p>
            <p><strong>Writer(s):</strong> {credits.writers.map((w) => w.name).join(', ')}</p>
            <p><strong>Production House:</strong> {credits.productionCompanies.map((pc) => pc.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
