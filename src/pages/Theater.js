import React from 'react';
import Header from '../components/Header';
import '../styles/Theater.css';

const Theater = () => {
  const theaters = [
    { location: 'DP Mall Cinemas', contact: '(024) 12300011' },
    { location: 'Paragon Mall Cinemas', contact: '(024) 45600012' },
    { location: 'Queen City Mall Cinemas', contact: '(024) 78900013' },
    { location: 'The Park Mall Cinemas', contact: '(024) 81200014' },
    { location: 'Transmart Setiabudi Cinemas', contact: '(024) 93400015' },
  ];

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      <div className="theater-container">
        <div className="theater-location-bar">
          <button className="theater-back-button" onClick={handleBackClick}>
            &#8592;
          </button>
          <select className="theater-location-select">
            <option value="semarang">Semarang</option>
          </select>
        </div>

        <main className="theater-main">
          <div className="theater-table-wrapper">
            <div className="theater-table">
              <div className="theater-table-header">
                <span className="theater-header-column">LOCATIONS</span>
                <span className="theater-header-column">CONTACT</span>
              </div>
              {theaters.map((theater, index) => (
                <div key={index} className="theater-row">
                  <span className="theater-column theater-location">
                    {theater.location}
                  </span>
                  <span className="theater-column theater-contact">
                    {theater.contact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Theater;
