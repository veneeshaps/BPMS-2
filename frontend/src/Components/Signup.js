import './Login.css';
import {useState} from 'react';
import {Link,useNavigate,NavLink} from 'react-router-dom';
import axios from 'axios';

export default function Signup(){
    const Navigate = useNavigate();
    const [log,setLog] = useState({
        email:"",
        pass:""
    });
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:3001/signup',{...log})
        }catch(err){
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
        <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink className="nav-link link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/user/home">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/user/reportbug">Report Bug</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/user/patch">Patches</NavLink>
            </li>
        </ul>
        {/* <div className="nav-item ms-auto">
        <span class="user-name fw-bold">
          USER
        </span>
      </div> */}
    </div>
    </nav>
    <div className="container-fluid">
        <div className="row justify-content-evenly log-welcome rounded">
            <div className="col-4">
                <div className="m-4">
                    <h1>Sign up</h1>
                </div>
            </div>
            <form className="col-4 m-4 rounded border bg-light" onSubmit={(e)=>handleSubmit(e)}>
                <div className="m-4">
                <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Choose a Role
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button className="dropdown-item" value="User" onClick>User</button></li>
                            <li><button className="dropdown-item" value="Reporter" onClick>Reporter</button></li>
                            <li><button className="dropdown-item" value="High" onClick>High</button></li>
                            <li><button className="dropdown-item" value="Development" onClick>Development</button></li>
                            <li><button className="dropdown-item" value="Quality checker" onClick>Quality Checker</button></li>
                        </ul>
                    </div>
                <label className="fw-bold">E-mail :</label>
                <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
                <p id="emailred" className="outred fs-6 fw-lighter"></p>
                <label className="fw-bold">Password :</label>
                <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,pass:e.target.value})}/>
                <p id="passred" className="outred fs-6 fw-lighter"></p>
                <div className="d-flex justify-content-end">
                    <p className="h6 fw-lighter">Already have an Account?<Link className="log-link fw-lighter" to="/login"> Login</Link></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn log-button" style={{backgroundColor:"rgb(104,108,116)"}} type="submit">Submit</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </>);
}