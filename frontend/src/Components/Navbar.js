import {useState} from 'react';
import {Link,NavLink, Outlet,useNavigate} from 'react-router-dom';
export default function Navbar(){
    const Navigate = useNavigate();
    const [User,setUser] = useState("Admin");
    const [admin,setadmin] = useState(false);
    const [reporter,setreporter] = useState(false);
    const [patchdev,setpatchdev] = useState(false);
    const [qc,setqc] = useState(false);
    const changeUser=async(event)=>{
        event.preventDefault();
        if(event.target.id==="admin"){
            setadmin(true);
            setreporter(false);
            setpatchdev(false);
            setqc(false);
            setUser("Admin");
            Navigate('/admin/home');
        }
        else if(event.target.id==="reporter"){
            setadmin(false);
            setreporter(true);
            setpatchdev(false);
            setqc(false);
            setUser("Reporter");
            Navigate('/home');
        }
        else if(event.target.id==="patch dev"){
            setadmin(false);
            setreporter(false);
            setpatchdev(true);
            setqc(false);
            setUser("Patch Dev");
            Navigate("/dev/currentrequest");
        }
        else if(event.target.id==="quality dev"){
            setadmin(false);
            setreporter(false);
            setpatchdev(false);
            setqc(true);
            setUser("Quality Dev");
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
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        {
            admin?
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link link" to="/admin/home">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/admin/patchrequest">Patch Request</NavLink>
            </li>
            </ul>
            :<></>
        }
        {
            reporter?
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/bugs">Bugs</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link link" to="/features">Features</NavLink>
            </li>
            </ul>
            :<></>
        }
        {
            patchdev?
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <NavLink className="nav-link link" to="/dev/currentrequest">Current Request</NavLink>
            </li>
            </ul>
            :<></>
        }
        {
            admin || reporter || patchdev?<></>:<div className="container-fluid"></div>
        }

        <div className="d-flex justify-content-end">
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {User}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item" id="admin" onClick={(e)=>changeUser(e)}>Admin</button></li>
            <li><button className="dropdown-item" id="reporter" onClick={(e)=>changeUser(e)}>Reporter</button></li>
            <li><button className="dropdown-item" id="patch dev" onClick={(e)=>changeUser(e)}>Patch Developer</button></li>
            <li><button className="dropdown-item" id="quality dev" onClick={(e)=>changeUser(e)}>Quality Checker</button></li>
        </ul>
        </div>
        </div>
        </div>
    </div>
    </nav>
    <Outlet/>
    </>
    );
}