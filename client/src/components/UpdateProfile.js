import React from "react";
const Dashboard = () => {
    const platforms = ["codechef", "codeforces", "spoj", "interview_bit", "leetcode", "atcoder"];
    async function HandleUpdate(e) {
        e.preventDefault();
        const name = document.getElementById("input-name").value;
        const email = localStorage.getItem("email");

        var handles = {};
        for (let i = 0; i < platforms.length; i++) {
            handles[platforms[i]] = document.getElementById("input-"+platforms[i]).value;
        }

        const handless = JSON.stringify(handles);


        await fetch(`https://debuggers-backend.herokuapp.com/api/user_update/name=${name}&email=${email}&handles=${handless}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.hasOwnProperty("response")) {
                    console.log("hi");
                    alert("The changes are invalid.");
                    // window.location.reload();
                } else {
                    let handles_size = 0;
                    let sum_ = 0;
                    for (var x in data.response) {
                        sum_ += data.response[x];
                        handles_size++;
                    }
                    if (sum_ !== handles_size) {
                        alert("Incorrect handles");
                        return ;
                    }
                    localStorage.setItem("name", name);
                    for (let i = 0; i < platforms.length; i++) {
                        localStorage.setItem(platforms[i], handles[platforms[i]]);
                    }
                    alert("Update success");
                }
            });
    }
    function initialize() {
        setTimeout(function() {
            document.getElementById("input-name").value = localStorage.getItem("name");
            for (let i = 0; i < platforms.length; i++) {
                document.getElementById("input-"+platforms[i]).value = localStorage.getItem(platforms[i]);
            }
        }, 10);
    }
    initialize();
    return (
        <form onSubmit={HandleUpdate}>
            <h3>Update profile</h3>
            <div className="form-group">
                <label>Name</label>
                <input id="input-name" className="form-control" placeholder="Enter name" required />
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

            <button type="submit" className="btn btn-dark btn-lg btn-block">Update</button>
        </form>
    );
}

export default Dashboard;