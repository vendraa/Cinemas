import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MovieOrder, PaymentDetails } from "../classes/Order";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking, selectedSeats, poster_path } = location.state || {};
  const [orderDetails, setOrderDetails] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!booking || !selectedSeats) {
      alert("Invalid booking data!");
      navigate("/home");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const totalPrice = selectedSeats.length * booking.ticketPrice;

    const order = new MovieOrder(orderId, booking, selectedSeats, totalPrice);
    order.setPaymentDetails(new PaymentDetails("Select Payment Method", "Pending"));

    setOrderDetails(order);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Payment time expired. Returning to Home...");
          navigate("/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [booking, selectedSeats, navigate]);

  const handlePaymentMethodChange = (e) => {
    if (orderDetails) {
      orderDetails.setPaymentDetails(new PaymentDetails(e.target.value, "Pending"));
      setOrderDetails(orderDetails);
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (date, time) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
  
    try {
      const dateObj = new Date(`${date}T${time}`);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date or time");
      }

      const dayName = days[dateObj.getDay()];
      const day = dateObj.getDate();
      const month = months[dateObj.getMonth()];
      const year = dateObj.getFullYear();
      const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  
      return `${dayName}, ${day} ${month} ${year} ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date and time:", error);
      return "Invalid Date/Time";
    }
  };

  const formatCurrency = (amount) => {
    return `Rp${amount.toLocaleString("id-ID")}`;
  };

  const handleConfirmPayment = () => {
    if (!(orderDetails instanceof MovieOrder)) {
      console.error("Invalid orderDetails instance. Ensure it is a MovieOrder.");
      return;
    }
  
    setIsProcessing(true);
  
    setTimeout(() => {
      const transaction = orderDetails.generateTransaction();
  
      const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      localStorage.setItem("transactions", JSON.stringify([...existingTransactions, transaction]));
  
      navigate("/payment-success", { state: { transaction } });
    }, 3000);
  };
  
  const handleBackButton = () => {
    setShowPopup(true); 
  };

  const confirmLeave = () => {
    navigate(-2);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (isProcessing) {
    return (
      <div className="loading-container">
        <h1>Transaction Processing</h1>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="order-header">
        <img src="/assets/Logo.png" alt="Logo" className="order-logo" />
      </div>

      <div className="order-confirmation-container">
        <button className="order-back-button" onClick={handleBackButton}>
          ←
        </button>
        <h1>Order Confirmation</h1>

        <div className="order-countdown-box">
          <p>Complete Order In:</p>
          <span className="order-countdown-timer">{formatTime(timeLeft)}</span>
        </div>

        <div className="order-details">
          <div className="order-movie-info">
            <img
              src={poster_path || "/assets/placeholder.png"}
              alt={booking.title}
              className="order-movie-image"
            />
            <div>
              <h2>{booking.title}</h2>
              <div className="order-movie-meta">
                <div className="order-movie-location">
                  <img src="/assets/Icon_Location.png" alt="Location Icon" className="icon" />
                  <span>{booking.theater}</span>
                </div>
                <div className="order-movie-date">
                  <img src="/assets/Icon_Calendar.png" alt="Date Icon" className="icon" />
                  <span>{formatDateTime(booking.date, booking.time)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-ticket-info">
            <div className="ticket-item">
              <div className="ticket-number-box">{selectedSeats.length}</div>
              <div className="ticket-seat-info">
                <span> Seat </span>
                <strong>
                  {selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(", ")}
                </strong>
              </div>
              <div className="ticket-price">
                <span>{`${selectedSeats.length} x ${formatCurrency(booking.ticketPrice)}`}</span>
              </div>
            </div>
          </div>

          <hr className="order-divider" />
          <div className="order-payment-summary">
            <div className="order-payment-item">
              <span>Subtotal</span>
              <span>{formatCurrency(selectedSeats.length * booking.ticketPrice)}</span>
            </div>
            <div className="order-payment-item">
              <span>Order Fees</span>
              <span>{formatCurrency(10000)}</span>
            </div>
            <div className="order-total-payment">
              <span>Total Payment</span>
              <span>{formatCurrency(selectedSeats.length * booking.ticketPrice + 10000)}</span>
            </div>
          </div>

          <div className="payment-method-container">
            <select
              className="order-payment-method"
              value={orderDetails?.paymentDetails?.paymentMethod || "Select Payment Method"}
              onChange={handlePaymentMethodChange}
            >
              <option value="Select Payment Method">Select Payment Method</option>
              <option value="Debit/Credit Card"> Debit/Credit Card
              </option>
              <option value="Gopay"> Gopay
              </option>
              <option value="Ovo"> Ovo
              </option>
              <option value="ShopeePay"> ShopeePay
              </option>
            </select>
          </div>

          <p className="order-note">*Purchased ticket cannot be canceled</p>
          <button
            className="order-proceed-button"
            onClick={handleConfirmPayment}
            disabled={
              !["Debit/Credit Card", "Gopay", "Ovo", "ShopeePay"].includes(
                orderDetails?.paymentDetails?.paymentMethod
              )
            }
          >
            Confirm Payment
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>All the changes you make will be lost, are you sure?</p>
            <div className="popup-buttons">
              <button onClick={confirmLeave}>Yes</button>
              <button onClick={closePopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;