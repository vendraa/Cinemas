import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../classes/User';
import '../styles/RegisterPage.css'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(''); 
  };

  const validate = () => {
    for (const [value] of Object.entries(formData)) {
      if (!value.trim()) {
        setErrorMessage(`All Data Must be Filled in Correctly`);
        return false;
      }
    }

    try {
      User.Validator.validateEmail(formData.email);
    } catch (err) {
      setErrorMessage(err.message);
      return false;
    }

    try {
      User.Validator.validatePassword(formData.password);
    } catch (err) {
      setErrorMessage(err.message);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
        };

        const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];
        existingUsers.push(newUser);

        localStorage.setItem("userData", JSON.stringify(existingUsers));
  
        setSuccessMessage("Registration Successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error(err.message);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  
  

  return (
    <div className="register-container">
      <div className="register-content">
        <h2 className="register-greeting">Hai There,</h2>
        <h1 className="register-title">Create an Account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <div className="register-row">
            <div className="register-field">
              <label className="register-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="register-input"
              />
            </div>
          </div>
          <div className="register-row">
            <div className="register-field">
              <label className="register-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="register-input"
              />
            </div>
          </div>
          <div className="register-row">
            <div className="register-field">
              <label className="register-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="register-input"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="register-input"
              />
            </div>
            <div className="register-field">
              <label className="register-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="register-input"
              />
            </div>
          </div>
          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>
        <p className="register-login-text">
          Already Have an Account?{' '}
          <a href="/" className="register-login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
