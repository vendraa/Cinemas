import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import MovieSection from '../components/MovieSection';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Header />
      <div className="icons-row">
        <div
          className="icon"
          onClick={() => navigate('/movies/now_playing')} 
        >
          <div className="icon-wrapper">
            <img src="/assets/Icon_Movie.png" alt="Movie Icon" />
          </div>
          <p className="icon-label">Movie</p>
        </div>

        <div
          className="icon"
          onClick={() => navigate ('/theater')} 
        >
          <div className="icon-wrapper">
            <img src="/assets/Icon_Theater.png" alt="Theater Icon" />
          </div>
          <p className="icon-label">Theater</p>
        </div>

        <div
          className="icon"
          onClick={() => navigate ('/tickets')} 
        >
          <div className="icon-wrapper">
            <img src="/assets/Icon_Ticket.png" alt="My Ticket Icon" />
          </div>
          <p className="icon-label">My Ticket</p>
        </div>
      </div>

      <MovieSection title="NOW SHOWING" apiEndpoint="now_playing" limit={5} />
      <MovieSection title="UPCOMING MOVIES" apiEndpoint="upcoming" limit={5} />
    </div>
  );
};

export default Home;
