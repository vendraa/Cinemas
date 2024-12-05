import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import "../styles/BookingDetail.css";

const BookingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [theater, setTheater] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [tickets, setTickets] = useState(1);
  const [movieDetails, setMovieDetails] = useState(null);

  const ticketPrice = 50000;
  const movie = location.state?.movie;

  const handleTheaterChange = (value) => {
    setTheater((prev) => (prev === value ? "" : value));
  };

  const handleDateChange = (value) => {
    setDate((prev) => (prev === value ? "" : value));
  };

  const handleTimeChange = (value) => {
    setTime((prev) => (prev === value ? "" : value));
  };

  const handleTicketChange = (operation) => {
    if (operation === "increment") setTickets((prev) => prev + 1);
    else if (operation === "decrement" && tickets > 1)
      setTickets((prev) => prev - 1);
  };

  const handleProceed = () => {
    if (!theater || !date || !time) return;

    const booking = {
      title: movieDetails.title,
      theater,
      date,
      time,
      tickets,
      ticketPrice,
      totalPrice: tickets * ticketPrice,
      poster_path: movieDetails.poster,
    };

    navigate("/seat-selection", { state: { booking } });
  };

  useEffect(() => {
    if (!movie) {
      alert("Movie not found!");
      navigate(-1);
      return;
    }

    setMovieDetails({
      title: movie.title.toUpperCase(),
      runtime: `${Math.floor(movie.runtime / 60)} H ${movie.runtime % 60} M`,
      ageRating: movie.adult ? "17+" : "13+",
      tmdbRating: movie.vote_average?.toFixed(1) || "N/A",
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/assets/placeholder.png",
    });
  }, [movie, navigate]);

  const isProceedDisabled = !theater || !date || !time;

  const currentYear = new Date().getFullYear();
  const dates = [
    { fullDate: `${currentYear}-12-23`, date: "23 Dec", day: "Mon" },
    { fullDate: `${currentYear}-12-24`, date: "24 Dec", day: "Tue" },
    { fullDate: `${currentYear}-12-25`, date: "25 Dec", day: "Wed" },
    { fullDate: `${currentYear}-12-26`, date: "26 Dec", day: "Thu" },
  ];

  return (
    <>
      <Header />
      <div className="booking-container">
        <h1>Booking Detail</h1>
        <button className="booking-back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="booking-content">
          <div className="booking-left">
            <div className="booking-section">
              <h2>Theater</h2>
              <div className="booking-options">
                {["DP Mall", "Paragon Mall", "Queen City Mall", "Transmart Setiabudi", "The Park Mall"].map((item) => (
                  <button
                    key={item}
                    className={`booking-option ${theater === item ? "selected" : ""}`}
                    onClick={() => handleTheaterChange(item)}
                  >
                    <img
                      src="/assets/Icon_Location.png"
                      alt="Location"
                      className="booking-icon-location"
                    />
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-section">
              <h2>Date</h2>
              <div className="booking-options">
                {dates.map((item) => (
                  <button
                    key={item.fullDate}
                    className={`booking-option ${date === item.fullDate ? "selected" : ""}`}
                    onClick={() => handleDateChange(item.fullDate)}
                  >
                    <div>{item.date}</div>
                    <div>{item.day}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-section">
              <h2>Time</h2>
              <div className="booking-options">
                {["13:00", "15:20", "18:10", "19:40", "20:50"].map((item) => (
                  <button
                    key={item}
                    className={`booking-option ${time === item ? "selected" : ""}`}
                    onClick={() => handleTimeChange(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-right">
            {movieDetails && (
              <>
                <img
                  src={movieDetails.poster}
                  alt="Movie Poster"
                  className="booking-poster"
                />
                <h3>{movieDetails.title}</h3>
                <div className="booking-details">
                  <span className="detail-box">{movieDetails.runtime}</span>
                  <span className="detail-box">{movieDetails.ageRating}</span>
                  <span className="detail-box">★ {movieDetails.tmdbRating}</span>
                </div>

                <div className="booking-ticket-section">
                  <button onClick={() => handleTicketChange("decrement")}>-</button>
                  <span>{tickets}</span>
                  <button onClick={() => handleTicketChange("increment")}>+</button>
                </div>

                <div className="booking-proceed-section">
                  <p>*Seat selection can be done after this</p>
                  <button
                    className={`booking-proceed-button ${isProceedDisabled ? "disabled" : ""}`}
                    onClick={handleProceed}
                    disabled={isProceedDisabled}
                  >
                    Proceed
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
