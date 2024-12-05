import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/'); 
    }
  }, [navigate]);

  const handleHome = () => {
    navigate('/home');
  }

  const handleSave = () => {
    const allUsers = JSON.parse(localStorage.getItem('userData')) || [];
    const updatedUsers = allUsers.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem('userData', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(loggedInUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div>
      <header className="profile-header">
        <img src="/assets/Logo.png" alt="Logo" className="profile-logo" />
        <button className="profile-home-button">
          <img src="/assets/Icon_Home.png" alt="Home Icon" onClick={handleHome} />
        </button>
      </header>

      <div className="profile-container">
        <main className="profile-content">
          <div className="profile-card profile-left-card">
            <div className="profile-avatar">
              <img src="/assets/Icon_Profile.png" alt="User Avatar" />
            </div>
            <button className="profile-logout-button" onClick={handleLogout}>
              LOG OUT
            </button>
          </div>

          <div className="profile-card profile-right-card">
            <h2 className="profile-info-title">Account Information</h2>
            <div className="profile-info">
              <div className="profile-info-box">
                <p>
                  <span className="profile-info-label">👤</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="profile-edit-input"
                    />
                  ) : (
                    <span>{user.name || 'Nama Belum Diisi'}</span>
                  )}
                </p>
              </div>
              <div className="profile-info-box">
                <p>
                  <span className="profile-info-label">📧 </span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="profile-edit-input"
                    />
                  ) : (
                    <span>{user.email || 'Email Belum Diisi'}</span>
                  )}
                </p>
              </div>
              <div className="profile-info-box">
                <p>
                  <span className="profile-info-label">📱</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.phoneNumber}
                      onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                      }
                      className="profile-edit-input"
                    />
                  ) : (
                    <span>{user.phoneNumber || 'Nomor Telepon Belum Diisi'}</span>
                  )}
                </p>
              </div>
              <div className="profile-info-box">
                <p>
                  <span className="profile-info-label">📍</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                      className="profile-edit-input"
                    />
                  ) : (
                    <span>{user.address || 'Alamat Belum Diisi'}</span>
                  )}
                </p>
              </div>
              <div className="profile-info-box">
                <p>
                  <span className="profile-info-label">🎂 </span>
                  {isEditing ? (
                    <input
                      type="date"
                      value={user.dateOfBirth}
                      onChange={(e) =>
                        setUser({ ...user, dateOfBirth: e.target.value })
                      }
                      className="profile-edit-input"
                    />
                  ) : (
                    <span>
                      {user.dateOfBirth
                        ? new Date(user.dateOfBirth).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Tanggal Lahir Belum Diisi'}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="profile-buttons">
              {isEditing && (
                <button className="profile-cancel-button" onClick={handleCancel}>
                  CANCEL
                </button>
              )}
              <button
                className="profile-edit-button"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? 'SAVE DATA' : 'EDIT DATA'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
