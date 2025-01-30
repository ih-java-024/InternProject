import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import pageturner from "../Profiledetails/page-turner.png";
import { ReactComponent as StickerSVG } from "../Profiledetails/health.svg";
import { ReactComponent as CustomerSVG } from "../Profiledetails/Customer.svg";
import { generateOtp, handleEmailOtp } from "../Profiledetails/otpFunctions";
import Header from './Header';
import "./Profile.css";
import fileDownload from "js-file-download";
import { set } from "react-hook-form";

function Profile() {
  const [policyvalues, setPolicyValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [emailOtpMode, setEmailOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [phoneEditMode, setPhoneEditMode] = useState(false);
  const [newPhoneNumberError, setNewPhoneNumberError] = useState("");
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState("");

  const location = useLocation();
  const initialValues1 = location.state?.values1 || JSON.parse(localStorage.getItem('values1')) || {};
  const [values1, setValues1] = useState(initialValues1);
  //const[count,setCount]=useState(1);
  let count=1;

  
 
  console.log(values1+"yuuyuuio");
  const [values, setValues] = useState({});

  console.log(values.firstname+"99999999")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const registerResponse = await axios.get(
          `http://localhost:9090/register/getById/${values1}`
        );
        setValues(registerResponse.data);
        console.log(values.email+"this is values");

        const paymentResponse = await axios.get(
          `http://localhost:9090/payment/getCustomerDetailsByMail/${values1}`
          
        );
        console.log(values.username+"edee raa ");
        setPolicyValues(paymentResponse.data);
        
        console.log(policyvalues+"policy values::::::::::")
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (values1) {
      fetchData();
    }
  }, [values1, values.email],count);

  const generateOtp = (length) => {
    const characters = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(index);
    }
    return otp;
  };

  const handleSendOtp = async () => {
    const mobileno = newPhoneNumber;
    const otp = generateOtp(6);
    setGeneratedOtp(otp);

    const proxyUrl = `http://localhost:9090/register/sendOtp?mobileno=${mobileno}&otp=${otp}`;
    try {
      const response = await axios.get(proxyUrl);
      if (response.data.status === "success") {
        alert("OTP sent successfully");
        setOtpMode(true);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  const handleSendEmailOtp = async () => {
    const useremail = newEmail;
    const sendOtpUrl = `http://localhost:9090/register/sendEmail/emailUpdation/${useremail}`;
  
    try {
      const checkMailResponse = await axios.post(sendOtpUrl);
        if (checkMailResponse.data) {
          alert("Email OTP sent successfully");
          setGeneratedEmailOtp(String(checkMailResponse.data));
          setEmailOtpMode(true);
        } else {
          alert("Failed to send Email OTP");
        }
      
    } catch (error) {
      console.error("Error sending Email OTP:", error);
      alert("An error occurred while sending the Email OTP. Please try again later.");
    }
  };
  
  const handleOtpSubmit = async () => {
    if (otp === generatedOtp) {
      try {
        await axios.put(
          `http://localhost:9090/register/user/update/${values.email}`,
          {
            ...values,
            contactNo: newPhoneNumber,
          }
        );
        alert("Phone number updated successfully");
        setValues((prevValues) => ({
          ...prevValues,
          contactNo: newPhoneNumber,
        }));
        setOtpMode(false);
        setPhoneEditMode(false);
      } catch (error) {
        console.error("Error updating phone number:", error);
      }
    } else {
      alert("Invalid OTP");
      setOtp("");

    }
    setOtp("");

  };

  const handleEmailOtpSubmit = async () => {
    if (emailOtp === generatedEmailOtp) {
      try {
        await axios.put(
          `http://localhost:9090/register/user/update/${values.email}`,
          {
            ...values,
            email:newEmail
          }
        );
        alert("Email updated successfully");
        setValues((prevValues) => ({
          ...prevValues,
          email: newEmail,
        }));
        setValues((prevValues1) => ({
          ...prevValues1,
          username: newEmail,
        }));
        setEmailOtpMode(false);
        setEmailEditMode(false);
      } catch (error) {
        console.error("Error updating email:", error);
        alert("Error updating email. Please try again.");
      }
    } else {
      alert("Invalid Email OTP");
      setEmailOtp("");
    }
    setEmailOtp("");

  };

  const handleContentChange = (key, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:9090/register/user/update/${values.email}`,
        values
      );
      alert("Details updated successfully");
      setEditMode(false);
    
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handlePhoneEditClick = () => {
    setPhoneEditMode(true);
  };

  const handleEmailEditClick = () => {
    setEmailEditMode(true);
  };

  const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validatePhoneNumber = (number) => phoneRegex.test(number);
  const validateEmail = (email) => emailRegex.test(email);

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setNewPhoneNumber(value);

    if (!validatePhoneNumber(value)) {
      setNewPhoneNumberError("Enter a valid phone number");
    } else {
      setNewPhoneNumberError("");
    }
  };


  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleVerifyPhone = () => {
    if (validatePhoneNumber(newPhoneNumber)) {
      handleSendOtp();
    } else {
      setNewPhoneNumberError("Enter a valid phone number");
    }

  };

  const handleVerifyEmail = () => {
    if (validateEmail(newEmail)) {
      handleSendEmailOtp();
    } else {
      setEmailError("Enter a valid email");
    }

  };

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/PolicyDetails", { state: { values1 } });
  };
  const handleDownloadInvoice = async (policyId) => {
    try {
      const response = await axios.get(`http://localhost:9090/payment/create?userId=${policyId}`, {
        responseType: 'blob', // Important to handle binary data
      });
  
      // Use the 'fileDownload' package to handle the download
      const fileName = `invoice_${policyId}.pdf`; // You can customize the file name
      fileDownload(response.data, fileName);
      console.log(`Invoice downloaded for policyId: ${policyId}`);
    } catch (error) {
      console.error(`Error downloading invoice for policyId: ${policyId}, error`);
    }
  };

//   const generatedEmailOtp = await handleEmailOtp(useremail);
//   setEmailOtp(generatedEmailOtp);
//   console.log(generatedEmailOtp + " generated emailotp");
//   if (generatedEmailOtp) {
//     setShowEmailOtpModal(true);
//     setIsEmailOtpVerified(false);
//     setEmailOtp(generatedEmailOtp);
//   }
// };

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
        setEmailError({ ...emailError, email: "This email is already registered, please update email!" });
        setEmailOtpMode(false);
      } else {
        setEmailError("");
        setGeneratedEmailOtp();
        setEmailOtpMode(true);
      }
    } catch (error) {
      setEmailError("Enter a valid email.");
      setEmailOtpMode(false);
    }
  };

  return (
<div>
      <div className="text-light">.</div>
      <h1 className="mt-5 p1">Profile</h1>
      <Header />
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
      </svg>

      <div
        className="text-dark wel me-5"
        id="profilebanner"
        style={{
          marginLeft: "auto",
          maxWidth: "100%",
          // backgroundColor: "#91b1e6",
        }}
      >
        {/* <div className="sticker"> */}
          {/* <div className="sticker-image-container">
            <StickerSVG className="sticker-image" />
          </div> */}
          <div className="welcome-message mt-5">
            <a className="btn text-dark" data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvasExample">
              <i className="fa-solid fa-user text-primary">&nbsp; <span className="text-dark">My Profile </span></i>
              <hr></hr>
            </a>
          </div>

          <div className="welcome-message mt-5">
            <h4>Welcome : <span className="text-primary">{values.firstname}</span></h4>
            <hr></hr>
            <i> </i>
          </div>
          <div className="welcome-message mt-5">
            <h4> Phno :<span className="text-primary">{values.contactNo}</span></h4>
            <hr></hr>
          </div>
        </div>
      {/* </div> */}

      {/* <div className="container-fluid p-5">
        <h4 className="text-start text-dark">Your recent policy details</h4>
        <div className="cad d-flex flex-row align-items-center">
          <div className="p-3">
            <CustomerSVG className="sticker-image" />
          </div>

          <div className="mt-3 table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-primary">
                <tr>
                  <th scope="col">Payment_Id</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Insurance Cover</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Plan Type</th>
                  <th scope="col">Relation Type</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(policyvalues) &&
                  policyvalues.map((policy, index) => (
                    <tr key={index}>
                      <td>&#8377;{policy.userId}</td>
                      <td>{policy.duration}</td>
                      <td>{policy.insurence_cover}</td>
                      <td>{policy.intrest}</td>
                      <td>{policy.planType}</td>
                      <td>{policy.relationType}</td>
                      <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDownloadInvoice(policy.userId)}
                    >
                      Download Invoice
                    </button>
                  </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-outline-primary" onClick={handleNavigate}>
            Take New Policy
          </button>
        </div>
      </div> */}
<div>
  {Array.isArray(policyvalues) &&
    policyvalues.map((policy, index) => (
      <div key={index} className="card shadow mt-3">
        <div className="card-header pcdetails d-flex justify-content-between flex-wrap">
          <h5 className="text-end mt-2 mt-md-0">
            <span className="fw-bold text-secondary">Policy Details:</span>
            <span>
            {count++}
            </span>
          </h5>
        </div>
        <div className="card-body">
          <div className="row pcdetails">
            <div className="col-md-6" style={{ borderRight: 'solid 2px #dcdcdc' }}>
              <p className="card-text fw-bold">Payment Id: &#8377;{policy.userId}</p>
              <p className="card-text fw-bold">Duration: {policy.duration}</p>
                <p className="card-text fw-bold">Insurance Cover: {policy.insurence_cover}</p>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <p className="card-text fw-bold">Interest: {policy.intrest}</p>
              <p className="card-text fw-bold">Plan Type: {policy.planType}</p>
              <p className="card-text fw-bold">Relation Type: {policy.relationType}</p>
            </div>
            
          </div>
          <div className='d-flex justify-content-end'>
            <button
                      className="btn btn-success fw-bold" 
                      onClick={() => handleDownloadInvoice(policy.userId)}
                    >
                    Invoice &nbsp;<i class="fa-solid fa-download text-light"></i>
                    </button>
          </div>
        </div>
      </div>
    ))}
    <div className="text-center mt-5">
          <button className="btn btn-outline-primary" onClick={handleNavigate}>
            Take New Policy
          </button>
        </div>
</div>


      <div
        className="offcanvas offcanvas-start"
        style={{width:"40%"}}
        tabIndex="-10"
        id="offcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="container text-center">
          <h1 className="fa-solid fa-user mt-3"></h1>
        </div>
        <div className="offcanvas-header d-flex justify-content-center p-3 mb-3 text-danger ">
          <h4 className="offcanvas-title text-muted text-light mb-3">
            My Profile
          </h4>
          <hr></hr>
          <br />
        </div>

        <div className="container ms-3 justify-content-center">
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Name :</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.firstname}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Date of Birth :</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.dateofbirth}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Gender :</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.gender}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Phone Number :</h6>
            </div>
            <div className="col-8">
              {phoneEditMode ? (
                <>
                  <input
                    type="text"
                    value={newPhoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Enter new phone number"
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleVerifyPhone}
                  >
                    Verify
                  </button>
                  {newPhoneNumberError && (
                    <div className="text-danger">{newPhoneNumberError}</div>
                  )}
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <h6 className="text-primary mb-0">{values.contactNo}</h6>
                  <button
                    className="btn btn-link p-0 ms-2"
                    onClick={handlePhoneEditClick}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              )}
            </div>
          </div>
          {otpMode && (
            <div className="row mb-3">
              <div className="col-4">
                <h6 className="text-muted">OTP</h6>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter OTP"
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleOtpSubmit}
                >
                  Submit OTP
                </button>
              </div>
            </div>
          )}
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">E-Mail :</h6>
            </div>
            <div className="col-8">
              {emailEditMode ? (
                <>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={handleEmailChange}
                    placeholder="Enter new E-Mail"
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleVerifyEmail}
                    //disabled={!emailregex.test(values.email)&&isEmailValid||errorValues.email&&!emailEnteredOtp}
                    onBlur={handleBlur}
                    disabled={!emailRegex.test(values.email)}
                  >
                    Verify
                  </button>
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </>
              ) : (
                <div className="d-flex align-items-center">
                  <h6 className="text-primary mb-0">{values.email}</h6>
                  <button
                    className="btn btn-link p-0 ms-2"
                    onClick={handleEmailEditClick}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              )}
            </div>
          </div>
          {emailOtpMode && (
            <div className="row mb-3">
              <div className="col-4">
                <h6 className="text-muted">OTP</h6>
              </div>
              <div className="col-8">
                <input
                  type="email"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter OTP"
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleEmailOtpSubmit}
                >
                  Submit OTP
                </button>
              </div>
            </div>
          )}
        

        <div className="row mb-3">
          <div className="col-4">
            <h6 className="text-muted ">Marital_Status:</h6>
          </div>
          <div className="col-8">
            <h6 className="text-primary">{values.maritual}</h6>
          </div>
        </div>
        </div>
        {/* <div className="offcanvas-footer">
          {editMode ? (
            <button className="btn btn-primary" onClick={handleSave}>
              <FontAwesomeIcon icon={faCheck} /> Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
          )}
        </div> */}
      </div>
    </div>


// </div>
  );
}

export default Profile;