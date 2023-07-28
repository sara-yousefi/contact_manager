import { Link ,useNavigate,useParams } from "react-router-dom";
import { useContext, useEffect} from "react";
import {getContact , updateContact} from "../../services/contactService"
import Spinner from "../Spinner";
import {CURRENTLINE,PURPLE,ORANGE,COMMENT} from "../../helpers/colors";
import { contactContext } from "../../context/contactContext";
import { Formik , Form ,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";
import { toast } from 'react-toastify';

const EditContact=()=>{

    const {contactId}=useParams();
    const navigate = useNavigate();
    const [contact,setContact]=useImmer({});
    const {loading,setLoading,groups,setContacts,setFilteredContacts}=useContext(contactContext);
    useEffect(()=>{
        const fetchData=async ()=>{
            try{
                setLoading(true);
                const {data : contactData}=await getContact(contactId);
                setLoading(false);
                setContact(contactData)
            }catch(err){
                console.log(err.message)
                setLoading(false);
            }
            
        }
        fetchData();
    },[])

    
    const submitForm=async(event)=>{
        //event.preventDefault();
        try {
            setLoading(true);
            const { data ,status} = await updateContact(event, contactId);
            
            if (status===200) {
                setLoading(false);
                toast.success("The contact was edited")
                setContacts(draft=>{
                    const contactIndex=draft.findIndex(
                        (c)=>c.id===parseInt(contactId)
                    )
                    draft[contactIndex]={...data};
                });
                setFilteredContacts(draft=>{
                    const contactIndex=draft.findIndex(
                        (c)=>c.id===parseInt(contactId)
                    )
                    draft[contactIndex]={...data};
                });

                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        
    }
    
    return(
        <>
        {loading ? <Spinner/> :
            <>
            <div className="row my-2">
                <div className="col text-center">
                <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    Edit audience
                </p>
                </div>
            </div>
            <hr style={{ backgroundColor: ORANGE }} />
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
                                <Formik 
                                    initialValues={{
                                        fullname: contact.fullname,
                                        photo: contact.photo,
                                        mobile: contact.mobile,
                                        email: contact.email,
                                        job: contact.job,
                                        group: contact.group
                                    }}
                                    validationSchema={contactSchema}
                                    onSubmit={(values) => {
                                        submitForm(values);
                                    }}
                                >
                                    <Form >
                                        <div className="form-group my-2">
                                            <Field type="text" name="fullname" className="form-control"  placeholder="ّFullname" />
                                            <ErrorMessage name="fullname" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <div className="form-group my-2">
                                            <Field type="text" name="photo" className="form-control"  placeholder="Image URL" />
                                            <ErrorMessage name="photo" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <div className="form-group my-2">
                                            <Field type="number" name="mobile" className="form-control"  placeholder="Mobile number"/>
                                            <ErrorMessage name="mobile" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <div className="form-group my-2">
                                            <Field type="email" name="email" className="form-control"  placeholder="Email addres" />
                                            <ErrorMessage name="email" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <div className="form-group my-2">
                                            <Field type="text" name="job" className="form-control"  placeholder="Job" />
                                            <ErrorMessage name="job" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <div className="form-group my-2">
                                            <Field name="group" className="form-control" as="select" >
                                                <option value="">Select group</option>
                                                {groups.length>0 && groups.map(group=>(
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="group" render={(msg) => (<div className="text-danger">{msg}</div>)}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2 mx-2" style={{ backgroundColor: PURPLE }}>Edit</button>
                                        <Link to={"/contacts"} className="btn btn-primary mb-2 mx-2" style={{ backgroundColor: COMMENT }}>Cancel</Link>
                                    </Form>
                                </Formik>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>
        }
            
        </>
    )
}
export default EditContact;