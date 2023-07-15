// const {contractAddress,StorageAPI} = {contractAddress:process.env.REACT_APP_CONTRACT_ADDRESS,StorageAPI:process.env.REACT_APP_STORAGE_API}
import {Link,NavLink, useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {ABI} from '../contract';
import {Web3Storage} from 'web3.storage'
import Web3 from 'web3';
export default function Previous(){
    const Navigate = useNavigate();
    const [contract,setContract] = useState(null);
    const [account,setAccount] = useState(null);
    const [patches,setPatches] = useState(null);
    const client = new Web3Storage({token: process.env.REACT_STORAGE_API});
    const connectContract=async()=>{
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(ABI , process.env.REACT_APP_CONTRACT_ADDRESS);
        setContract(myContract);
        console.log("Contract Connected");
    }
    const connectMetamask=async()=>{
        try{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({method:"eth_requestAccounts"});
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                console.log("Metamask Connected");
            }
        }catch(error){
            console.log(error);
        }
    }
    const downloadPatch=async(e,cid)=>{
        try {
            const res = await client.get(cid);
        
            if (res.ok) {
              const files = await res.files();
        
              files.forEach(async (file) => {
                const response = await fetch(file.cid.toString());
                const blob = await response.blob();
        
                // Create a temporary download link
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(blob);
                downloadLink.download = file.name;
        
                // Programmatically trigger the download
                downloadLink.click();
        
                // Clean up the temporary download link
                URL.revokeObjectURL(downloadLink.href);
                downloadLink.remove();
              });
        
              console.log('Files downloaded successfully!');
            } else {
              console.error('Error retrieving files:', res.status, res.statusText);
            }
          } catch (error) {
            console.error('Error downloading files:', error);
          }
    }
    const getPatches=async()=>{
        const approved = await contract.methods.approvedPatches().call();
        const rejected = await contract.methods.rejectedPatches().call();
        setPatches([...approved,...rejected]);
    }
    const LogOut = async(e)=>{
        localStorage.removeItem('token');
        Navigate('/login');
        window.location.reload(true);
    }
    useEffect(()=>{
        connectMetamask();connectContract();
    },[]);
    getPatches();
    return(
        <>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">BPMS</Link>
            <span className='ms-4 fw-bold fs-5 text-decoration-underline'>Quality Checker</span>
            <div className="collapse navbar-collapse" id="navbarToggler"></div>
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link link" to="/qa">Recieved Request</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link link" to="/qa/previous">Previous Requests</NavLink>
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
                {patches?
                <>
                <th>S.No.</th>
                <th>Patch Name</th>
                <th>Patch Description</th>
                <th>Bugs and Features</th>
                <th>Version</th>
                <th>Approve/Reject</th>
                <th>Download</th>
                </>
            :<></>
                }
                <tbody>
                    {
                        patches?
                        patches.map((row,index)=>{
                            return(<tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>{row.bugs.map(bug=><>{bug[0]} </>)}
                                {row.features.map(feature=><>{feature[0]} </>)}
                                </td>
                                <td>{row.version}</td>
                                <td>{row.approved?<span className='text-success fw-bold'>Approved</span>:<span className='text-danger fw-bold'>Rejected</span>}</td>
                                <td><button onClick  = {e=>downloadPatch(e,row[7])} className='btn-sm btn-dark'>Download</button></td>
                            </tr>);
                        }):<>No Patches were Found.</>
                    }</tbody>
            </table>
        </div>
        </>
    );
}