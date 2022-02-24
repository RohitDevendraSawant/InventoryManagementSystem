import './App.css';
import Admin from './components/Admin';
import Login from './components/Login';
import Registrations from './components/Registrations';
import Staff from './components/Staff';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route exact path="/register" element = {<Registrations/>} />
          <Route exact path = "/admin" element = {<Admin/>}/>
          <Route exact path = "/staffDetails" element = {<Staff/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
