import React, { useState, useEffect } from "react";
import FilterComponent from "./filter";
import Table from "./Table/index";
var studentsData = [];
const Parent = () => {
  const [filteredStudentsData, setFilteredStudentsData] = useState([]);
  const [collegesList, setCollegesList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const handleSubmit = (query) => {
    var temp = [];
    console.log(query);
    for (let i = 0; i < studentsData.length; i++) {
      if (
        (!query.userName || query.userName === studentsData[i].userName) &&
        (!query.collegeName ||
          query.collegeName === studentsData[i].collegeName) &&
        (!query.departmentName ||
          query.departmentName === studentsData[i].departmentName)
      ) {
        temp.push(studentsData[i]);
      }
    }
    setFilteredStudentsData(temp);
  };
  async function initialize() {
    await fetch(
      `https://debuggers-backend.herokuapp.com/api/all_users/a`
    )
      .then((res) => res.json())
      .then((data) => {
        studentsData = data.response;
      });

    console.log(studentsData);
    var collegesListSet = new Set();
    var departmentsListSet = new Set();
    for (let student of studentsData) {
      collegesListSet.add(student.collegeName);
      departmentsListSet.add(student.departmentName);
    }
    setCollegesList([...collegesListSet]);
    setDepartmentsList([...departmentsListSet]);
  }
  useEffect(() => {
    initialize();
  }, []);

  const handleHeaders = (query) => {
    console.log(query);
    var temp = [...filteredStudentsData];
    temp.sort((a, b) => b[query] - a[query]);
    console.log(temp);
    setFilteredStudentsData(temp);
  };

  return (
    <div
      style={{
        //   backgroundImage:""
        backgroundColor: "#e2e8f0",
        height: "950px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // marginTop: "100px",
        // padding: "50px",
        // width: "100%"
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#252743",
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock:"10px"
        }}
      >
        <h1 style={{ fontFamily: "cursive", color: "white" }}>Leader Board</h1>
      </div>

      <FilterComponent
        collegesList={collegesList}
        departmentsList={departmentsList}
        update={handleSubmit}
      />
      <Table
        update={handleHeaders}
        data={filteredStudentsData}
        rowsPerPage={10}
      />
    </div>
  );
};
export default Parent;
