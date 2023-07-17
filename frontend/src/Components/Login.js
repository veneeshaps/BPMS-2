import './Login.css';
import {useState} from 'react';
import {Link,useNavigate,NavLink} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const Navigate = useNavigate();
    const [log, setLog] = useState({
      email: "",
      password: ""
    });
    const [error, setError] = useState(""); // New state for error message
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/login', { ...log });
        localStorage.setItem('token',data.tok);
        if (data.usertype) {
          Navigate('/' + data.usertype.toLowerCase());
          window.location.reload(true);
        } else if (data.error) {
          setError("Invalid login."); // Set the error message
        }
      } catch (err) {
        console.log(err);
      }
    }
  
  
    
    return( 
    <>
    <nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">BPMS</Link>
        <div className="collapse navbar-collapse" id="navbarToggler"></div>
        <ul className="container-fluid justify-content-end navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link link" to="/signup">Sign Up</NavLink>
            </li>
        </ul>
    </div>
    </nav>
    <div className="container-fluid">
        <div className="row justify-content-evenly log-welcome rounded">
            <div className="col-4">
                <div className="m-4">
                    <h1>Log in<span style={{color:"rgb(104,108,116)"}}> / Sign up</span></h1>
                    <center>
                        <p className="fw-light">Login to confirm your identity</p>
                    </center>
                </div>
            </div>
            <form className="col-4 m-4 rounded border bg-light" onSubmit={(e)=>handleSubmit(e)}>
                <div className="m-4">
                <label className="fw-bold">E-mail :</label>
                <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
                <p id="emailred" className="outred fs-6 fw-lighter"></p>
                <label className="fw-bold">Password :</label>
                <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,password:e.target.value})}/>
                <p id="passred" className="outred fs-6 fw-lighter"></p>
                {error &&(<div className="error-message">
                    <p>{error}</p>
                </div>)}
                <div className="d-flex justify-content-end">
                    <p className="h6 fw-lighter">Don't have an Account?<Link className="log-link fw-lighter" to="/signup"> Sign Up</Link></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn log-button" style={{backgroundColor:"rgb(104,108,116)"}} type="submit">Login</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </>);
}