import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const Logout = ({setLoggato}) => {
    
    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') !== null){
          
            localStorage.removeItem('infoUtente');
            setLoggato(false);
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