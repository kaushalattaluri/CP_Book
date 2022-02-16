import React, { useEffect, useState } from "react";
import "../App.css";
import "../assets/img/apple-icon.png";
import "../assets/img/favicon.png";

import "../assets/css/nucleo-icons.css";
import "../assets/css/nucleo-svg.css";
import "https://kit.fontawesome.com/42d5adcbca.js";


import "../assets/css/soft-ui-dashboard.css";
import Mainpage from "./mainpage";
import Sidebar from "./sidebar";
import ErrorPage from "./errorpage";


const Dashboard = () => {
    const [userData, setUserData] = useState({
        codechef:"",
        codeforces:"",
        atcoder:"",
        spoj:"",
        interview_bit:"",
        leetcode:""
    });
    async function initialize() {
        var email = localStorage.getItem("email");
        var temp = {};
        await fetch(
            `https://debuggers-backend.herokuapp.com/api/user/${email}`
          )
            .then((res) => res.json())
            .then((data) => {
                temp = data.response;
            });
            setUserData(temp);
    };
    useEffect(() => {
        initialize();
      }, []);

    if (!localStorage.getItem("name")) {
        return (
            <ErrorPage />
        );
    }
    return (
        <div className="grid-container g-sidenav-show  bg-gray-100">
        <Sidebar />
        <Mainpage problemsSolved={userData}/>
        </div>
    );
}

export default Dashboard;
