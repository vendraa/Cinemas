import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import Theater from './pages/Theater';
import TicketPage from './pages/MyTicketPage';
import Profile from './pages/Profile';
import MovieDetail from './pages/MovieDetail';
import BookingDetail from './pages/BookingDetail';
import SeatSelection from './pages/SeatSelection'; 
import OrderConfirmation from "./pages/OrderConfirmation"; 
import PaymentSuccess from "./pages/PaymentSuccess";
import './styles/Main.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies/:section" element={<MovieList />} />
          <Route path="/theater" element={<Theater />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/booking/:movieId" element={<BookingDetail />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
