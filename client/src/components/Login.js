import React from "react";
import { useHistory } from "react-router-dom";
const Login = () => {
        const history = useHistory();
        const HandleLogin = (e) => {
            e.preventDefault();
            const email = document.getElementById("input-email").value;
            const password = document.getElementById("input-password").value;
            const platforms = ["codechef", "codeforces", "spoj", "interview_bit", "leetcode", "atcoder"];
            
            console.log(email, password);
            fetch(`http://localhost:5000/login?email=${email}&password=${password}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data[0]) {
                        console.log("login done");
                        localStorage.setItem("name", data[0].name);
                        localStorage.setItem("email", data[0].email);
                        for (let i = 0; i < platforms.length; i++) {
                            localStorage.setItem(platforms[i], data[0].handles[platforms[i]]['name']);
                        }
                        history.push("/dashboard");
                    } else {
                        alert("Given user name or password is incorrect.");
                        // window.location.reload();
                    }
                });
        }
    return (
        <form onSubmit={HandleLogin}>
            <h3>Log in</h3>
            <div className="form-group">
                <label>Email</label>
                <input type="email" id="input-email" className="form-control" placeholder="Enter email" required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" id="input-password" className="form-control" placeholder="Enter password" required />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
        </form>
    );
}

export default Login;