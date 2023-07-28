import { Link } from "react-router-dom";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { Formik ,Form, Field ,ErrorMessage} from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";

const AddContact=()=>{
    const {groups,createContact}=useContext(contactContext);
    return(
        <>
            <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    Create a new contact
                  </p>
                </div>
            </div>
            <hr style={{ backgroundColor: GREEN }} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-2 col-sm-12 col-xs-12"></div>
                    <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12">
                        <Formik 
                            initialValues={{
                                fullname: "",
                                photo: "",
                                mobile: "",
                                email: "",
                                job: "",
                                group: ""
                            }}
                            validationSchema={contactSchema}
                            onSubmit={(values) => {
                                createContact(values);
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
                                    <Field type="number" name="mobile" className="form-control"  placeholder="Mobile number" />
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
                                <button type="submit" className="btn btn-primary mb-2 mx-2" style={{ backgroundColor: PURPLE }}>Save</button>
                                <Link to={"/contacts"} className="btn btn-primary mb-2 mx-2" style={{ backgroundColor: COMMENT }}>Cancel</Link>
                            </Form>
                        </Formik>
                    </div>
                    <div className="col-lg-4 col-md-2 col-sm-12 col-xs-12"></div>
                    
                </div>
            </div>
        </>
    )
}
export default AddContact;