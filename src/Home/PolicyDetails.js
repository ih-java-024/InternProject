import React, { useEffect } from "react";
import Header from "./Header";
import Footer from './Footer'
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import bglogo4 from './bglogo4.png'
import './PolicyDetails.css'

function PolicyDetails() {
  const location = useLocation();

  const { values1 } = location.state;
  
  const[values,setvalues]=useState({});
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
};




  console.log(values1.username+"iiiiiiiiiiiiii");


  const [policyType, setPolicyType] = useState("");

  const [familyMembers, setFamilyMembers] = useState({
    mother: false,
    father: false,
    children: ""
    
  });
  const [individual, setIndividual] = useState();

  const handleIndividualTypeChange = (e) => {
    const value = e.target.value;
    setIndividual(value);
  };

  const [checkboxvalues, setCheckboxValues] = useState([]);

  const handlePolicyTypeChange = (e) => {
    const type = e.target.value;
    setPolicyType(type);
    if (type !== "family") {
      setFamilyMembers({
        mother: false,
        father: false,
        children: ""
      });
      setCheckboxValues([]);
    }
  };

  const handleChildrenCountChange = (e) => {
    const { name } = e.target;
    setFamilyMembers(prevState => {
      const currentCount = parseInt(prevState.children.split(" ")[1] || 0, 10);
      const newCount = name === "add1" ? currentCount + 1 : currentCount - 1;
      const newChildren = newCount > 0 ? `children ${newCount}` : "";
      setCheckboxValues(prevValues => {
        const filteredValues = prevValues.filter(item => !item.startsWith("children"));
        return newChildren ? [...filteredValues, newChildren] : filteredValues;
      });
      return {
        ...prevState,
        children: newChildren,
      };
    });
  };

  const handleFamilyMemberChange = (e) => {
    const { name, checked } = e.target;
    if (name === "children") {
      if (checked) {
        setFamilyMembers({ ...familyMembers, children: "children 1" });
        setCheckboxValues(prevValues => [...prevValues, "children 1"]);
      } else {
        setFamilyMembers({ ...familyMembers, children: "" });
        setCheckboxValues(prevValues => prevValues.filter(item => !item.startsWith("children")));
      }
    } else {
      setFamilyMembers({ ...familyMembers, [name]: checked });
      setCheckboxValues(prevValues => checked ? [...prevValues, name] : prevValues.filter(item => item !== name));
    }
  };

  const [increment, setIncrement] = useState({
    add: 1,
    sub: 1,
    add1: 1,
    sub1: 1,
  });
  const handleclickinc = (e) => {
    const { name, value } = e.target;
    let countvalue = increment.add;
    let countvalue1 = increment.add1;
    if (name === "add" && countvalue < 3) {
      setIncrement({ ...increment, add: parseInt(value) + 1 });
    } else if (name === "sub" && countvalue > 1) {
      setIncrement({ ...increment, add: parseInt(countvalue) - 1 });
    } else if (name === "add1" && countvalue1 < 3) {
      setIncrement({ ...increment, add1: parseInt(value) + 1 });
    } else if (name === "sub1" && countvalue1 > 1) {
      setIncrement({ ...increment, add1: parseInt(countvalue1) - 1 });
    }
  };
  let navigate = useNavigate();
  const handlesub = (e) => {
    e.preventDefault();
    if (policyType === "family" && checkboxvalues.length > 0 && dateOfBirth != null) {
      navigate("/Plan", {
        state: {
          policyType,
          values,
          individual,
          familyMembers,
          checkboxvalues,
        },
      });
    } else if (policyType === "individual" && individual != null && dateOfBirth != null) {
      navigate("/Plan", {
        state: {
          policyType,
          values,
          individual,
          familyMembers,
          checkboxvalues,
        },
      });
    }
  };
  axios.get(`http://localhost:9090/register/getById/${values1}`)
  .then(response => {
      // Handle successful response
      console.log('Response from backend:', response.data);
      // You can do something with the response here, such as redirecting the user or updating the UI
      setvalues(response.data);
       
  })
  .catch(error => {
      console.error('Error submitting form:', error);
  });

  return (
    <div>
      <Header />
      {/* <img className='bglogo' src={bglogo4} alt='l' /> */}
      <br/>
      <br/>
      <br/>
      <div className="container-fluid " >
        <div className="row justify-content-center">
          <div className="col-sm-12">
            <div className="container-fluid text-light">
              <header className="text-center">
                <h1 className="policy">Policy Details</h1>
              </header>
            </div>
            <br />
          </div>
          <div className="row m-2">
            <div className="col-sm-12">
              <h3 className="text-success name">Hello , {values.firstname}</h3>
            </div>
          </div>
          <div className="row m-2 d-flex justify-content-center">
            <div className="col-sm-5">
              <label className="fw-bold">Select plan type:</label>
            </div>
            <div className="col-sm-5 ">
              <select
                className="form-control text-primary"
                id="poliselect"
                name="policyType"
                value={policyType}
                onChange={handlePolicyTypeChange}
                required
              >
                <option value="">Select...</option>
                <option name="individual" value="individual" className="text-dark">
                  Individual
                </option>
                <option name="family" value="family" className="text-dark">
                  Family
                </option>
              </select>
            </div>
          </div>
          <div className="row m-3 ">
            <div className="col-sm-12">
              <div className="p-2">
                <h4 className="fw-bold  text-primary mx-5">
                  Select who want's Insurence
                </h4>
              </div>
              <br />
            </div>
          </div>
          <div className="row m-1 d-flex justify-content-center">
            <div className="col-sm-6">
              <label className="fw-bold">Select Relationship :</label>
            </div>

            <div className="col-sm-5 mb-3">
              {/* 
                            <label><input type="checkbox" /> Father</label>
                            <label><input type="checkbox" /> Mother</label>
                            <label><input type="checkbox" /> Daughter</label>
                            <label><input type="checkbox" /> son</label> */}
              {policyType === "family" && values.maritual === "married" && (
                <div>
                  <h4>Select Family Members:</h4>
                  <label>
                    <input
                      type="checkbox"
                      name="mother"
                      checked={familyMembers.mother}
                      onChange={handleFamilyMemberChange}
                      value={familyMembers.mother}
                    />
                    Mother
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="father"
                      checked={familyMembers.father}
                      onChange={handleFamilyMemberChange}
                      value={familyMembers.father}
                    />
                    Father
                  </label>
                  <br />
                  {/* <label className="">
                    <input
                      type="checkbox"
                      name="daughter"
                      value={familyMembers.daughter}
                      checked={familyMembers.daughter}
                      onChange={handleFamilyMemberChange}
                    />
                    Daughter
                    {familyMembers.daughter === true && (
                      <span className="form-check-sm ms-3">
                        <button
                          onClick={handleclickinc}
                          className="form-control-sm border-0"
                          name="sub"
                          value={increment.sub}
                        >
                          -
                        </button>
                        <button className="form-control-sm border-0">
                          {increment.add}
                        </button>
                        <button
                          onClick={handleclickinc}
                          className="form-control-sm border-0"
                          name="add"
                          value={increment.add}
                        >
                          +
                        </button>
                      </span>
                    )}
                  </label> */}
                 
                  <label>
                    <input
                      type="checkbox"
                      name="children"
                      value={familyMembers.children}
                      checked={Boolean(familyMembers.children)}
                      onChange={handleFamilyMemberChange}
                    />
                    Children{" "}
                    
                    {Boolean(familyMembers.children) && (
                      <span className="form-check-sm ms-5">
                        <button
                          onClick={handleChildrenCountChange}
                          className="form-control-sm border-0"
                          name="sub1"
                          disabled={parseInt(familyMembers.children.split(" ")[1], 10) <= 1}
                        >
                          -
                        </button>
                        <button className="form-control-sm border-0">
                          {familyMembers.children.split(" ")[1]}
                        </button>
                        <button
                          onClick={handleChildrenCountChange}
                          className="form-control-sm border-0"
                          name="add1"
                        >
                          +
                        </button>
                      </span>
                    )}

                  </label>
                  <br />
                </div>
              )}
              {policyType === "family" && values.maritual === "single" && (
                <div>
                  <h4>Select Family Members:</h4>
                  <label>
                    <input
                      type="checkbox"
                      name="mother"
                      checked={familyMembers.mother}
                      onChange={handleFamilyMemberChange}
                    />
                    Mother
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="father"
                      checked={familyMembers.father}
                      onChange={handleFamilyMemberChange}
                    />
                    Father
                  </label>
                  <br />
                </div>
              )}
              {policyType === "individual" && values.maritual === "single" && (
                <div>
                  <h4>Select Relation Type:</h4>

                  <select
                    name="individual"
                    className="form-control-sm w-100 text-primary"
                    required
                    value={individual}
                    id="poliselect"
                    onChange={handleIndividualTypeChange}
                  >
                    <option value="">-Select option-</option>
                    <option value="father" className="text-dark">Father</option>
                    <option value="mother" className="text-dark">Mother</option>
                    <option value="self" className="text-dark">Self</option>
                  </select>
                </div>
              )}
              {policyType === "individual" && values.maritual === "married" && (
                <div>
                  <h4>Select Relation Type:</h4>

                  <select
                    name="individual"
                    className="form-control-sm w-100"
                    value={individual}
                    id="poliselect"
                    onChange={handleIndividualTypeChange}
                    required
                    
                  >
                    <option value="">-Select option-</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="self">Self</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="row m-2  d-flex justify-content-center">
            {/* <div className="col-sm-5">
              <label>Date Of Birth :</label>
            </div>
            <div className="col-sm-5">
              <input
                type="date"
                className="form-control"
                id="poliselect"
                // min={min_date.toISOString().split("T")[0]}
                // value={selectedDate}
                // max={today.toISOString().split("T")[0]}
                name="date"
              />
            </div> */}
            <div className="col-sm-6">
        <label className="fw-bold">Date of Birth (Your father's DOB):</label>
    </div>
    <div className="col-sm-5">
        <input
            type="date"
            className="form-control text-primary"
            id="dobField"
            name="dateOfBirth"
            min="1900-01-01"
            max="2004-12-31"
            value={dateOfBirth}
            onChange={handleDateChange}
        />
    </div>
          </div>
          <div className="row m-2  d-flex justify-content-center">
            <div className="col-sm-5">
              <label>
                Does any of insurence member/members have existing illness :
              </label>
            </div>
            <div className="col-sm-6 pt-4">
              <input type="radio" name="option" value="yes"/>
              <label for="yes">Yes</label>&nbsp;  &nbsp;
              <input type="radio" name="option" value="no" />
              <label for="no">No</label>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-sm-12 d-flex justify-content-center">
              <input
                type="submit"
                class="btn btn-primary btn-block w-25 fw-bold"
                id="btnn"
                value="Submit"
                onClick={handlesub}
              />
            </div>
          </div>
<br/>
<Footer/>
        </div>
      </div>
    </div>
  );
}

export default PolicyDetails;
