import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";

import SezioneBoxed from './SezioneBoxed'

import { Icon, Input, Button, Form } from 'semantic-ui-react'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { HashLink as Link } from 'react-router-hash-link';

const Login = ({}) => {

    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, setValue, getValues} = useForm();

    useEffect(() => {

      if(localStorage.getItem('infoUtente') !== null){
        
        history.push("/pannello-controllo/");

      }

    }, [])

    let history = useHistory();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

      const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          '& > * + *': {
            marginTop: theme.spacing(2),
          },
        },
      }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const onSubmit = data => {
        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(data)
        };

        fetch('https://ordinasicuro.it/api/login', requestOptions)
            .then(response => response.json())
            .then(dati => {
                if(dati.get_utente==null){
                    setOpen(true);
                    //alert("Errore!")
                }
                else{
                    console.log(dati.get_utente);
                    localStorage.setItem('infoUtente', JSON.stringify(dati.get_utente));
                    history.push("/pannello-controllo/");

                }
                // if(dati.presenza_errori===false){
                //     //alert('Successo!');
                //     //history.push("/ordine-inviato/");
                // }
                // else{
                //     //avviaModale('Attenzione','Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                //     alert('Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                // }

                
            });

    
            
    
        
    }

    return (

        <SezioneBoxed>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Credenziali errate!
        </Alert>
      </Snackbar>
            

            <Form onSubmit={handleSubmit(onSubmit)} nome="formLogin" id="formLogin">

                <div className="mt6 flex flex-column justify-center">

                    <h2>Effettua ora il login</h2>

                    <Input iconPosition='left' placeholder='email'>
                        <Icon name='user' />
                        <input ref={register} name="email" id="email" />
                    </Input>
                    
                    <Input iconPosition='left' placeholder='password' className="mt3">
                        <Icon name='key' />
                        <input ref={register} type="password" name="password" id="password" />
                    </Input>
                    <br />
                    <Button class="ui button">Login</Button>

                </div>
            </Form>

        </SezioneBoxed>
                
    )
}

export default Login