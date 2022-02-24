import React from "react";

function Login() {
  return (
    <>
      <div className="container W-100 h-100">
        {/* main container */}
        <div className="row my-5 justify-content-md-center shadow p-3 mb-5 bg-body rounded">
          <div className="col col-sm-7">
            <div className="form mt-4">
              {/* Form container */}
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
          <div className="col col-sm-4">
          <div className="image">
            {/* image container */}
            <img src={process.env.PUBLIC_URL + "./images/login.png"} alt = "login" style = {{height : "50vh",width:"35vw"}}/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
