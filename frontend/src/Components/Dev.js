import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ABI, contractAddress } from '../contract';
import Web3 from 'web3';
// import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js';
const UploadButton = ({ onClick }) => {
    const fileInputRef = useRef(null);

    // const handleUpload = () => {
    //     const files = fileInputRef.current.files;
    //     onClick(files);
    // };

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
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [patches, setPatches] = useState(null);
    const [patchDetails, setPatchDetails] = useState([]);
    const [file, setFile] = useState(null);
    // const [data,setData] = useState([]);
    // const client=useRef(null);
    const connectContract = async () => {
        const web3 = new Web3(window.ethereum);
        const myContract = new web3.eth.Contract(ABI, contractAddress);
        setContract(myContract);
        console.log("Contract Connected");
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
    const FileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            const fileBuffer = reader.result
            const fileBytes = new Uint8Array(fileBuffer);
            setFile(fileBytes);
        };
    };

    // const getPatches = async () => {
    //     const data = await contract.methods.patchDetails().call();
    //     setPatchDetails(data);
    //   };
      
    const getPatches = async () => {
        const data = await contract.methods.patchDetails().call();
        setPatches(data);
    }
    // const requestQA = async (e, patch) => {
    //     e.preventDefault();
    //     const versionInputId = patch[0];
    //     const version = document.getElementById(versionInputId).value;
    //     handleUpload(patch, version); // Pass the patch details and version to handleUpload
    //     await contract.methods
    //       .requestQA(patch[0], patch[1], patch[2], patch[3], version)
    //       .send({ from: account });
    //   };
    
    const requestQA = async (e) => {
        e.preventDefault();
        const version = document.getElementById(patches[e.target.value][0]).value;
        console.log(file);
        const transaction = await contract.methods.requestQA(patches[e.target.value][0], patches[e.target.value][1], patches[e.target.value][2], patches[e.target.value][3], version).send({ from: account });
        console.log(transaction);
        window.location.reload(false);
    }
    useEffect(() => {
        connectMetamask(); connectContract();
    //     console.log('> 📦 creating web3.storage client');
    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1RThjNTc4QzVCNjE2OWU2RDU0MzI5ZWI5NUU1Q2ZiRDE1OGUzOEMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODg0NjU3OTUwMTEsIm5hbWUiOiJrbWl0In0.4iWOlQMD9i6S7ymarg0UAuPU5J4MXRzDMlutrS46iO4';
    //     client.current = new Web3Storage({ token });
    // }, []);
    // getPatches();
    // const handleUpload = async (item, files) => {
    //     console.log('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID');
    //     const cid = await client.current.put(files, {
    //         onRootCidReady: (localCid) => {
    //             console.log(`> 🔑 locally calculated Content ID: ${localCid} `);
    //             console.log('> 📡 sending files to web3.storage ');
    //             const updatedData = data.map((d) => {
    //                 if (d === item) {
    //                     return { ...d, link: `https://dweb.link/ipfs/${localCid}` };
    //                 }
    //                 return d;
    //             });
    //             setData(updatedData);
    //         },
    //         onStoredChunk: (bytes) => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
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
                    <div className="collapse navbar-collapse" id="navbarToggler"></div>
                    <ul className="container-fluid justify-content-center navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link link" to="/dev/patch">Home</NavLink>
                        </li>
                    </ul>
                    <div className="nav-item ms-auto">
                        <span class="user-name fw-bold">
                            DEVELOPER
                        </span>
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
                                        <td><input className="form-control form-control-sm" id="formFileSm" type="file" onChange={e => FileChange(e)} /></td>
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
                                        <td><button className='btn-sm btn-dark' value={index} onClick={(e)=>requestQA(e)}>Upload</button></td>
                                    </tr>);
                                }) : <>No Patches were Found.</>
                        }
 
                        </tbody>
                </table>
            </div>
        </>
    );
}