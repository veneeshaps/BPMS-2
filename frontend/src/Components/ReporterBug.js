import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import {ABI} from '../contract';
import axios from 'axios';

export default function Request() {
  const Navigate = useNavigate();
  const [bug, setBug] = useState({
    name: '',
    description: '',
    priority: 'Low',
  });
  const [feature, setFeature] = useState({
    name: '',
    description: '',
    priority: 'Low',
  });
  const [bugs, setBugs] = useState([]);
  const [features, setFeatures] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const addBug = (e) => {
    e.preventDefault();
    const newbugs = [...bugs, [bug.name, bug.description, bug.priority]];
    setBugs(newbugs);
    setBug({
      name: '',
      description: '',
      priority: 'Low',
    });
  };

  const addFeature = (e) => {
    e.preventDefault();
    const newfeatures = [...features, [feature.name, feature.description, feature.priority]];
    setFeatures(newfeatures);
    setFeature({
      name: '',
      description: '',
      priority: 'Low',
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log(bugs, features);
    const transaction = await contract.methods.addBugandFeature(bugs, features).send({ from: account });
    console.log(transaction);
    handleSubmit(transaction.from, transaction.to, transaction.gasUsed, transaction.transactionHash);
    // window.alert('Request Made');  
    window.location.reload(false);
  };

  const connectContract = async () => {
    const web3 = new Web3(window.ethereum);
    const myContract = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT_ADDRESS);
    setContract(myContract);
    console.log('Contract Connected');
  };

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('Metamask Connected');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LogOut = async (e) => {
    localStorage.removeItem('token');
    Navigate('/login');
    window.location.reload(true);
  };

  useEffect(() => {
    connectMetamask();
    connectContract();
  }, []);

  const handleSubmit = async (from, to, gasUsed, id) => {
    const UserTransaction = {
      account: account,
      id: id,
      description: 'Bug and Feature Request',
      from: from,
      to: to,
      gasUsed: gasUsed,
      token: localStorage.getItem('token'),
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_ADDRESS+'/api/transaction',
        UserTransaction
      );
      if (response) console.log(response);
    } catch (error) {
      console.log('Error:', error);
    }
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
            G57
          </Link>
          <span className="ms-4 fw-bold fs-5 text-decoration-underline">Reporter</span>
          <div className="collapse navbar-collapse" id="navbarToggler"></div>
          <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link link" to="/reporter/bugreport">
                Reported Bugs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link link" to="/reporter/sendrequest">
                Request
              </NavLink>
            </li>
          </ul>
          <div className="nav-item col-1">
            <button className="user-name fw-bold" onClick={(e) => LogOut(e)}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-5 mb-3">
        <div className=" mt-3 tab-content" id="nav-tabContent">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="bug-title"
              placeholder="BUG TITLE"
              onChange={(e) => setBug({ ...bug, name: e.target.value })}
            />
            <label htmlFor="bug-title">Bug Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="descript form-control"
              placeholder="BUG DESCRIPTION"
              id="bug-description"
              onChange={(e) => setBug({ ...bug, description: e.target.value })}
            ></textarea>
            <label htmlFor="bug-description">Bug Description</label>
          </div>
          <label>Set Bug priority:</label>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {bug.priority}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  className="dropdown-item"
                  value="Low"
                  onClick={(e) => setBug({ ...bug, priority: e.target.value })}
                >
                  Low
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="Medium"
                  onClick={(e) => setBug({ ...bug, priority: e.target.value })}
                >
                  Medium
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="High"
                  onClick={(e) => setBug({ ...bug, priority: e.target.value })}
                >
                  High
                </button>
              </li>
            </ul>
          </div>
          <center className="m-3">
            <button type="submit" className="btn btn-secondary" onClick={(e) => addBug(e)}>
              Add Bug
            </button>
          </center>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="feature-title"
              placeholder="FEATURE TITLE"
              onChange={(e) => setFeature({ ...feature, name: e.target.value })}
            />
            <label htmlFor="feature-title">Feature Name</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="descript form-control"
              placeholder="FEATURE DESCRIPTION"
              id="feature-description"
              onChange={(e) => setFeature({ ...feature, description: e.target.value })}
            ></textarea>
            <label htmlFor="feature-description">Feature Description</label>
          </div>
          <label>Set Feature Priority</label>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {feature.priority}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button
                  className="dropdown-item"
                  value="Low"
                  onClick={(e) => setFeature({ ...feature, priority: e.target.value })}
                >
                  Low
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="Medium"
                  onClick={(e) => setFeature({ ...feature, priority: e.target.value })}
                >
                  Medium
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  value="High"
                  onClick={(e) => setFeature({ ...feature, priority: e.target.value })}
                >
                  High
                </button>
              </li>
            </ul>
          </div>
          <center className="mt-3">
            <button className="btn btn-secondary" onClick={(e) => addFeature(e)}>
              Add Feature
            </button>
          </center>
        </div>
        <div className="container mt-3 p-2">
          <h5>Selected Bugs and Features:</h5>
          <div className="row gx-3">
            <div className="col border m-2 p-1">
              <h5>BUGS:</h5>
              <div className="m-3" id="selected_bugs">
                <ul>
                  {bugs.length !== 0 ? (
                    <ul>
                      {bugs.map((ele) => {
                        return <li>{ele[0]}</li>;
                      })}
                    </ul>
                  ) : (
                    <>No Bugs were selected.</>
                  )}
                </ul>
              </div>
            </div>
            <div className="col border m-2 p-1">
              <h5>FEATURES:</h5>
              <div className="m-3" id="selected_features">
                {features.length !== 0 ? (
                  <ul>
                    {features.map((ele) => {
                      return <li>{ele[0]}</li>;
                    })}
                  </ul>
                ) : (
                  <>No Features were selected.</>
                )}
              </div>
            </div>
          </div>
        </div>
        <center className="my-5" id="submit_button">
          <button className="btn btn-secondary" onClick={(e) => sendData(e)}>
            Submit Request
          </button>
        </center>
      </div>
    </>
  );
}
