import React, { useState } from 'react'
import { authStyles, formStyles } from '../../../common/commonStyles'
import { BASE_URL } from '../../../constant';

// SignUp Button Component
export const SignUpBtn = ({ setShowSignUpModal, setShowSignInModal }) => {

  const handleClick = () => {
    setShowSignInModal(false)
    setShowSignUpModal(true)
  }


  return (
    <button
      onClick={handleClick}
      style={{
        ...authStyles.signUpBtn,
      }}
    >
      Create new account
    </button>
  );
};


const SignUpForm = ({ setShowSignUpModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear error message if validation passes
    setErrorMessage('');
    // onSignUp(name, email, password);
    submitHandler()
  };

  const submitHandler = async() => {
    // send a post request and register the user to the db
    const URL = `${BASE_URL}/user/register`
    const response = await fetch(URL, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName:name, email, password
      })
    })
    const data = await response.json()
    console.log(data)
    setShowSignUpModal(false)
  }

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <h2 style={formStyles.heading}>Sign Up</h2>

        {errorMessage && <p style={formStyles.error}>{errorMessage}</p>}

        <div style={formStyles.inputGroup}>
          <label htmlFor="name" style={formStyles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            style={formStyles.input}
            placeholder="Enter your name"
          />
        </div>

        <div style={formStyles.inputGroup}>
          <label htmlFor="email" style={formStyles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            style={formStyles.input}
            placeholder="Enter your email"
          />
        </div>

        <div style={formStyles.inputGroup}>
          <label htmlFor="password" style={formStyles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={formStyles.input}
            placeholder="Enter your password"
          />
        </div>

        <div style={formStyles.inputGroup}>
          <label htmlFor="confirmPassword" style={formStyles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            style={formStyles.input}
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" style={{...formStyles.button, ...formStyles.signUpBtn}}>
          Sign Up
        </button>
      </form>
    </div>
  );
};


export default SignUpForm;

