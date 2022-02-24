import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container W-100 h-100">
        <div className="row justify-content-sm-center my-5 ">
          {/* Grid starts here. */}
          <div className="col col-sm-3">
            <div
              className="card border-primary rounded-end mb-3 shadow p-3 mb-5 bg-body rounded "
              style={{
                width: "15rem",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              {/* Add staff card */}
              <img
                src={process.env.PUBLIC_URL + "./images/add.png"}
                className="card-img-top "
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-text text-center">Add Staff</h4>
              </div>
            </div>
          </div>
          <div className="col col-sm-3">
            <div
              className="card border-primary rounded-end mb-3 shadow p-3 mb-5 bg-body rounded"
              style={{ width: "15rem", cursor: "pointer" }}
              onClick={() => navigate("/staffDetails")}
            >
              {/* Staff details card */}
              <img
                src={process.env.PUBLIC_URL + "./images/display.png"}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-text text-center">Staff Details</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
