import React, { useEffect, useState, Fragment } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import { id } from 'date-fns/esm/locale';

const EliminaComponente = (props) => {

    window.scrollTo(0,0);

    const { register, handleSubmit, setValue, getValues} = useForm();

    setValue('id_negozio', JSON.parse(localStorage.getItem('infoUtente')).id_negozio);

    const [open, setOpen] = React.useState(false);
    const [messaggioErrore, setMessaggioErrore] = React.useState('');
    const [saving, setSaving] = React.useState(false);

    const [idComponente, setIdComponente] = useState('');


    //Codice per snackbar ui-material ----------
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

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    //Fine codice per snackbar ui-material ---------------


    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
            localStorage.removeItem('infoUtente');
            history.push("/login/");
        }
        else{
            
        }
  
    }, [])

    const onSubmit = data => {
        console.log(data);
        setSaving(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(data)
        };
            fetch('https://ordinasicuro.it/api/elimina_componente_articolo_api/', requestOptions)
                .then(response => response.text())
                .then(dati => {
                    console.log(dati);
                    if(dati==="ok" ){

                        history.goBack();
                        
                    }
                    else{
                        
                        setSaving(false);
                        setOpen(true);
                        setMessaggioErrore('Si è verificato un errore nella rimozione di questo componente.');
                    }
                    
                });

        
    }


    return (
        <Fragment>
            <div className="mt6">
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {messaggioErrore}
                    </Alert>
                </Snackbar>

                <SezioneBoxed>
                    <div className="w-100">
                        <Link to='/gestione-componenti/'>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna alla Gestione dei Componenti
                            </Button>
                        </Link>
                        
                        <h2>Vuoi davvero eliminare questo componente?</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} nome="formEliminaArticolo" id="formEliminaArticolo" enctype='multipart/form-data'>
                            <input require ref={register} name="id_componente_articolo" id="id_articolo" value={props.match.params.id_componente_articolo} type="hidden" />
                            
                            <Button.Group>
                                <Button negative type="submit" loading={saving}>Elimina</Button>
                                <Button.Or text='o' />
                                <Button type="button" onClick={()=>history.push('/gestione-componenti')}>Annulla</Button>
                            </Button.Group>

                        </Form>
                    </div>

                </SezioneBoxed>
                
                
            </div>

        </Fragment>
        
    )
}

export default EliminaComponente
