import React, { useState } from "react";

function Registrations() {
  const [Visibility, setVisibility] = useState("hidden");
  const handleClick = () => {
    if (Visibility === "visible") {
      setVisibility("hidden");
    } else {
      setVisibility("visible");
    }
  };
  return (
    <>
      <div className="container W-100 h-100">
        {/* main container */}
        <div className="row my-5 justify-content-md-center shadow p-3 mb-5 bg-body rounded">
          <div className="col col-sm-7">
            <div className="form">
              {/* form container */}
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Role" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Role"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <div className="row">
                    <div className="col col-sm-11">
                      <input
                        type={Visibility === "visible" ? "text" : "password"}
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="col col-sm-1 align-items-center">
                      <i
                        className= { Visibility === 'hidden'?'fa fa-solid fa-eye':"fa fa-solid fa-eye-slash"}
                        onClick={handleClick}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Confirm Password
                  </label>
                  <div className="row">
                    <div className="col col-sm-12">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-success">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="col col-sm-4">
            <div className="image">
              {/* image container */}
              <img
                src={process.env.PUBLIC_URL + "./images/signup (2).png"}
                alt="register"
                style={{ height: "50vh", width: "35vw" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrations;
