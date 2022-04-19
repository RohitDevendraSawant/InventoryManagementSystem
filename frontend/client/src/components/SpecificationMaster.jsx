import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

function SpecificationMaster() {
  return (
    <>
      <div className="container my-4 ">
        <h1>Specifications master table</h1>
        <div className="container add shadow p-3 mb-5 bg-body rounded col col-sm-6">
          <form>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Select Category</option>
                <option defaultValue="1">Mouse</option>
                <option defaultValue="2">CPU</option>
                <option defaultValue="3">RAM</option>
                <option defaultValue="3">Hard Disk</option>
              </select>
              <label htmlFor="exampleInputEmail1" className="form-label mt-3">
                Enter Specification
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
        <div className="container">
      
          <div className="d-flex justify-content-center col col-sm-6 mx-auto align-items-center text-center">
            {/* <select class="form-select " aria-label="Default select example">
              <option selected>Select Category</option>
              <option value="1">Mouse</option>
              <option value="2">CPU</option>
              <option value="3">RAM</option>
            </select> */}
            <p className="mx-2">Select category</p>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select

                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem >Ten</MenuItem>
                <MenuItem >Twenty</MenuItem>
                <MenuItem >Thirty</MenuItem>
              </Select>
            </FormControl>
            <FilterAltIcon className="mx-2"/>

          </div>
        </div>

        <div className="mt-4 col col-sm-9 text-center mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Specification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mouse</td>
                <td>HP mouse</td>
                <td>
                  <EditIcon style={{ cursor: "pointer" }} />{" "}
                  <Delete style={{ cursor: "pointer" }} className="ms-2" />
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>RAM</td>
                <td>Crucial 12GB RAM DDR4</td>
                <td>
                  <EditIcon style={{ cursor: "pointer" }} />{" "}
                  <Delete className="ms-2" style={{ cursor: "pointer" }} />
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Hard disk</td>
                <td>Toshiba SSD 512GB</td>
                <td>
                  <EditIcon style={{ cursor: "pointer" }} />{" "}
                  <Delete className="ms-2" style={{ cursor: "pointer" }} s />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SpecificationMaster;
