import React, { useState, useEffect } from 'react'
import './Main.css'
import axios from 'axios'
import { Cookies } from 'react-cookie';

export default function Main() {
    const [Expression, setExpression] = useState("")
    const [Api, setApi] = useState("")
    const [History, setHistory] = useState("")
    const [updateHistory,setUpdateHistory ] = useState(true)
    const cookies = new Cookies()
    const token = cookies.get('jwt')

    useEffect(() => {
        const getHistory=()=>{
            axios({
                method: 'GET',
                url: `https://master-o-calculator-servr.herokuapp.com/history`,
                headers: {
                    Accept : "application/json",
                    authorization: token,
                    "Content-Type": "application/json"
                  }
            }).then((res)=>{
                if(res.data.length>=5){
                    res.data = res.data.splice(res.data.length-5)
                    setHistory(res.data )
                }else{
                    setHistory(res.data)
                }
                
                console.log(res.data);
            }).catch((e)=>{
                console.log(e);
            })
        }

        if(updateHistory){
            getHistory()
            setUpdateHistory(false)
        }
    
     
    }, [token, updateHistory])
    

    const handleClick =(e)=>{
        if(Expression.includes("=")){
            window.alert("Press C to clear first!")
            setExpression("");
            return
        }
        let value = e.target.value
        if(Expression.length===0){
            if(value==="/" || value==="*" || value==="-" || value==="+"){
                return
            }else{
                setExpression(Expression.concat(value))
            }
            
        }else{
            if(value==="/" || value==="*" || value==="-" || value==="+"){
                if(value==="/")setApi('divide');
                if(value==="*")setApi('multiply');
                if(value==="-")setApi('subtract');
                if(value==="+")setApi('add');

            }
            setExpression(Expression.concat(value))
        }
    }

    const clear =()=>{
        setExpression("")
    }
    
    const handleAnswer = ()=>{
        if(Expression.includes("/") || Expression.includes("+") || Expression.includes("-") || Expression.includes("*")){
            axios({
                method: 'post',
                url: `https://master-o-calculator-servr.herokuapp.com/${Api}`,
                headers: {
                    Accept : "application/json",
                    authorization: token,
                    "Content-Type": "application/json"
                  },
                data: {
                    "email" : "",
                    "expressions" : [
                        {"recentActivity": Expression}
                    ]
                }
            }).then((response)=>{
                setExpression(response.data);
                setUpdateHistory(true)
            }).catch((error)=>{
                console.log(error);
            });
        }else{
            console.log("Returned")
            return
        }
        
    }


  return (
    <>
    <div id='container'>
        <div className='calculator-div'>
            <h1 id='heading'>Calculator</h1>
            <div id='main-calculator'>
                <div id='preview'><h1>{Expression}</h1></div>
                <div id='row-2'><button id='row-2_btn-1' className='all-btn color-purple' onClick={clear}>C</button> <button id='row-2_btn-2' className='all-btn color-purple' value='/' onClick={handleClick}>/</button></div>
                <div><button className='all-btn' value='7' onClick={handleClick}>7</button> <button className='all-btn' value='8' onClick={handleClick}>8</button><button className='all-btn' value='9' onClick={handleClick}>9</button> <button className='all-btn color-purple' value='*' onClick={handleClick}>*</button></div>
                <div><button className='all-btn' value='4' onClick={handleClick}>4</button> <button className='all-btn' value='5' onClick={handleClick}>5</button><button className='all-btn' value='6' onClick={handleClick}>6</button> <button className='all-btn color-purple' value='-' onClick={handleClick}>-</button></div>
                <div><button className='all-btn' value='1' onClick={handleClick}>1</button> <button className='all-btn' value='2' onClick={handleClick}>2</button><button className='all-btn' value='3' onClick={handleClick}>3</button> <button className='all-btn color-purple' value='+' onClick={handleClick}>+</button></div>
                <div><button id='btn-0' className='all-btn' value='0' onClick={handleClick}>0</button> <button id='equalto-btn' onClick={handleAnswer} className='all-btn'>=</button></div>
            </div>
        </div>

        <div className='history-div'>
            <h1 id='history-heading'>History</h1>
            <div id='history-main'>
                <ul>
                    {[...History].map((ele, i)=>{
                        return(
                            <li key={i}>{ele.recentActivity}</li>
                        )
                    })}
                    
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}
