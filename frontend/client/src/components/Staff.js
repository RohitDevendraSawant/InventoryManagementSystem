
import * as React from "react";

function Staff() {
  return (
    <>
      <div className="container mt-3">
        <h3>Staff details</h3>
        <hr />
        <div className="table mt-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <th scope="row">1</th>
                <td>Shreerang Patil</td>
                <td>Student</td>
                <td>shreePatil@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Bhagyashri Purohit</td>
                <td>Student</td>
                <td>bPurohit@gmail.com</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Rohit Sawant</td>
                <td>Student</td>
                <td>rosawant51@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Staff;
