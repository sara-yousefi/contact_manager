import spinnerGif from "../assets/spinner.gif";
const Spinner=()=>{
    return(
        <>
            <img className="w-30 d-block m-auto" style={{width:'200px'}} src={spinnerGif} alt="please wait" />
        </>
    )
}
export default Spinner;