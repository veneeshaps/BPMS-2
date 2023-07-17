import React,{useState} from "react"
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Bug from './Components/UserBug';
import Patch from './Components/Patch';
import BReport from './Components/Reporter';
import Request from './Components/ReporterBug';
import PatchRequest from './Components/PatchRequest'; 
import Deployment from './Components/Deployment';
import Dev from './Components/Dev';
import Quality from './Components/Quality';
import Previous from './Components/Previous';
import TransactionDetails from "./Components/Transactions";

export default function App() {
  const [User,setUser] = useState(localStorage.getItem('token')!=null);
  return (
    <Router>
      {User ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Home />} />
          <Route path="/user/reportbug" element={<Bug />} />
          <Route path="/user/patch" element={<Patch />} />
          <Route path="/reporter" element={<BReport />} />
          <Route path="/reporter/bugreport" element={<BReport />} />
          <Route path="/reporter/sendrequest" element={<Request />} />
          <Route path="/admin" element={<PatchRequest />} />
          <Route path="/admin/requestpatch" element={<PatchRequest />} />
          <Route path="/admin/deployment" element={<Deployment />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/dev/patch" element={<Dev />} />
          <Route path="/qa" element={<Quality />} />
          <Route path="/qa/previous" element={<Previous />} />
          <Route path="reporter/transaction" element={<TransactionDetails />}/>

        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </Router>
  );
}