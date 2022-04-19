import React from "react";
import { useState } from "react";

function DatePicker() {

    const [state, setstate] = useState({date : ""});

    const handleChange = (event)=>{
        setstate({[event.target.name] : event.target.value});
    }
  return (
    <input
      className="form-control"
      id="Date"
      name="date"
      type="date"
      value={state.date}
      onChange={handleChange}
    />
  );
}

export default DatePicker;
