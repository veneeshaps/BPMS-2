import {useState,useEffect} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default function Bug(){
    const [modal,openModal] = useState(false);
    const [bugs,setBugs] = useState(null);
    const [newBug,setBugDetails] = useState({
        name:"",
        status:"Not Assigned",
        description:""
    })
    const getBugs=async()=>{
        const {data} = await axios.get("http://localhost:3001/bugs");
        if(data.status==="No Bugs Found"){
            console.log("No Bugs were Found");
        }else{
            if(data.bugs!=null){
                setBugs(data.bugs);
            }
        }
    }
    const AddBug=async(event)=>{
        event.preventDefault();
        const {data} = await axios.post("http://localhost:3001/newbug",{...newBug});
        if(data.status ==="Bug Added"){
            getBugs();
            openModal(false);
        }
    }
    useEffect(()=>{
        getBugs();
    },[])
    return(
        <>
        <div className="container-fluid">
            <h3 className="fw-bold text-center">List of Bugs</h3>
            <table className="table text-center">
                {bugs?
                <>
                <th>S.No.</th>
                <th>Bug</th>
                <th>Status</th>
                <th>Description</th>
                </>
            :<></>
                }
                    {
                        bugs?
                        bugs.map((row,index)=>{
                            return(<tr key={index}>
                                <td>{index+1}</td>
                                <td>{row.name}</td>
                                <td>{row.status}</td>
                                <td>{row.description}</td>
                            </tr>);
                        }):<>No Bugs were Found.</>
                    }
            </table>
        </div>
        <center>
            <button className="btn btn-primary" onClick={()=>openModal(true)}>Report Bug</button>
        </center>
        <Modal isOpen={modal} onRequestClose={()=>openModal(false)} contentLabel="New Bug" style={{content:{width:"50%",height:"60%",margin:"auto"}}}>
            <form onSubmit={(e)=>AddBug(e)}>
                <label className="fs-4 fw-bold mb-3">Enter Bug Details:</label>
                <br/>
                <label className="fw-light form-label">Bug Name:</label>
                <input className="form-control" type="text" onChange={(e)=>setBugDetails({...newBug,name:e.target.value})}/>
                <label className="fw-light form-label">Description:</label>
                <textarea className="form-control" style={{height:"20vh"}} onChange={(e)=>setBugDetails({...newBug,description:e.target.value})}></textarea>
                <div className="m-3 d-flex justify-content-end">
                    <button className="btn btn-dark" type="submit">Report Bug</button>
                </div>
            </form>
        </Modal>
        </>
    );
}