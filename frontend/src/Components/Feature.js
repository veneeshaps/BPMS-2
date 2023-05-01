import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default function Feature(){
    const [modal,openModal] = useState(false);
    const [features,setFeatures] = useState(null);
    const [newFeature,setFeatureDetails] = useState({
        name:"",
        status:"Not Assigned",
        description:""
    })
    const getFeatures=async()=>{
        const {data} = await axios.get("http://localhost:3001/features");
        if(data.status==="No Features Found"){
            console.log("No Features were Found");
        }else{
            if(data.features!=null){
                setFeatures(data.features);
            }
        }
    }
    const AddFeature=async(event)=>{
        event.preventDefault();
        const {data} = await axios.post("http://localhost:3001/newfeature",{...newFeature});
        if(data.status ==="Feature Added"){
            getFeatures();
            openModal(false);
        }
    }
    useEffect(()=>{
        getFeatures();
    },[])
    return(
        <>
        <div className="container-fluid">
            <h3 className="fw-bold text-center">List of Features</h3>
            <table className="table text-center">
                {features?
                <>
                <th>S.No.</th>
                <th>Bug</th>
                <th>Status</th>
                <th>Description</th>
                </>
            :<></>
                }
                    {
                        features?
                        features.map((row,index)=>{
                            return(<tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.name}</td>
                                <td>{row.status}</td>
                                <td>{row.description}</td>
                            </tr>);
                        }):<>No Features were Found.</>
                    }
            </table>
        </div>
        <center>
            <button className="btn btn-primary" onClick={()=>openModal(true)}>Add Feature</button>
        </center>
        <Modal isOpen={modal} onRequestClose={()=>openModal(false)} contentLabel="New Bug" style={{content:{width:"50%",height:"60%",margin:"auto"}}}>
            <form onSubmit={(e)=>AddFeature(e)}>
                <label className="fs-4 fw-bold mb-3">Enter Feature Details:</label>
                <br/>
                <label className="fw-light form-label">Feature Name:</label>
                <input className="form-control" type="text" onChange={(e)=>setFeatureDetails({...newFeature,name:e.target.value})}/>
                <label className="fw-light form-label">Description:</label>
                <textarea className="form-control" style={{height:"20vh"}} onChange={(e)=>setFeatureDetails({...newFeature,description:e.target.value})}></textarea>
                <div className="m-3 d-flex justify-content-end">
                    <button className="btn btn-dark" type="submit">Add Feature</button>
                </div>
            </form>
        </Modal>
        </>
    );
}