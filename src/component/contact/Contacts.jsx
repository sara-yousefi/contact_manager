import {Fragment} from "react";
import Contact from "./Contact";
import {PINK,CURRENTLINE,ORANGE} from "../../helpers/colors";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";

const Contacts=()=>{
    const {filteredContacts,loading,deleteContact}=useContext(contactContext);
    return(
        <Fragment>
            <section className="container" dir="ltr">
                <div className="graid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to="/contacts/add" className="btn mx-2" style={{backgroundColor:PINK}}>
                                    <span>Create a new contact</span>
                                    <span className="fa fa-plus-circle mx-2"></span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? 
                    <Spinner/> 
                :
                    <section className="container">
                        <div className="row">
                            {
                                filteredContacts.length > 0 ? filteredContacts.map((c)=><Contact key={c.id} contact={c} deleteContact={()=>deleteContact(c.id,c.fullname)}/>)
                                :
                                (
                                    <div className="text-center py-5" style={{backgrounColor:CURRENTLINE}}>
                                        <p className="h3" style={{color:ORANGE}}>Contact not found</p>
                                        <img src={require("../../assets/sad-face-emogi.png")} alt="Not found" className="w-25" style={{width:'200px'}}/>
                                    </div>
                                )
                            }
                            
                        </div>
                    </section>
            }
           
        </Fragment>
        
    )
}
export default Contacts;