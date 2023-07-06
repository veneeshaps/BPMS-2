import {Link,NavLink} from 'react-router-dom';
export default function Home(){
    return(<>
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
            <NavLink className="nav-link link" to="/user">Home</NavLink>
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
    </>)
}