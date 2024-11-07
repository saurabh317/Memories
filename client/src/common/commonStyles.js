// Shared Styles
export const authStyles = {
  // Style for Sign In Button
  signInBtn: {
    backgroundColor: "#3498db", // Blue color for sign in
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginRight: "10px",
  },
  // Style for Sign Up Button
  signUpBtn: {
    backgroundColor: "#0bc25d", // green color for sign up
      width: "50%",
      padding: "12px 20px",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
  },
  // Hover Effect for both buttons
  buttonHover: {
    transform: "scale(1.05)", // Slight zoom on hover
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // More shadow on hover
  },
};

export const formStyles = {
  container: {
    display: "flex",
    gap: '15px',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    minWidth: '400px',
    padding: '10px',
    backgroundColor: "#f4f4f9",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    boxSizing: "border-box",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border 0.3s ease",
  },
  inputFocus: {
    borderColor: "#3498db",
  },
  button: {
    width: "100%",
    padding: "12px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  signInBtn: {
    backgroundColor: "#3498db"
  },
  signUpBtn: {
    backgroundColor: "#e74c3c"
  },
  buttonHover: {
    backgroundColor: "#c0392b",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export const btnStyles = {
  button: {
    // width: '400px',
    height: '45px',
    background: 'linear-gradient(45deg, #3498db, #8e44ad)', // Gradient background
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'inline-block',
  },
  buttonHover: {
    transform: 'scale(1.05)', // Slight zoom on hover
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', // More shadow on hover
  },
};
