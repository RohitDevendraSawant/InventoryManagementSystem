import "./App.css";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Registrations from "./components/Registrations";
import Staff from "./components/Staff";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsMaster from "./components/ProductsMaster";
import SpecificationMaster from "./components/SpecificationMaster";
import DatePicker from "./components/DatePicker";
import Fetch from "./components/Fetch";
import { useState } from "react";
import Alert from "./components/Alert";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      {/* <DatePicker/> */}
      <Alert alert={alert} />
      <Fetch showAlert = {showAlert}/>
      {/* <BrowserRouter>
        <Navbar/> */}
      {/* <ProductsMaster/> */}
      {/* <SpecificationMaster/> */}
      {/* <Staff/> */}
      {/* <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route exact path="/register" element = {<Registrations/>} />
          <Route exact path = "/admin" element = {<Admin/>}/>
          <Route exact path = "/staffDetails" element = {<Staff/>}/>
        </Routes> */}
      {/* </BrowserRouter>  */}
    </>
  );
}
export default App;
