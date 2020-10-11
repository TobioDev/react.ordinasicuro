import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const Logout = ({}) => {
    
    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') !== null){
          
            localStorage.removeItem('infoUtente');
            history.push("/login/");
  
        }
        else{

            history.push("/login/");

        }
  
      }, [])

    return (
    
        <p></p>

    )
}

export default Logout