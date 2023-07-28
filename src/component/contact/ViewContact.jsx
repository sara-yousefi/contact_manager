import { useParams ,Link} from "react-router-dom";
import { useState ,useEffect,useContext} from 'react';
import Spinner from "../Spinner";
import {CURRENTLINE,PURPLE,ORANGE} from "../../helpers/colors";
import {getContact , getGroup} from "../../services/contactService"
import { contactContext } from "../../context/contactContext";

const ViewContact=()=>{
    const {loading,setLoading}=useContext(contactContext);
    const {contactId}=useParams();
    const [state,setState]=useState({
        contact:{},
        group:{}
    })
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                setLoading(true);
                const {data : contactData}= await getContact(contactId);
                const {data : groupData}=await getGroup(parseInt(contactData.group));
                setLoading(false);
                setState({
                    ...state,
                    contact:contactData,
                    group:groupData
                })
            }catch(err){
                console.log(err.message);
                setLoading(false);
            }
            
        }
        fetchData();
    },[])

    const{contact,group}=state;
    return(
        <>
            {loading ? (<Spinner/>) : 
            (
                <>
                <div className="row my-2">
                    <div className="col text-center">
                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                        Display audience
                    </p>
                    </div>
                </div>
                <hr style={{ backgroundColor: ORANGE }} />
                {Object.keys(contact).length> 0 && (
                <div className="col-md-10" style={{display:"inline-block"}}>
                    <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
                        <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4 col-sm-4">
                            <img
                                src={contact.photo}
                                alt={contact.fullname}
                                style={{ border: `1px solid ${PURPLE}` ,width:'250px',height:'240px'}}
                                className="img-fluid rounded"
                            />
                            </div>
                            <div className="col-md-8 col-sm-8">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                Fullname :{"  "}
                                <span className="fw-bold">
                                    {contact.fullname}
                                </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                Mobile number :{"  "}
                                <span className="fw-bold">
                                    {contact.mobile}
                                </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                Email addres :{"  "}
                                <span className="fw-bold">
                                    {contact.email}
                                </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                Job :{"  "}
                                <span className="fw-bold">
                                    {contact.job}
                                </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                Group :{"  "}
                                <span className="fw-bold">
                                    {group.name}
                                </span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    <Link to={"/contacts"} className="btn btn-primary mb-2 mx-2">Back</Link>
                                </li>

                            </ul>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
            )}
            </>
            )}
        </>
    )
}
export default ViewContact;