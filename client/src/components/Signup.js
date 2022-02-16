import React from "react";
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';

const Signup = () => {
    const history = useHistory();
    async function sendMail(name, email) {
        await emailjs.send("service_5x3qgm7","template_e6tiee9",{name: name, email: email})
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    async function HandleSignup(e) {
        e.preventDefault();
        const name = document.getElementById("input-name").value;
        const email = document.getElementById("input-email").value;
        const password = document.getElementById("input-password").value;
        const mobile = document.getElementById("input-mobile").value;
        const college = document.getElementById("input-college").value;
        const dept = document.getElementById("input-dept").value;

        const platforms = ["codechef", "codeforces", "spoj", "interview_bit", "leetcode", "atcoder"];
        var handles = {};
        for (let i = 0; i < platforms.length; i++) {
            handles[platforms[i]] = document.getElementById("input-"+platforms[i]).value;
        }

        const handless = JSON.stringify(handles);
        
        console.log(name, email, password);
        console.log(handles);
        console.log(handless);

        await fetch(`http://localhost:5000/getUserData/?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    mySubmitHandler();
                }
            });

        await fetch(`https://debuggers-backend.herokuapp.com/api/register/name=${name}&email=${email}&password=${password}&mobile=${mobile}&college=${college}&dept=${dept}&handles=${handless}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.hasOwnProperty("response")) {
                    console.log("signup done");
                    let sum_ = 0;
                    for (var x in data.response) {
                        sum_ += data.response[x];
                    }
                    if (sum_ !== 6) {
                        incorrectHandles();
                    }
                    localStorage.setItem("name", name);
                    localStorage.setItem("email", email);
                    for (let i = 0; i < platforms.length; i++) {
                        localStorage.setItem(platforms[i], handles[platforms[i]]);
                    }
                    sendMail(name, email);
                    history.push('/dashboard');
                } else {
                    console.log("hi");
                    incorrectHandles();
                    // window.location.reload();
                }
            });
    }
    function mySubmitHandler() {
        alert("An account with this email-id already exists.");
        window.location.reload();
    }
    function incorrectHandles() {
        alert("Incorrect handles");
        history.push('/signup');
    }
      
    return (

        <form onSubmit={HandleSignup}>
            <h3>Register</h3>
            <div className="form-group">
                <label>Name</label>
                <input id="input-name" className="form-control" placeholder="Enter name" required />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" id="input-email" className="form-control" placeholder="Enter email" required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" id="input-password" className="form-control" placeholder="Enter password" required />
            </div>

            <div className="form-group">
                <label>Mobile</label>
                <input id="input-mobile" className="form-control" placeholder="Enter mobile" required />
            </div>

            <div className="form-group">
                <label>College</label>
                <input id="input-college" className="form-control" placeholder="Enter college" required />
            </div>

            <div className="form-group">
                <label>Department</label>
                <input id="input-dept" className="form-control" placeholder="Enter department" required />
            </div>

            <div className="form-group">
                <label>Codechef</label>
                <input id="input-codechef" className="form-control" placeholder="Enter Codechef handle" />
            </div>

            <div className="form-group">
                <label>Codeforces</label>
                <input id="input-codeforces" className="form-control" placeholder="Enter Codeforces handle" />
            </div>

            <div className="form-group">
                <label>Spoj</label>
                <input id="input-spoj" className="form-control" placeholder="Enter Spoj handle" />
            </div>

            <div className="form-group">
                <label>InterviewBit</label>
                <input id="input-interview_bit" className="form-control" placeholder="Enter InterviewBit handle" />
            </div>

            <div className="form-group">
                <label>Leetcode</label>
                <input id="input-leetcode" className="form-control" placeholder="Enter Leetcode handle" />
            </div>

            <div className="form-group">
                <label>AtCoder</label>
                <input id="input-atcoder" className="form-control" placeholder="Enter AtCoder handle" />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        </form>
    );
}

export default Signup;