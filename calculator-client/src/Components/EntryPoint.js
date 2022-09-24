import React from 'react'
import "./EntryPoint.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export default function EntryPoint() {
    // const [Email, setEmail] = useState("")
    // eslint-disable-next-line 
    const [cookies, setCookie] = useCookies([]);
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios({
            method: 'post',
            url: `https://master-o-calculator-servr.herokuapp.com/user`,
            data: {
                "email" : e.target.elements.email.value
            }
        }).then((res)=>{
            if(res.status===200){
                let token = res.data.authToken
                setCookie("jwt", token,  { path: '/' , expires:new Date(Date.now()+3.6e+6)})
                navigate("/")
            }
            // console.log(res.data.authToken);

        }).catch((e)=>{
            console.log(e);
        })
        // console.log(e.target.elements.email.value);
    }
  return (
    <div id='e-container'>
       <form method='POST' onSubmit={handleSubmit}>
       <div id='inner-div'>
            <input required={true} name="email" type="Email" placeholder='Please Enter Your Email Id!'/>    
        </div>
        <div id='btn-div'>
            <button type="Submit" id='btn'>Enter</button>
        </div>
       </form>
    </div>
  )
}
