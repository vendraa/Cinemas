import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-container">
      <div className="payment-success-box">
        <h1 className="payment-success-title">PAYMENT SUCCESS</h1>
        <img
          src="/assets/Icon_Success.png"
          alt="Success Icon"
          className="payment-success-icon"
        />
        <div className="payment-success-buttons">
          <button
            className="view-ticket-button"
            onClick={() => navigate("/tickets")}
          >
            View Ticket
          </button>
          <button
            className="back-home-button"
            onClick={() => navigate("/home")}
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
