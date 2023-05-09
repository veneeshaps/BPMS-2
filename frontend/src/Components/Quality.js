import {Link,NavLink} from 'react-router-dom';
import {useState,useEffect} from 'react';
import {ABI,contractAddress} from '../contract';
import Web3 from 'web3';
export default function Quality(){
    const [contract,setContract] = useState(null);
    const [account,setAccount] = useState(null);
    const [patches,setPatches] = useState(null);
    const connectContract=async()=>{
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(ABI , contractAddress);
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
    const requestedPatches=async()=>{
        const data = await contract.methods.requestedPatches().call();
        setPatches(data);
    }
    const approvePatch=async(e)=>{
        e.preventDefault();
        await contract.methods.approvePatch(patches[e.target.value][0],patches[e.target.value][1],patches[e.target.value][2],patches[e.target.value][3],patches[e.target.value][4]).send({from:account});
    }
    const rejectPatch=async(e)=>{
        e.preventDefault();
        await contract.methods.rejectPatch(patches[e.target.value][0],patches[e.target.value][1],patches[e.target.value][2],patches[e.target.value][3],patches[e.target.value][4]).send({from:account});
    }
    useEffect(()=>{
        connectMetamask();connectContract();
    },[]);
    requestedPatches();
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
                <NavLink className="nav-link link" to="/qa">Recieved Request</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link link" to="/qa/previous">Previous Requests</NavLink>
                </li>
            </ul>
            <div className="nav-item ms-auto">
        <span class="user-name fw-bold">
          QUALITY CHECKER
        </span>
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
                                <td><button className='btn-sm btn-success me-2' value={index} onClick={e=>approvePatch(e)}>Approve</button>
                                <button className='btn-sm btn-danger' value={index} onClick={e=>rejectPatch(e)}>Reject</button></td>
                                <td><button className='btn-sm btn-dark'>Download</button></td>
                            </tr>);
                        }):<>No Patches were Found.</>
                    }</tbody>
            </table>
        </div>
        </>
    )
}