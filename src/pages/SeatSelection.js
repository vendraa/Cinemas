import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SeatFactory } from '../classes/Seat';
import '../styles/SeatSelection.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const cols = 18;

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 
  const [popupType, setPopupType] = useState("");
  const ticketPrice = 50000;

  const generateSeats = () => {
    const seats = [];
    rows.forEach((row) => {
      for (let i = 1; i <= cols; i++) {
        const isAvailable = Math.random() > 0.2;
        seats.push(SeatFactory.createSeat(row, i, isAvailable));
      }
    });
    return seats;
  };

  const [seats] = useState(generateSeats());

  const handleSeatClick = (seat) => {
    try {
      if (!seat.isAvailable) throw new Error('This seat is not available.');

      const isAlreadySelected = selectedSeats.find(
        (s) => s.getSeatLabel() === seat.getSeatLabel()
      );

      if (isAlreadySelected) {
        setSelectedSeats((prev) =>
          prev.filter((s) => s.getSeatLabel() !== seat.getSeatLabel())
        );
        seat.deselectSeat();
      } else {
        if (selectedSeats.length >= booking.tickets) {
          throw new Error(
            `You can only select ${booking.tickets} seat(s). Please deselect a seat to choose a new one.`
          );
        }

        seat.selectSeat();
        setSelectedSeats((prev) => [...prev, seat]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleProceedPayment = () => {
    setPopupType("payment");
    setShowPopup(true);
  };

  const confirmPayment = () => {
    navigate("/order-confirmation", {
      state: {
        booking,
        selectedSeats: selectedSeats.sort((a, b) => {
          if (a.row === b.row) {
            return a.number - b.number;
          }
          return a.row.localeCompare(b.row);
        }),
        poster_path: booking.poster_path,
      },
    });
  };

  const handleBackClick = () => {
    setPopupType("back"); 
    setShowPopup(true);
  };

  const formatCurrency = (value) => {
    return `Rp${value.toLocaleString('id-ID')}`;
  };

  const sortedSeats = selectedSeats
    .slice()
    .sort((a, b) => {
      if (a.row === b.row) {
        return a.number - b.number;
      }
      return a.row.localeCompare(b.row);
    })
    .map((seat) => seat.getSeatLabel())
    .join(', ');

  const isProceedDisabled = selectedSeats.length !== booking.tickets;

  useEffect(() => {
    if (showPopup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showPopup]);

  return (
    <div className="seat-container">
      <div className="seat-header">
        <img src="/assets/Logo.png" alt="Logo" className="logo" />
      </div>

      <h1>Seat</h1>

      <div className="seats">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {seats
              .filter((seat) => seat.row === row)
              .map((seat, index) => (
                <>
                  {index === 4 || index === 14 ? (
                    <div key={`spacer-${index}`} className="seat-spacer"></div>
                  ) : null}
                  <button
                    key={seat.getSeatLabel()}
                    className={`seat ${
                      seat.isAvailable
                        ? seat.isSelected
                          ? 'selected'
                          : 'available'
                        : 'unavailable'
                    }`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat.getSeatLabel()}
                  </button>
                </>
              ))}
          </div>
        ))}
      </div>

      <div className="screen-area">Screen Area</div>

      <div className="legend">
        <div className="legend-item available">
          <div className="box"></div> Available
        </div>
        <div className="legend-item selected">
          <div className="box"></div> Your Choice
        </div>
        <div className="legend-item unavailable">
          <div className="box"></div> Taken
        </div>
      </div>

      <div className="footer">
        <hr />
        <div className="footer-details">
          <div className="footer-item">
            <p>TOTAL</p>
            <p>{formatCurrency(selectedSeats.length * ticketPrice)}</p>
          </div>
          <div className="footer-item">
            <p>SEAT</p>
            <p>{sortedSeats || '-'}</p>
          </div>
          <div className="footer-buttons">
            <button className="seat-back-button" onClick={handleBackClick}>
              Back
            </button>
            <button
              className={`seat-proceed-button ${
                isProceedDisabled ? 'disabled' : ''
              }`}
              onClick={handleProceedPayment}
              disabled={isProceedDisabled}
            >
              Proceed Payment
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {popupType === "back" && (
              <>
                <p>All the changes you make will be lost, are you sure?</p>
                <div className="popup-buttons">
                  <button
                    className="popup-button yes"
                    onClick={() => navigate(-1)} 
                  >
                    Yes
                  </button>
                  <button
                    className="popup-button no"
                    onClick={() => setShowPopup(false)} 
                  >
                    No
                  </button>
                </div>
              </>
            )}
            {popupType === "payment" && (
              <>
                <p>Are You Sure?</p>
                <div className="popup-buttons">
                  <button
                    className="popup-button yes"
                    onClick={confirmPayment} 
                  >
                    Yes
                  </button>
                  <button
                    className="popup-button no"
                    onClick={() => setShowPopup(false)}
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
