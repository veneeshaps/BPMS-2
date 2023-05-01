import {useEffect,useState} from 'react';
import Web3 from 'web3';

export default function RequestDev(){
    const [account,setAccount] = useState(null);
    const [contract,setContract] = useState(null);
    // const [team,setTeam] = useState(null);
    const [patchID,setPatch] = useState(null);
    const getDetails=async(event)=>{
        event.preventDefault();
        // console.log(team,patchID);
        const data = await contract.methods.getPatchDetails(patchID).call();
        console.log(data);
        document.getElementById("details").innerHTML=data;
    }
    const connectMetamask=async()=>{
        try{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({method:"eth_requestAccounts"});
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                console.log(accounts[0]);
               // window.alert("Metamask Connected");
                
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
    useEffect(()=>{
        connectMetamask();connectContract();
    },[]);
    return(
        <>
        <div className="row">
            <h4 className="fw-bold">Enter Patch Details</h4>
            <form onSubmit={e=>getDetails(e)}>
            <input className="form-control" placeholder="Enter Patch ID" onChange={e=>setPatch(e.target.value)}/>
            <button class="btn btn-dark">Submit</button>
            </form>
            <h3 className="fw-bold">List of Bugs and Features</h3>
            <p id="details">
                
            </p>
        </div>
        </>
    );
}