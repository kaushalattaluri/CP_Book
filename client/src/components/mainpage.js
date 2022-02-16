import React, { useState } from "react";
import AboutUs from "./aboutUs";
import Card from "./card";
const platforms1 = ["codechef", "codeforces", "spoj", "interview_bit", "leetcode", "atcoder"];
var platforms = [];
for (let i = 0; i < platforms1.length; i += 4) {
    platforms.push(platforms1.slice(i, Math.min(i + 4, platforms1.length)));
}

const Mainpage = ({problemsSolved}) => {
    return (
          <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg " >
              <div className="container-fluid py-4">
            {platforms.map((platformsList) => (
                <div className="container-fluid py-4">
                <div className="row">
                {
                    platformsList.map((val) => (
                        <Card platformName={val} problemsSolved={problemsSolved[val]}/>
                    ))
                }
                </div>
                </div>

            ))}
            </div>
            <AboutUs/>
          </main>

    );
}

export default Mainpage;