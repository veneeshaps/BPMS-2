import {Link,NavLink} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Web3 from 'web3';
import {ABI,contractAddress,fileContent} from '../contract';
export default function Patch(){
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
                console.log(account);
            }
        }catch(error){
            console.log(error);
        }
    }
    const downloadPatch=(e)=>{
        if (fileContent) {
            const element = document.createElement('a');
            const file = new Blob([atob(fileContent)], {type: 'application/x-msdownload'});
            element.href = URL.createObjectURL(file);
            element.download = 'file.exe';
            document.body.appendChild(element);
            element.click();
          }
    }
    const getPatches=async()=>{
        const data = await contract.methods.deployedPatches().call();
        setPatches(data);
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
            <div className="collapse navbar-collapse" id="navbarToggler"></div>
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
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
            <div className="nav-item ms-auto">
        <span className="user-name fw-bold">
          USER
        </span>
      </div>
        </div>
        </nav>
        <div className="container-fluid">
            <h3 className="fw-bold text-center">Updates</h3>
            <table className="table text-center">
                {patches?
                <>
                <th>S.No.</th>
                <th>Patch Name</th>
                <th>Patch Description</th>
                <th>Bugs and Features</th>
                <th>Version</th>
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
                                <td><button  onClick  = {e=>downloadPatch(e)} className='btn-sm btn-dark'>Download</button></td>
                            </tr>);
                        }):<>No Patches were Found.</>
                    }</tbody>
            </table>
        </div>
        </>
    )
}