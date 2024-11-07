import React, { useState } from 'react'
import { authStyles, formStyles } from '../../../common/commonStyles'
import { SignUpBtn } from './SignUpform';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/user';
import { BASE_URL } from '../../../constant';
import moment from 'moment';

// SignIn Button Component
export const SignInBtn = ({ setShowSignInModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setShowSignInModal(true)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        ...authStyles.signInBtn,
        ...(isHovered ? authStyles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      Sign In
    </button>
  );
};

const SignInForm = ({ setShowSignUpModal, setShowSignInModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch()

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
      return;
    }
    // Clear error message if validation passes
    setErrorMessage('');
    submitHandler()
  };

  const submitHandler = async() => {
    // send a post request and register the user to the db
    const URL = `${BASE_URL}/user/signIn`
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await response.json()
    dispatch(setUserData({...data, loginTime: moment().format('MMMM Do YYYY, h:mm:ss a')}))
    sessionStorage.setItem('userData', JSON.stringify(Object.assign({...data}, {loginTime: moment().format('MMMM Do YYYY, h:mm:ss a')},)))
    setShowSignInModal(false)
  }

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <h2 style={formStyles.heading}>Sign In</h2>

        {errorMessage && <p style={formStyles.error}>{errorMessage}</p>}

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

        <button type="submit" style={{...formStyles.button, ...formStyles.signInBtn}}>
          Sign In
        </button>
      </form>
      <SignUpBtn setShowSignUpModal={setShowSignUpModal} setShowSignInModal={setShowSignInModal} />
    </div>
  );
};


export default SignInForm;


