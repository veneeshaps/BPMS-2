import {Link,NavLink,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
export default function BReport(){
    const Navigate = useNavigate();
    const [bugs,setBugs] = useState(null);
    const getBugs=async()=>{
        const {data} = await axios.get("http://localhost:3001/bugreport");
        if(data.status==="No Bugs Found"){
            console.log("No Bugs were Found");
        }else{
            if(data.bugs!=null){
                setBugs(data.bugs);
            }
        }
    }
    const LogOut = async(e)=>{
        localStorage.removeItem('token');
        Navigate('/login');
        window.location.reload(true);
    }
    useEffect(()=>{
        getBugs();
    },[])
    return(
        <>
   <nav className="navbar navbar-expand-md navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">BPMS<span className='ms-4 fw-bold fs-5 text-decoration-underline'>Reporter</span></Link>
    <div className="collapse navbar-collapse" id="navbarToggler"></div>
    <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link link" to="/reporter/bugreport">Reported Bugs</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link link" to="/reporter/sendrequest">Request</NavLink>
      </li>
    </ul>
    <div className="nav-item col-1">
        <button class="user-name fw-bold" onClick={e=>LogOut(e)}>
          Log Out
        </button>
      </div>
  </div>
</nav>



        <div className="container-fluid">
            <h3 className="fw-bold text-center">List of Bugs</h3>
            <table className="table text-center">
                {bugs?
                <>
                <th>S.No.</th>
                <th>Reported By</th>
                <th>Description</th>
                </>
            :<></>
                }
                <tbody>
                    {
                        bugs?
                        bugs.map((row,index)=>{
                            return(<tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.usermail}</td>
                                <td>{row.description}</td>
                            </tr>);
                        }):<>No Bugs were Found.</>
                    }</tbody>
            </table>
        </div>
        </>
    )
}