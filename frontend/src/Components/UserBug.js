// import {Link,NavLink, useNavigate} from 'react-router-dom';
// import {useState} from 'react';
// import axios from 'axios';
// export default function Bug(){
//     const Navigate = useNavigate();
//     const [newBug,setBugDetails] = useState({
//         usermail:"",
//         description:""
//     })
//     const AddBug=async(event)=>{
//         event.preventDefault();
//         const {data} = await axios.post("http://localhost:3001/userbug",{...newBug});
//         if(data.status ==="Bug Added"){
//             window.alert("Reported Bug");
//             window.location.reload(false);
//         }
//     }
//     const LogOut = async(e)=>{
//         localStorage.removeItem('token');
//         Navigate('/login');
//         window.location.reload(true);
//     }
//     return(
//         <>
//         <nav className="navbar navbar-expand-md navbar-light bg-light">
//         <div className="container-fluid">
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//             </button>
//             <Link className="navbar-brand" to="/">BPMS<span className='ms-4 fw-bold fs-5 text-decoration-underline'>User</span></Link>
//             <div className="collapse navbar-collapse" id="navbarToggler"></div>
//             <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                 <NavLink className="nav-link link" to="/user">Home</NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link link" to="/user/reportbug">Report Bug</NavLink>
//                 </li>
//                 <li className="nav-item">
//                 <NavLink className="nav-link link" to="/user/patch">Patches</NavLink>
//                 </li>
//             </ul>
//             <div className="nav-item col-1">
//         <button class="user-name fw-bold" onClick={e=>LogOut(e)}>
//           Log Out
//         </button>
//       </div>
//         </div>
//         </nav>
//         <form className='m-4' onSubmit={(e)=>AddBug(e)}>
//                 <label className="fs-4 fw-bold mb-3">Enter Bug Details:</label>
//                 <br/>
//                 <label className="fw-light form-label">Enter User Email:</label>
//                 <input className="form-control" type="text" onChange={(e)=>setBugDetails({...newBug,usermail:e.target.value})}/>
//                 <label className="fw-light form-label">Description:</label>
//                 <textarea className="form-control" style={{height:"20vh"}} onChange={(e)=>setBugDetails({...newBug,description:e.target.value})}></textarea>
//                 <div className="m-3 d-flex justify-content-end">
//                     <button className="btn btn-dark" type="submit">Report Bug</button>
//                 </div>
//             </form>
//         </>
//     )
// }


import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Bug() {
  const Navigate = useNavigate();
  const [newBug, setBugDetails] = useState({
    usermail: '',
    description: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const AddBug = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/userbug', { ...newBug });
    if (data.status === 'Bug Added') {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      setBugDetails({
        usermail: '',
        description: '',
      });
    }
  };

  const LogOut = async (e) => {
    localStorage.removeItem('token');
    Navigate('/login');
    window.location.reload(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            BPMS
          </Link>
          <span className="ms-4 fw-bold fs-5 text-decoration-underline ">User</span>
          <div className="collapse navbar-collapse" id="navbarToggler"></div>
          <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link" to="/user">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link" to="/user/reportbug">
                Report Bug
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link" to="/user/patch">
                Patches
              </NavLink>
            </li>
          </ul>
          <div className="nav-item col-1">
            <button className="user-name fw-bold" onClick={LogOut}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <form className="m-4" onSubmit={AddBug}>
        <label className="fs-4 fw-bold mb-3">Enter Bug Details:</label>
        <br />
        <label className="fw-light form-label">Enter User Email:</label>
        <input
          className="form-control"
          type="text"
          value={newBug.usermail}
          onChange={(e) => setBugDetails({ ...newBug, usermail: e.target.value })}
        />
        <label className="fw-light form-label">Description:</label>
        <textarea
          className="form-control"
          style={{ height: '20vh' }}
          value={newBug.description}
          onChange={(e) => setBugDetails({ ...newBug, description: e.target.value })}
        ></textarea>
        <div className="m-3 d-flex justify-content-end">
          <button className="btn btn-dark" type="submit">
            Report Bug
          </button>
        </div>
      </form>
      {showSuccessMessage && (
        <div className="alert alert-success text-center" role="alert">
          Bug reported successfully!
        </div>
      )}
    </>
  );
}
