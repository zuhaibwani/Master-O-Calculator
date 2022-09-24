import React from 'react'
import Main from './Components/Main.js'
import EntryPoint from './Components/EntryPoint.js'
import Protected from './Components/Protected.js';
import {Routes,Route} from "react-router-dom";
export default function App() {
  return (
    <>
    <Routes>
      <Route path="/entrypoint" element={<EntryPoint/>}/>
      <Route path="/" element={<Protected ><Main/></Protected>}/>
    </Routes>
      
    </>
  )
}
