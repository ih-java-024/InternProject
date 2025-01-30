import React, { useState, useEffect } from "react";
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck , FaTimes} from "react-icons/fa";
import axios from "axios";
import { handleSendOtp, handleOtpVerification, handleEmailOtp, handleEmailOtpVerification } from "./otpFunctions";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import { Grid, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import bglogo4 from "./bglogo4.png";
import "./RegistrationForm.css";

function RegistrationForm() {
  const fnameregex = /^[A-Za-z]+(?:[ \s.][A-Za-z]+)*$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const phnumber_regex = /^[6-9]{1}[0-9]{9}$/;
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [emailEnteredOtp, setEmailEnteredOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  let navigate = useNavigate();

  const starting_value = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    address: "",
    email: "",
    maritual: "",
  };

  const initial_error_values = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    address: "",
    email: "",
    marital: "",
  };

  const [values, setValues] = useState(starting_value);
  const [errorValues, setErrorValues] = useState(initial_error_values);

  useEffect(() => {
    setIsPhoneNumberVerified(false);
  }, [values.contactNo]);

  useEffect(() => {
    setIsEmailOtpVerified(false);
    setIsEmailValid(false);
  }, [values.email]);

  const handleOtp = async () => {
    const num = values.contactNo;

    const generatedOtp = await handleSendOtp(num);

    if (generatedOtp) {
      setShowOtpModal(true);
      setIsOtpVerified(false);
      setOtp(generatedOtp);
    }
  };

  const EmailOtp = async () => {
    const useremail = values.email;
    const generatedEmailOtp =  await handleEmailOtp(useremail);
  setEmailOtp(generatedEmailOtp);
  console.log(generatedEmailOtp + " generated emailotp");
  if (generatedEmailOtp) {
    setShowEmailOtpModal(true);
    setIsEmailOtpVerified(false);
    setEmailOtp(generatedEmailOtp);
  
};
  }
    const handleOtpSubmit = (e) => {
      e.preventDefault();
     const isVerified = handleOtpVerification(enteredOtp, otp);
    if (isVerified) {
      setIsOtpVerified(true);
      setShowOtpModal(false);
      setIsPhoneNumberVerified(true);
      setEnteredOtp("");
    } else {
      setIsOtpVerified(false);
      alert("Wrong OTP. Please try again.");
    }
    setEnteredOtp("");
  };
  
  const handleEmailOtpSubmit = (e) => {
    e.preventDefault();
    console.log(emailEnteredOtp + " 88888 " + emailOtp);
    const isVerified = handleEmailOtpVerification(emailEnteredOtp, emailOtp);
    if (isVerified) {
      setIsEmailOtpVerified(true);
      setShowEmailOtpModal(false);
      setEmailEnteredOtp("");
    } else {
      setIsEmailOtpVerified(false);
      alert("Wrong OTP. Please try again.");
    }
    setEmailEnteredOtp("");
  };

  

  const handleBlur = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/register/CheckMail/${values.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );
      const data = await response.json();

      if (data === true) {
        // setError("This email is already registered, please login!");
        setErrorValues({ ...errorValues, email: "This email is already registered, please login!" });
        setIsEmailValid(false);
      } else {
        setError("");
        setErrorValues({ ...errorValues, email: "" });
        setIsEmailValid(true);
      }
    } catch (error) {
      setError("Enter a valid email.");
      setIsEmailValid(false);
    }
  };

  const validate = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "firstname" && !value.match(fnameregex)) {
      return setErrorValues({ ...errorValues, [name]: "Enter a valid name" });
    } else if (
      name === "dateofbirth" &&
      (!value.match(dobRegex) || new Date(value) >= new Date())
    ) {
      return setErrorValues({
        ...errorValues,
        [name]: "Invalid date of birth",
      });
    } else if (name === "contactNo" && !value.match(phnumber_regex)) {
      return setErrorValues({
        ...errorValues,
        [name]: "Enter a valid phone number",
      });
    } else if (name === "email" && !value.match(emailregex)) {
      return setErrorValues({ ...errorValues, [name]: "Enter a valid email" });
    } else if (name === "password" && !value.match(password_regex)) {
      return setErrorValues({
        ...errorValues,
        [name]:
          "Password must contain at least one letter, one digit, and be between 8-15 characters long.",
      });
    } else {
      return setErrorValues({ ...errorValues, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !error &&
      fnameregex.test(values.firstname) &&
      phnumber_regex.test(values.contactNo) &&
      emailregex.test(values.email) &&
      password_regex.test(values.password) &&
      values.dateofbirth &&
      values.gender &&
      isOtpVerified &&
      isEmailOtpVerified
    ) {
      axios
        .post("http://localhost:9090/register/addregister", values)
        .then((response) => {
          console.log("Response from backend:", response.data);
          navigate('/User'); // Redirect to login page on successful registration
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
      // onReturnToFirstPage(values);
    }
  };

  const handleNumericInput = (event) => {
    const inputChar = String.fromCharCode(event.charCode);
    if (
      !/^[0-9]*$/.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault();
    }
  };

  const handleAlphabeticInput = (event) => {
    const inputChar = String.fromCharCode(event.charCode);
    if (
      !/^[A-Za-z\s]+$/.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault();
    }
  };

  const preventEnterSubmission = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Header />
      <img className='bglogo' src={bglogo4} alt='Background Logo' />
      <div className='con'>
        <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
           <h1 className='text-primary text-center mb-4'>Registration Form</h1>
            <FaTimes className="text-danger mb-3" style={{ cursor: "pointer" }} onClick={() => navigate('/User')} />
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Name"
                required
                placeholder="Enter Your Name"
                name="firstname"
                value={values.firstname}
                onChange={validate}
                onKeyPress={handleAlphabeticInput}
                onKeyDown={preventEnterSubmission}
                error={!!errorValues.firstname}
                helperText={errorValues.firstname}
                fullWidth
              />
            </Grid>

            <Grid item xs={11} className="d-flex">
              <TextField
                size="small"
                label="Email"
                required
                placeholder="Enter Your Email"
                name="email"
                value={values.email}
                onChange={validate}
                onKeyDown={preventEnterSubmission}
                onBlur={handleBlur}
                error={!!errorValues.email}
                helperText={errorValues.email}
                fullWidth
              />
              <BootstrapButton
                variant="primary"
                onClick={EmailOtp}
                onBlur={handleBlur}
                style={{ marginTop: "1px", width: "30%",height:"40px",marginLeft:"10px" }}
                disabled={!emailregex.test(values.email)&&!isEmailValid||errorValues.email&&!emailEnteredOtp}
              >
                Verify Email
              </BootstrapButton>&nbsp; &nbsp;
              {isEmailOtpVerified && (
                <div className="verified">
                  {/* <FaCheck /> */}
                  <span className="verified-text">Verified <i className="fa-solid fa-circle-check text-success mx-3"></i></span>
                </div>
              )}
            </Grid>

            <Grid item xs={12} className="d-flex">
              <TextField
                size="small"
                label="Phone Number"
                required
                placeholder="Enter Your Phone Number"
                name="contactNo"
                value={values.contactNo}
                onChange={validate}
                onKeyPress={handleNumericInput}
                onKeyDown={preventEnterSubmission}
                error={!!errorValues.contactNo}
                helperText={errorValues.contactNo}
                fullWidth
              />
              <BootstrapButton
                variant="primary"
                onClick={handleOtp}
                style={{ marginTop: "1px", width: "30%",height:"40px",marginLeft:"10px" }}
                disabled={!phnumber_regex.test(values.contactNo)}
              >
                Send OTP
              </BootstrapButton>&nbsp; &nbsp;
              {isOtpVerified && (
                <div className="verified">
                  {/* <FaCheck style={{ color: "green" }} /> */}
                  <span className="verified-text">Verified<i className="fa-solid fa-circle-check text-success mx-3"></i></span>
                </div>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Password"
                required
                placeholder="Enter Your Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={validate}
                onKeyDown={preventEnterSubmission}
                error={!!errorValues.password}
                helperText={errorValues.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                    </span>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Date of Birth"
                required
                placeholder="YYYY-MM-DD"
                name="dateofbirth"
                value={values.dateofbirth}
                onChange={validate}
                onKeyDown={preventEnterSubmission}
                error={!!errorValues.dateofbirth}
                helperText={errorValues.dateofbirth}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={values.gender}
                  onChange={validate}
                  row
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Address"
                required
                placeholder="Enter Your Address"
                name="address"
                value={values.address}
                onChange={validate}
                onKeyDown={preventEnterSubmission}
                error={!!errorValues.address}
                helperText={errorValues.address}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Marital Status</FormLabel>
                <RadioGroup
                  name="maritual"
                  value={values.maritual}
                  onChange={validate}
                  row
                >
                  <FormControlLabel
                    value="single"
                    control={<Radio />}
                    label="Single"
                  />
                  <FormControlLabel
                    value="married"
                    control={<Radio />}
                    label="Married"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>

          </Grid>
        </form>
        <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleOtpSubmit}>
              <TextField
                size="small"
                label="OTP"
                required
                placeholder="Enter OTP"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          show={showEmailOtpModal}
          onHide={() => setShowEmailOtpModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Email OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEmailOtpSubmit}>
              <TextField
                size="small"
                label="Email OTP"
                required
                placeholder="Enter Email OTP"
                value={emailEnteredOtp}
                onChange={(e) => setEmailEnteredOtp(e.target.value)}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default RegistrationForm;
