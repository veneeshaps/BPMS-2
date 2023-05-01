import axios from 'axios';
import Web3 from 'web3';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
export default function PatchRequest(){
    const [account,setAccount] = useState(null);
    const [contract,setContract] = useState(null);
    const Navigate = useNavigate();
    const [bugs,setBugs] = useState([]);
    const [features,setFeatures] = useState([]);
    // const [team,setTeam] = useState(null);
    const [patchID,setPID] = useState(null);

    const connectMetamask=async()=>{
        try{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({method:"eth_requestAccounts"});
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                console.log(accounts[0]);
                //window.alert("Metamask Connected");
                
            }
        }catch(error){
            console.log(error);
        }
    }
    const connectContract=async()=>{
        const web3 = new Web3(window.ethereum);
        const ABI =[
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_patchName",
                        "type": "string"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_bugs",
                        "type": "string[]"
                    },
                    {
                        "internalType": "string[]",
                        "name": "_features",
                        "type": "string[]"
                    }
                ],
                "name": "addPatch",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_patchName",
                        "type": "string"
                    }
                ],
                "name": "getPatchDetails",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string[]",
                                "name": "bugs",
                                "type": "string[]"
                            },
                            {
                                "internalType": "string[]",
                                "name": "features",
                                "type": "string[]"
                            }
                        ],
                        "internalType": "struct SolidtyTest.Patch",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const contractAddress = "0x6810741d24E42F14CE30e032bB858698802b5cD9";
        const myContract = new web3.eth.Contract(ABI , contractAddress);
        setContract(myContract);
       console.log("connected Contract");
       // window.alert("Contract Connected");
    }
    const getBugs=async()=>{
        const {data} = await axios.get("http://localhost:3001/bugs");
        if(data.bugs){
            setBugs(data.bugs);
        }
    }
    const getFeatures=async()=>{
        const {data} = await axios.get("http://localhost:3001/features");
        if(data.features){
            setFeatures(data.features);
        }
    }
    const getArray=()=>{
        const selected_bugs=[]
        const selected_features=[]
        const bugs = document.getElementsByClassName("bug")
        const features = document.getElementsByClassName("feature")
        for(let i=0;bugs[i];i++){
            if(bugs[i].checked){
                selected_bugs.push(bugs[i].value);
            }
        }
        for(let i=0;features[i];i++){
            if(features[i].checked){
                selected_features.push(features[i].value);
            }
        }
        return {bugs:selected_bugs,features:selected_features,patch:patchID};
    }
    const PatchRequest=async(e)=>{
        e.preventDefault();
        const {bugs,features} = getArray();
        console.log(patchID,bugs,features);
        contract.methods.addPatch(patchID,bugs,features).send({from: account }).call();    
    }
    useEffect(()=>{
        connectMetamask();connectContract();
    },[])
    return(
        <>
        <div className="row justify-content-center">
            <div className="col-5 m-2 border">
                <table className="table col-5" id="bug" onLoadStart={getBugs()}>
                    <thead className="bg-dark text-light">
                        <th className="p-2">S.No.</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Description</th>
                        <th></th>
                    </thead>
                    <tbody className="bg-light">
                        {
                            bugs.map((row,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.status}</td>
                                    <td>{row.description}</td>
                                    <td><input className="form-check-input bug" type="checkbox" value={row.name}/><label className="form-check-label" htmlFor={row.name}/></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> 
            </div>
            <div className="col-5 m-2 border">
                <table className="table col-5" id="feature" onLoadStart={getFeatures()}>
                    <thead className="bg-dark text-light">
                        <th className="p-2">S.No.</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Description</th>
                        <th></th>
                    </thead>
                    <tbody className="bg-light">
                {
                            features.map((row,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.status}</td>
                                    <td>{row.description}</td>
                                    <td><input className="form-check-input feature" type="checkbox" value={row.name}/><label className="form-check-label" htmlFor={row.name}/></td>
                                </tr>
                            ))
                        }
                        </tbody>
                </table>
            </div>
        </div>
        <center>
            <div className="col-2 m-4">
                {/* <input type="text" className="form-control" id="Teamid" placeholder="Enter Team Name" onChange={e=>setTeam(e.target.value)}/> */}
                <input type="text" className="mt-2 form-control" id="Patch ID" placeholder="Enter Patch ID" onChange={e=>setPID(e.target.value)}/>
                <button type="submit" className="mt-2 btn btn-primary" onClick={e=>PatchRequest(e)}>Request Patch</button>
            </div>
            </center>
    </>
    );
}