import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div>
        <img src='/assets/Logo.png' alt='Logo' className="logo"/>
      </div>
      <div>
        <img src='/assets/Icon_Profile.png' alt='Profile' className='profile-icon' onClick={() => navigate ('/profile')}/>
      </div>
    </header>
  );
};

export default Header;
