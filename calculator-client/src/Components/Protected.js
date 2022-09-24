
import { Navigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
// import Error404 from "../404 Error/Error404";

const Protected = ({children})=> {
    const cookies = new Cookies()
    let token = cookies.get('jwt')
    if(token === undefined){
        token = ""
    }

    return (
        <>
       {token.length ? children: <Navigate to="/entrypoint" /> }

        </>
    )
}
export default Protected;