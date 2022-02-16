import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import "../App.css";
const FilterComponent = ({ collegesList, departmentsList, update }) => {
  const [values, setValues] = useState({
    userName: "",
    collegeName: "",
    departmentName: "",
  });
  const handleUserNameInputChange = (event) => {
    setValues({ ...values, userName: event.target.value });
  };

  const handleCollegeNameInputChange = (event) => {
    setValues({ ...values, collegeName: event.target.value });
  };

  const handleDepartmentNameInputChange = (event) => {
    setValues({ ...values, departmentName: event.target.value });
  };

  return (
    <div className="FilterContainer">
      <div className="usernameContainer">
        <h2>Username:</h2>
        <input
          type="text"
          onChange={handleUserNameInputChange}
          placeholder="User Name"
          name="userName"
          className="username"
        />
      </div>

      <div className="dContainer">
        <h2>Filters:</h2>

        <select
          className="Dropdown"
          aria-label="Default select example"
          onClick={handleCollegeNameInputChange}
          name="college"
        >
          <option value="" key="0">
            None
          </option>
          {collegesList.map((college) => (
            <option value={college} key={college}>
              {college}
            </option>
          ))}
        </select>
        <select
          aria-label="Default select example"
          onClick={handleDepartmentNameInputChange}
          name="department"
          className="Dropdown"
        >
          <option value="" key="0">
            None
          </option>
          {departmentsList.map((college) => (
            <option value={college} key={college}>
              {college}
            </option>
          ))}
        </select>
      </div>
      <button className="button-54" onClick={(e) => update(values)}>Submit</button>
    </div>
  );
};
export default FilterComponent;
