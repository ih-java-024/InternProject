
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Plan.css';

const Plan = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { policyType, checkboxvalues, values, individual, familyMembers } = location.state || {};
    const [coverage, setCoverage] = useState(200000);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [selectedPremium, setSelectedPremium] = useState("");
    const [proceed, setProceed] = useState("");

   

    const handleChange = (event) => {
        const newCoverage = parseInt(event.target.value);
        setCoverage(newCoverage);
    };
    useEffect(() => {
        setSelectedPremium(calculatePremium(coverage));
    }, [coverage]);

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        // const premiums = getPremiumForCoverage(coverage);
        setSelectedPremium(premiums[plan]);
    };

    const handleProceed = (e) => {
        const name = e.target.name;
        setProceed(name);
        const premiums = getPremiumForCoverage(coverage);
        const selectedPremium = premiums[selectedPlan];
        
        navigate("/Review", {
            state: { 
                values, policyType, individual, checkboxvalues, familyMembers, proceed: name, selectedPremium, coverage, selectedPlan
            }
        });
    };
    console.log(values.firstname+"yyyyyyyyyy")

    const calculatePremium = (coverage) => {
        return coverage / 100;
    };

    const yearlyPremium = calculatePremium(coverage);

    const getPremiumForCoverage = (coverage) => {
        switch (coverage) {
            case 200000:
                return { 1: 2000, 2: 3818, 3: 5484, 4: 7022, 5: 8450 };
            case 300000:
                return { 1: 3000, 2: 5727, 3: 8227, 4: 10534, 5: 12676 };
            case 400000:
                return { 1: 4000, 2: 7636, 3: 10969, 4: 14045, 5: 16902 };
            case 500000:
                return { 1: 5000, 2: 9545, 3: 13171, 4: 17557, 5: 21128 };
            case 600000:
                return { 1: 6000, 2: 11454, 3: 16414, 4: 21068, 5: 25354 };
            case 700000:
                return { 1: 7000, 2: 13363, 3: 19657, 4: 24579, 5: 29580 };
            case 800000:
                return { 1: 8000, 2: 15272, 3: 22900, 4: 28090, 5: 33806 };
            case 900000:
                return { 1: 9000, 2: 17181, 3: 26143, 4: 31601, 5: 38032 };
            case 1000000:
                return { 1: 10000, 2: 19090, 3: 29386, 4: 35112, 5: 42258 };
            default:
                const basePremium = coverage / 100;
                return {
                    1: basePremium,
                    2: (basePremium * 2 * 0.9545).toFixed(2),
                    3: (basePremium * 3 * 0.914).toFixed(2),
                    4: (basePremium * 4 * 0.87775).toFixed(2),
                    5: (basePremium * 5 * 0.845).toFixed(2),
                };
        }
    };

    const premiums = getPremiumForCoverage(coverage);

    return (
        <div>
            <h1 className='text-center head1 mt-2'>QUOTATION&nbsp; DETAILS</h1><br/>
            <div className='d-flex justify-content-center'>
                <div className='row p-3 mt-1 rounded-3'>                  
                    <div className='row m-2'>
                        <h3 className='me-5 fw-bold'>Hello ,<span className='text-primary fw-bold div'><br/>{values.firstname}</span></h3>
                        <h4 className='fw-bold'>Plan Type : <span className='text-primary fw-bold div'>{policyType}</span></h4>
                        {/* <button className='btn btn-outline-secondary mt-2' onClick={handleEditClick}>Edit</button> */}
                    </div>
                </div>
                <div className='rangecard mx-3 mt-4'>
                    <div className='range mx-4'>
                        <label htmlFor="customRange1" className="form-label d-flex mx-4">
                            <p className='text-primary'>Insurance Cover: {coverage.toLocaleString()}</p>&nbsp;
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            id="customRange1"
                            min="200000"
                            max="1000000"
                            step="100000"
                            value={coverage}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='rangecard1 mx-4 mt-4 me-5'>
                    <p className='year1'>Yearly</p>
                    <button className='bt2 fw-bold'>{yearlyPremium.toLocaleString()}</button>
                    <p className='pre1'>Selected<br></br>Premium</p>
                    <button className='bt3'><i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>{selectedPremium}</button>
                </div>
            </div>
            <br/><br/>
            <div className='plancard mt-5 mx-2'>
                <h2 className='text-center text-light fw-bold plan'>CHOOSE &nbsp;YOUR  &nbsp;PLAN</h2>
                <div className='year'>
                    <button type="button" className={"btn btn-outline-primary mt-5"} onClick={() => handlePlanSelect(1)}>1 Year</button>
                    <button type="button" className="btn btn-outline-secondary mt-5" onClick={() => handlePlanSelect(2)}>2 Years</button>
                    <button type="button" className="btn btn-outline-success mt-5" onClick={() => handlePlanSelect(3)}>3 Years</button>
                    <button type="button" className="btn btn-outline-danger mt-5" onClick={() => handlePlanSelect(4)}>4 Years</button>
                    <button type="button" className="btn btn-outline-warning mt-5" onClick={() => handlePlanSelect(5)}>5 Years</button>
                </div>
                <div className='d-flex val mt-3'>
                    <p><i className="fa-solid fa-indian-rupee-sign text-success"></i>&nbsp;{premiums[1]}</p>
                    <p><i className="fa-solid fa-indian-rupee-sign text-success"></i>&nbsp;{premiums[2]}</p>
                    <p><i className="fa-solid fa-indian-rupee-sign text-success"></i>&nbsp;{premiums[3]}</p>
                    <p><i className="fa-solid fa-indian-rupee-sign text-success"></i>&nbsp;{premiums[4]}</p>
                    <p><i className="fa-solid fa-indian-rupee-sign text-success"></i>&nbsp;{premiums[5]}</p>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <button type='button' className='btn btn-success fw-bold' name={selectedPlan} onClick={handleProceed}>Proceed...</button>
                </div>
            </div>
        </div>
    );
};

export default Plan;

