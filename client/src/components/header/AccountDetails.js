import React from 'react';
import { useSelector } from 'react-redux';

// AccountDetails component
const AccountDetails = ({ onLogout }) => {
  const [user, loginTime] = useSelector(({ user }) => [user.userName, user.loginTime])

  return (
    <div style={styles.container}>
      <div style={styles.details}>
        <h2 style={styles.username}>{user}</h2>
        <p style={styles.time}>Logged in at: {loginTime}</p>
      </div>
      <button style={styles.logoutButton} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

// Styling for the component
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  username: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600',
  },
  time: {
    margin: '0',
    color: '#666',
    fontSize: '14px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default AccountDetails;
