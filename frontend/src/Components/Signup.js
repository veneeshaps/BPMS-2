import './Login.css';
import {useState} from 'react';
import {Link,useNavigate,NavLink} from 'react-router-dom';
import axios from 'axios';

export default function Signup(){
    const Navigate = useNavigate();
    const [log,setLog] = useState({
        email:"",
        password:"",
        type:"User"
    });
    const handleChange = async(event)=>{
        setLog({...log,type:event.target.value});
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {data} = await axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/signup',{...log})
            if(data.email==="Email is already Registered."){
                document.getElementById('emailred').innerHTML = data.email;
            }
        }catch(err){
            console.log(err);
        }
        // window.location.reload(false);
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
            <NavLink className="nav-link link" to="/login">Login</NavLink>
            </li>
        </ul>
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
                <label className="fw-bold">E-mail :</label>
                <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
                <p id="emailred" className="text-danger fs-6 fw-lighter"></p>
                <label className="fw-bold">Password :</label>
                <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,password:e.target.value})}/>
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