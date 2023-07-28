import { Link } from "react-router-dom";
import {CURRENTLINE,PURPLE,ORANGE,CYAN,RED} from "../../helpers/colors";
const Contact =({contact,deleteContact})=>{
    return(
        <div className="col-md-6">
            <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
                <div className="card-body">
                <div className="row align-items-center d-flex justify-content-around">
                    <div className="col-md-4 col-sm-4 col-xs-4 col-lg-4">
                        <img
                            src={contact.photo}
                            alt={contact.fullname}
                            style={{ border: `1px solid ${PURPLE}` ,width:'150px',height:'140px'}}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-dark">
                            Fullneme :{"  "}
                            <span className="fw-bold">
                                {contact.fullname}
                            </span>
                            </li>

                            <li className="list-group-item list-group-item-dark">
                            mobile :{"  "}
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
                        </ul>
                    </div>
                    <div className="col-md-2 col-sm-2 col-xs-2 col-lg-2 ">
                        <Link to={`/contacts/${contact.id}`}
                            className="btn my-1"
                            style={{ backgroundColor: ORANGE }}
                        >
                            <i className="fa fa-eye" />
                        </Link>

                        <Link to={`/contacts/edit/${contact.id}`}
                            className="btn my-1"
                            style={{ backgroundColor: CYAN }}
                        >
                            <i className="fa fa-edit" />
                        </Link>
                        <button
                            className="btn my-1"
                            style={{ backgroundColor: RED }}
                            onClick={deleteContact}
                        >
                            <i className="fa fa-trash" />
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Contact;