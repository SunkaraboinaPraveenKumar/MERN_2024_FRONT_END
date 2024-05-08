import React, { useState } from 'react'
import Context from './Context.jsx';
const State = (props) => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [user,setUser]=useState("");
    const [id,setId]=useState("");
  return (
    <Context.Provider value={{isAuthenticated,setisAuthenticated,user,setUser,id,setId}}>
        {props.children}
    </Context.Provider>
  )
}

export default State