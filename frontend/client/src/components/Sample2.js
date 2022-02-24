import React from "react";

function sample2() {
  return (
    <>
      <div className="container W-100 h-100">
        <div className="row justify-content-md-center">
          <div className="card border-primary rounded-end mb-3" style={{ width: "15rem" }}>
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
      </div>
    </>
  );
}

export default sample2;
