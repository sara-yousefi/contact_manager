import {PURPLE} from "../../helpers/colors";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";


const SearchContact=()=>{
    const {contactSearch}=useContext(contactContext);
    return(
        <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
                <div className="input-group mx-2 w-75"  dir="ltr">
                    <span id="basic-addon1" className="input-group-text" style={{backgroundColor:PURPLE}}>
                        <i className="fa fa-search"></i>
                    </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Contact Search"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        dir="rtl"
                        onChange={(event) => contactSearch(event.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
export default SearchContact;