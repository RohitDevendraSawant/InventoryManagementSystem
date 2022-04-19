import React, { useState, useEffect } from "react";

function Fetch(props) {

    let initialData = [
        {
            category : "mouse",
            specification : "hvjhbhjb"
        },
        {
            category : "dafdf",
            specification : "hdvjhbhjb"
        },
        {
            category : "modffdduse",
            specification : "ddffg"
        },
        {
            category : "modfuse",
            specification : "hvdddjhbhjb"
        },
    ]
  const [first, setfirst] = useState(initialData);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setfirst({ ...first, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data.concat(first));
    props.showAlert("Success","Data added successfully.");

  };

  useEffect(() => {
    setData(first);
  }, [])
  
  return (
    <>
      <form>
        <input
          type="text"
          value={first.category}
          name="category"
          id="fname"
          onChange={handleChange}
        />
        <input
          type="text"
          id="lname"
          name="specification"
          value={first.specification}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      <table>
        {data.map((ele) => {
          return (
            <tr key={ele.category}>
              <th>{ele.category}</th>
              <th>{ele.specification}</th>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default Fetch;
