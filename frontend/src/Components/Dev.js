import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {ABI} from '../contract';
import {Web3Storage} from 'web3.storage';
import Web3 from 'web3';
import axios from "axios";
const UploadButton = ({ onClick }) => {
    const fileInputRef = useRef(null);
    const handleUpload = async () => {
        const files = fileInputRef.current.files;
        if (files.length > 0) {
          const file = files[0];
          onClick(files);
          console.log('File:', file);
        }
      };
      
    return (
        <div>
            <input type="file" ref={fileInputRef} />
            <button className="btn btn-primary" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};
export default function Dev() {
    const Navigate = useNavigate();
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [patches, setPatches] = useState(null);
    const [files, setFiles] = useState({});
  
    const client  = new Web3Storage({token: process.env.REACT_APP_STORAGE_API});
    const connectContract = async () => {
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT_ADDRESS);
        setContract(myContract);
        console.log("Contract Connected");
    }
    const LogOut = async(e)=>{
        localStorage.removeItem('token');
        Navigate('/login');
        window.location.reload(true);
    }
    const connectMetamask = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                console.log("Metamask Connected");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const FileChange = (e, index) => {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [index]: e.target.files[0],
      }));
    };

    
      
    const getPatches = async () => {
        const data = await contract.methods.patchDetails().call();
        setPatches(data);
    }
  
    
    const requestQA = async (e,index) => {
        e.preventDefault();
        let cid ='';
        await client.put([files[index]],{onRootCidReady: (localCid) => {
                cid = localCid;
        }});
        const version = document.getElementById(patches[index][0]).value;
        console.log(patches[index][0],
            patches[index][1],
            patches[index][2],
            patches[index][3],
            version,
            cid)
        const result = await contract.methods
        .requestQA(
          patches[index][0],
          patches[index][1],
          patches[index][2],
          patches[index][3],
          version,
          cid
        )
        .send({ from: account});
        handleSubmit(result.from, result.to, result.gasUsed, result.transactionHash);
          window.location.reload(true);
    }
    const handleSubmit = async (from, to, gasUsed, id) => {
        const UserTransaction = {
          account: account,
          id: id,
          description: 'Requesting Patch',
          from: from,
          to: to,
          gasUsed: gasUsed,
          token: localStorage.getItem('token'),
        };
    
        try {
          const response = await axios.post(process.env.REACT_APP_SERVER_ADDRESS+'/api/transaction', UserTransaction);
          if (response) console.log(response);
        } catch (error) {
          console.log('Error: ', error);
        }
      };
    
  
    useEffect(() => {
        connectMetamask(); connectContract();
        },[]);
    getPatches();
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">BPMS</Link>
                    <span className='ms-4 fw-bold fs-5 text-decoration-underline'>Developer</span>
                    <div className="collapse navbar-collapse" id="navbarToggler"></div>
                    <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link link" to="/dev/patch">Home</NavLink>
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
                <h3 className="fw-bold text-center">List of Patches</h3>
                <table className="table text-center">
                    {patches ?
                        <>
                            <th>S.No.</th>
                            <th>Patch Name</th>
                            <th>Patch Description</th>
                            <th>Bugs and Features</th>
                            <th>Enter Version</th>
                            <th>File</th>
                            <th>Upload</th>
                        </>
                        : <></>
                    }
                    <tbody>
                    {
                            patches ?
                                patches.map((row, index) => {
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td>{row.bugs.map(bug => <>{bug[0]} </>)}
                                            {row.features.map(feature => <>{feature[0]} </>)}
                                        </td>
                                        <td><input className='form-control-sm' type='text' id={row.name} placeholder='Version Number' /></td>
                                        <td><input className="form-control form-control-sm" id={index} type="file" onChange={e => FileChange(e,index)} /></td>
                                        <td>
                                            {/* <UploadButton onClick={(files) => handleUpload(row, files)} />
                                            {row.link && (
                                                <div>
                                                    <a href={row.link} target="_blank">
                                                        {row.link}
                                                    </a>
                                                </div>
                                            )} */}
                                        </td>
                                        <td><button className='btn-sm btn-dark' value={index} onClick={(e)=>requestQA(e,index)}>Upload</button></td>
                                    </tr>);
                                }) : <>No Patches were Found.</>
                        }
 
                        </tbody>
                </table>
            </div>
        </>
    );
}