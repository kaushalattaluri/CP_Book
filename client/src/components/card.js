import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
import "../App.css";
const Card = ({ platformName, problemsSolved }) => {
    console.log("In card");
    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-capitalize font-weight-bold">{platformName}</p>
                    <h5 className="font-weight-bolder mb-0">
                      {problemsSolved.name}
                    </h5>
                    <h5 className="font-weight-bolder mb-0">
                      {problemsSolved.pc} Problems
                    </h5>

                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Card;