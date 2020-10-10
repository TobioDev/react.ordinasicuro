import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from "react-hook-form"

import SezioneBoxed from './SezioneBoxed'

import { Icon, Input } from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';
import { Button } from 'semantic-ui-react'


const Login = ({}) => {

    return (

        <SezioneBoxed>
        <div className="mt6 flex flex-column justify-center">

            <h2>Effettua ora il login</h2>

            <Input iconPosition='left' placeholder='username'>
                <Icon name='user' />
                <input />
            </Input>
            
            <Input iconPosition='left' placeholder='password' className="mt3">
                <Icon name='key' />
                <input type="password" />
            </Input>
            <br />
            <button class="ui button">Login</button>


        </div>
        </SezioneBoxed>
                
    )
}

export default Login