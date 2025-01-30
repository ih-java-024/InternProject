import React, { useState, useEffect } from 'react';
import Header from './Header';
import './RegistrationForm.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import Loading from '../components/Loading';
import bglogo4 from './bglogo4.png';
import { Link } from 'react-router-dom';

const User = () => {
  const [values1, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    if (!values1) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(values1)) {
      tempErrors.email = "Email is not valid";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    } 
    // else if (!passwordRegex.test(password)) {
    //   tempErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    // }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    if (validate()) {
      try {
        // First API call to get customer details by email
        const policyResponse = await axios.get(
          `http://localhost:9090/payment/getCustomerDetailsByMail/${values1}`
        );

        const data = policyResponse.data;
        setPaymentDetails(data);
        console.log('Payment details:', data);

        // Second API call to login
        const loginResponse = await axios.post('http://localhost:9090/Loginpage/add', { username: values1, userpassword: password });

        // Handle successful response
        console.log('Response from backend:', loginResponse.data);

        if (loginResponse.data === "Login successfully") {
          alert("Login successfully");

          // Navigate based on payment details
          if (data.length > 0) {
            navigate("/Profile", { state: { values1, paymentDetails: data } });
          } else {
            navigate("/PolicyDetails", { state: { values1 } });
          }
        } else if (loginResponse.data === "Invalid credentials" || loginResponse.data === "User not found") {
          setLoginError("Invalid email or password");
        } else {
          setErrors("");
        }
      } catch (error) {
        console.error('Error during the process:', error);
        setLoginError("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has errors, not submitting");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <img className='bglogo' src={bglogo4} alt='l' />
      <div className="login-box">
        <p>Login&nbsp;<i className="fa-solid fa-right-to-bracket text-dark"></i></p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input 
              required
              type="text" 
              value={values1}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className=''>Email</label>
            {errors.email && <span className="error mb-5">{errors.email}</span>}
          </div>
          <div className="user-box mt-3">
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          {loginError && <span className="error">{loginError}</span>}
          {/* {isLoading && <Loading text="Loading....." />} */}
          <div className='d-flex justify-content-center'>
            <button type="submit" className='btn btn-light mt-4 fw-bold'>LOGIN</button>
          </div><p/>
        </form>
        <Link to='/registration' className='text-decoration-none'>
          <p>Don't have an account ? <a className="a2">&nbsp;Register</a></p>
        </Link>
      </div>
    </div>
  );
};

export default User;
