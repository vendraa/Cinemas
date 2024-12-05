import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
      console.log("StoredUsers:", storedUsers);
  
      const matchedUser = storedUsers.find(
        (user) => user.email === email && user.password === password
      );
      console.log("MatchedUser:", matchedUser);
  
      if (matchedUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        setErrorMessage("");
        setShowSuccess("Login Successful");
        setTimeout(() => navigate("/home"), 3000);
      } else {
        setErrorMessage("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage("User Data Not Found");
    }
  };  
  
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <img className="login-logo" alt="Cinema logo" src="/assets/Logo.png" />
      <div className="login-left">
        <div className="text">
          <h1>Welcome!!!</h1>
          <p>Begin your cinematic adventure with our ticketing website!</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form">
          <h2>LOGIN</h2>
          <p>Hai There, Welcome Back Again</p>
          {showSuccess && <p className="success-message">{showSuccess}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>LOGIN</button>
          <div className="register">
            Don't Have an Account yet?{' '}
            <span onClick={handleRegister} className="register-link">
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
