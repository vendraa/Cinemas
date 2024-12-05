  import React, { useState, useEffect } from "react";
  import Header from "../components/Header";
  import "../styles/MyTicketPage.css";
  import { useNavigate } from "react-router-dom";

  const TicketPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("active");
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      setTickets(storedTransactions);
    }, []);

    const handleBack = () => {
      navigate("/home");
    };

    const formatDate = (date) => {
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = months[dateObj.getMonth()];
      const day = dateObj.getDate();
    
      return `${day} ${month} ${year}`;
    };
    

    const filteredTickets = activeTab === "active" ? tickets : []; 

    return (
      <div>
        <Header />
        <div className="ticket-container">
          <div className="ticket-section">
            <button className="ticket-back-button" onClick={handleBack}>
              &#8592;
            </button>
            <div className="ticket-tabs">
              <button
                className={`ticket-tab ${activeTab === "active" ? "ticket-tab-active" : ""}`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`ticket-tab ${activeTab === "history" ? "ticket-tab-active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </div>
          </div>
          
          {filteredTickets.length === 0 ? (
            <div className="ticket-empty">
              <p>You Don't Have Any Ticket</p>
            </div>
          ) : (
            <div className="ticket-list">
              {filteredTickets.map((ticket, index) => (
                <div className="ticket-card" key={index}>
                  <div className="ticket-info">
                    <p className="ticket-label">Transaction ID</p>
                    <p className="ticket-bold">{ticket.transactionId}</p>

                    <p className="ticket-label">Theater</p>
                    <p className="ticket-bold">{ticket.theater}</p>

                    <p className="ticket-label">Date</p>
                    <p className="ticket-bold">{formatDate(ticket.date)}</p> {/* Gunakan formatDate */}

                    <p className="ticket-label">Movie Title</p>
                    <p className="ticket-bold">{ticket.movieTitle}</p>

                    <div className="ticket-row">
                      <div>
                        <p className="ticket-label">Ticket ({ticket.tickets.split(", ").length})</p>
                        <p className="ticket-bold">{ticket.tickets}</p>
                      </div>
                      <div>
                        <p className="ticket-label">Time</p>
                        <p className="ticket-bold">{ticket.time}</p>
                      </div>
                    </div>
                  </div>
                  <button className="ticket-download-button">Download Ticket</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default TicketPage;
