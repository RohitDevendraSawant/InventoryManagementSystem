import React from "react";
import Navbar from "./Navbar";

function sample() {
  return (
    <>
    <Navbar/>
      <div className="container W-100 h-100">
        <div className="row justify-content-md-center border border-primary p-3">
          <div className="col col-sm-3">
            <div className="card border border-4" style={{ width: "16rem" }}>
              <img
                src={process.env.PUBLIC_URL + "./images/addStaff.png"}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-text text-center">Add Staff</h4>
              </div>
            </div>
          </div>
          <div className="col col-sm-3">
            <div className="card border border-4" style={{ width: "16rem" }}>
              <img
                src={process.env.PUBLIC_URL + "./images/displayStaff.png"}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-text text-center">Display Staff</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default sample;
