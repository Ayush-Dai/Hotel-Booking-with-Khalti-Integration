import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterScreen.css';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function RegisterScreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateInput = () => {
    if (name.length<4) return 'Name must contain at least 4 characters.'; 
    if (!/^[A-Za-z][A-Za-z0-9 ]{0,19}$/.test(name)) return 'Name must start with a letter and be up to 20 characters.';
    if (!email) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one digit.';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character.';
    if (!cpassword) return 'Confirm Password is required.';
    if (password !== cpassword) return 'Passwords do not match.';
    return ''; // No validation errors
  };

  async function register() {
    const validationMessage = validateInput();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    const user = {
      name,
      email,
      password,
      cpassword
    };

    try {
      // setLoading(true);
      const response = await axios.post('/api/users/register', user); // Await the response
      console.log('User registered:', response.data); // Log success message
      // setLoading(false);
      setSuccess(true);

      setname('');
      setemail('');
      setpassword('');
      setcpassword('');
      setValidationError(''); // Clear validation error if registration is successful
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className='register-screen'>
      {loading && (<Loader />)}

      <div className="box">
        <div className="field">
          {success && (<Success message='Registration success' />)}
          {error && (<Error message='Error' />)}
          {validationError && (<Error message={validationError} />)}
          <div>
            <h2>Register</h2>
            <input 
              type="text" 
              className='form-control' 
              placeholder='Name' 
              value={name} 
              onChange={(e) => { setname(e.target.value) }} 
              title="Enter your full name. It must start with a letter and can be up to 20 characters long."
            />
            <input 
              type="email" 
              className='form-control' 
              placeholder='Email' 
              value={email} 
              onChange={(e) => { setemail(e.target.value) }} 
              title="Enter a valid email address."
            />
           

            <div className="password-field">
     <div className="password-wrapper">
     <input 
              type={showPassword ? 'text' : 'password'}
              className='form-control' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => { setpassword(e.target.value) }} 
              title="Password must be at least 6 characters and include uppercase, lowercase, digits, and special characters."
            />
            <span className="toggle-password"
            onClick={()=>setShowPassword(!showPassword)}>
              {showPassword? '👁️' : '🙈'}
              </span>
     </div>
     <div className="password-wrapper">
     <input 
              type={showPasswordC ? 'text' : 'password'}
              className='form-control' 
              placeholder='Confirm Password' 
              value={cpassword} 
              onChange={(e) => { setcpassword(e.target.value) }} 
              title="Re-enter the password to confirm it."
            />
            <span
            className='toggle-password'
            onClick={()=>setShowPasswordC(!showPasswordC)}
            >{showPasswordC ? '👁️' : '🙈'}</span>
            </div>
            </div>
            <button className='btn btn-primary' onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;


