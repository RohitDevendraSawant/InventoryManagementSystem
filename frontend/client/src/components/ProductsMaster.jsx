import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

function ProductsMaster() {
  return (
    <>
      <div className="container my-4 ">
        <h1 className="mb-4 text-center">Products master table</h1>
        <div className="container add shadow p-3 mb-5 bg-body rounded col col-sm-5">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Category
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </form>
        </div>

        <div className="mt-4 col col-sm-6 text-center mx-auto">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mouse</td>
                <td>
                  <EditIcon /> <Delete className="ms-2" />
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Keyboard</td>
                <td>
                  <EditIcon />
                  <Delete className="ms-2" />
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>RAM</td>
                <td>
                  <EditIcon />
                  <Delete className="ms-2"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductsMaster;
