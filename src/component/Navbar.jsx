import SearchContact from "./contact/SearchContact";
import { PURPLE , BACKGROUND } from "../helpers/colors";
import {useLocation} from "react-router-dom";

const Navbar=()=>{
    const location=useLocation();
    return(
        <nav className="navbar navbar-expand-sm navbar-dark shadow-lg" style={{backgroundColor:BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fa fa-id-badge" style={{color:PURPLE}} ></i>{" "}
                            
                            <span style={{color:PURPLE}}>Contact</span>{" "}management web application
                        </div>
                    </div>
                    {location.pathname==="/contacts" ? (
                        <div className="col">
                            <SearchContact />
                        </div>
                    ) : null}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;