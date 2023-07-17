import {Link,NavLink, useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import Web3 from 'web3';
import {ABI} from '../contract';
import axios from 'axios';

export default function PatchRequest(){
    const Navigate = useNavigate();
    const [bugs,setBugs] = useState([]);
    const [features,setFeatures] = useState([]);
    const [patch,setPatch] = useState({
        name:"",
        description: "",
    })
    const [contract,setContract] = useState(null);
    const [account,setAccount] = useState(null);
    const getBugs=async()=>{
        const data = await contract.methods.getBugs().call();
        if(data){
            setBugs(data);
        }
    }
    const getFeatures=async()=>{
        const data = await contract.methods.getFeatures().call();
        if(data){
            setFeatures(data);
        }
    }
    const getArray=()=>{
        const selected_bugs=[]
        const selected_features=[]
        const check_bugs = document.getElementsByClassName("bug")
        const check_features = document.getElementsByClassName("feature")
        for(let i=0;check_bugs[i];i++){
            if(check_bugs[i].checked){
                selected_bugs.push([bugs[i][0],bugs[i][1],bugs[i][2]]);
            }
        }
        for(let i=0;check_features[i];i++){
            if(check_features[i].checked){
                selected_features.push([features[i][0],features[i][1],features[i][2]]);
            }
        }
        return {bugs:selected_bugs,features:selected_features};
    }
    const LogOut = async(e)=>{
        localStorage.removeItem('token');
        Navigate('/login');
        window.location.reload(true);
    }
    const Request=async(e)=>{
        e.preventDefault();
        const {bugs,features} = getArray();
        const result = await contract.methods.requestPatch(patch.name,patch.description,bugs,features).send({from: account });
        console.log(result);
        handleSubmit(result.from, result.to, result.gasUsed, result.transactionHash);
        window.location.reload(true);
    }

    
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
    useEffect(()=>{
        connectContract();
        connectMetamask();
    },[]);
    getBugs();
    getFeatures();
    return (
        <>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">BPMS</Link>
            <span className='ms-4 fw-bold fs-5 text-decoration-underline'>Admin</span>
            <div className="collapse navbar-collapse" id="navbarToggler"></div>
            <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link link" to="/admin/requestpatch">Request Patch</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link link" to="/admin/deployment">Deploy Patch</NavLink>
                </li>
            </ul>
            <div className="nav-item col-1">
        <button class="user-name fw-bold" onClick={e=>LogOut(e)}>
          Log Out
        </button>
      </div>
        </div>
        </nav>
        <h3 className='fw-bold container mt-3'>List of Bugs and Features</h3>
            <div className="row justify-content-center">
                <div className="col-5 m-2">
                    <table className="table col-5 border" id="bug">
                        <thead className="bg-dark text-light">
                            <th className="p-2">S.No.</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Priority</th>
                            <th></th>
                        </thead>
                        <tbody className="bg-light">
                            {
                                bugs.map((row,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td>{row.priority}</td>
                                        <td><input className="form-check-input bug" type="checkbox" value={row.name}/><label className="form-check-label" htmlFor={row.name}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> 
                </div>
                <div className="col-5 m-2">
                    <table className="table col-5 border" id="feature">
                        <thead className="bg-dark text-light">
                            <th className="p-2">S.No.</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Priority</th>
                            <th></th>
                        </thead>
                        <tbody className="bg-light">
                    {
                                features.map((row,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.description}</td>
                                        <td>{row.priority}</td>
                                        <td><input className="form-check-input feature" type="checkbox" value={row.name}/><label className="form-check-label" htmlFor={row.name}/></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                    </table>
                </div>
            </div>

            <div className="container text-center mt-3" id="sent_req">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="Patch Name" required onChange={e=>setPatch({...patch,name:e.target.value})}/>
                    <label htmlFor="floatingInput">Patch Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="descript form-control" placeholder="PATCH DESCRIPTION"
                        id="patch-description" onChange={e=>setPatch({...patch,description:e.target.value})}></textarea>
                    <label htmlFor="patch-description">Patch Description</label>
                </div>
                <button className="btn btn-secondary" onClick={e=>Request(e)}>Request Patch</button>
        </div>
        </>
    );
}

