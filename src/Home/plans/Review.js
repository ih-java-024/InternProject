import React, { useState } from 'react';
import Header from './Header';
import './Plan.css';
import bglogo4 from './bglogo4.png'
import { useNavigate, useLocation } from 'react-router-dom'


const Review = () => {
  const location = useLocation();
  const { values = {}, policyType = '', individual = '', checkboxvalues = [], familyMembers = {}, proceed = '', selectedPremium = 0, coverage = 0, selectedPlan = 1 } = location.state || {};

  const navigate = useNavigate();

  const handleInfo = () => {
    navigate("/Registration")
  }

  const data = {
    planType: policyType,
    members: checkboxvalues,
    duration: proceed,
    insurance_cover: coverage,
    intrest: selectedPremium
  };

  return (
    <div>
      <div className='mt-5 text-light'> .</div>
    <Header />
      <img className='bglogo' src={bglogo4} alt='Bg logo' />
      <div className="details-container mt-3">
        <h1 className='fw-bold che'>Check Details</h1>
        <div className="details-section">
          <div className="customer-details">
            <h3>Customer Details</h3>
            <p><strong>User Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;{values.firstname}</p>
            <p><strong>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;{values.email}</p>
            <p><strong>Phone Number&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;{values.contactNo}</p>
            <p><strong>Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>&nbsp;&nbsp; {values.gender}</p>
            <p><strong>Date of Birth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;{values.dateofbirth}</p>
            <p><strong>Marital Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;{values.maritual}</p>
          </div>
          <div className="premium-details">
            <h3>Premium Details</h3>
            <p><strong>Duration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;  {proceed}</p>
            <p><strong>Interest&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>&nbsp;&nbsp; &#8377;{selectedPremium}</p>
            <p><strong>Insurance Cover&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp; &#8377;{coverage}</p>
          </div>
        </div>
        <div className="plan-details mb-1">
          <h3 className='text-center'>Plan Details</h3>
          <p><strong>Plan Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>&nbsp;&nbsp;   {policyType}</p>
          <p><strong>Relationship&nbsp;&nbsp;&nbsp;:</strong> &nbsp;&nbsp;{checkboxvalues.join(", ")}{individual}</p>
        </div>
<div className='bp'>
        <button className='btn btn-secondary mt-2 fw-bold' onClick={() => navigate("/Plan", { state: { policyType, values, individual, checkboxvalues, familyMembers } })} ><i class="fa-solid fa-share fa-flip-horizontal"></i> Back</button>
        <button className='btn btn-success mt-2 fw-bold' onClick={() => navigate("/Pay", { state: { policyType, data, values, individual, checkboxvalues, percentage_value: selectedPremium, amount: selectedPremium } })}>Proceed <i class="fa-solid fa-circle-right"></i></button>
</div>
      </div>
    </div>
  );
}

export default Review;
