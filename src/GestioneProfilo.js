import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import SezioneBoxed from './SezioneBoxed'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Checkbox} from 'semantic-ui-react'
import ComponentePannello from './ComponentePannello';


const GestioneProfilo = () => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [saving, setSaving] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [infoNegozio, setInfoNegozio] = useState({});
    const [nome, setNome] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [orariConsegna, setOrariConsegna] = useState('');
    const [zoneConsegna, setZoneConsegna] = useState('');
    const [asporto, setAsporto] = useState(false);
    const [visibile, setVisibile] = useState(false);
    const [fasceDomicilio, setFasceDomicilio] = useState({});
    const [fasceAsporto, setFasceAsporto] = useState({});

    setValue('id_negozio', JSON.parse(localStorage.getItem('infoUtente')).id_negozio );

    let history = useHistory();

    window.scrollTo(0,0);

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


    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/get_profilo/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio +'/' )
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setNome(json.get_negozio.nome.replace("\\\'", "\'"));
                setOrariConsegna(json.get_negozio.orari_consegna.replace("\\\'", "\'"));
                setZoneConsegna(json.get_negozio.zone_consegna.replace("\\\'", "\'"));
                setDescrizione(json.get_negozio.descrizione.replace("\\\'", "\'"));
                //variabile per visibilità negozio
                if(json.get_negozio.visibile === '0'){
                    setVisibile(false);
                }
                else if(json.get_negozio.visibile === '1'){
                    setVisibile(true);
                }
                setValue('visibile', json.get_negozio.visibile);
                //variabile per modalità asporto
                if(json.get_negozio.asporto === '0'){
                    setAsporto(false);
                }
                else if(json.get_negozio.asporto === '1'){
                    setAsporto(true);
                }
                setValue('asporto', json.get_negozio.asporto);
                setFasceAsporto(json.get_fasce_asporto);
                setFasceDomicilio(json.get_fasce_domicilio);

                // setVisibilitaLoader(false);
                console.log(json);
                    }
            );
        }

    }, [])

    console.log('check', asporto);


    const handleVisibile = () => {

        if(visibile===false){
            setValue('visibile', '1');
        }
        else if(visibile===true){
            setValue('visibile', '0');
        }
        setVisibile(!visibile);

    }

    const handleAsporto = () => {

        if(asporto===false){
            setValue('asporto', '1');
        }
        else if(asporto===true){
            setValue('asporto', '0');
        }
        setAsporto(!asporto);

    }
        

    const onSubmit = data => {
        console.log(data);
        setSaving(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(data)
        };
        fetch('https://ordinasicuro.it/670914_920408/lib/api/aggiorna_profilo/', requestOptions)
            .then(response => response.text())
            .then(dati => {
                console.log(dati);
                if( dati === 'ok'){
                    history.goBack();
                }else{
                    setSaving(false);
                    setOpen(true);
                }
                
            });

        
    }

    return (
        <Fragment>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Si è verificato un errore nel salvataggio del tuo prodotto.
                </Alert>
            </Snackbar>

            <SezioneBoxed>
                <div className="w-100 mt6">
                    <Link to='/pannello-controllo/'>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow left' />
                            Torna al Pannello di Controllo
                        </Button>
                    </Link>

                    <h2 >Il tuo profilo - {nome}</h2>
                    <p>In questa pagina puoi modificare le informazioni principali del tuo negozio. <br/> Una volta effettuate le modifiche premi il bottone "Salva" in fondo alla pagina per non perdere le modifiche effettuate!</p>

                    <Form onSubmit={handleSubmit(onSubmit)} nome="formModificaProfilo" id="formModificaProfilo" enctype='multipart/form-data'>
                        <Form.Field>
                            <label><h3>Visibilità del tuo negozio:</h3></label>
                            <Checkbox ref={register} name="visibile" id="visibile" checked={visibile} onChange={handleVisibile} toggle className="mt2"/>
                            <br />
                            <Label pointing>Scegli se rendere il tuo negozio visibile a tutti o se nasconderlo momentaneamente</Label>
                        </Form.Field>
                        <Form.Field>
                            <label><h3>La tua descrizione:</h3></label>
                            <textarea required ref={register} name="descrizione" id="descrizione" placeholder='Descrizione del tuo negozio' defaultValue={descrizione} maxLength="900"/>
                            <br />
                            <Label pointing>Aggiungi qui la descrizione del tuo negozio (max 900 caratteri)</Label>
                        </Form.Field>
                        <Form.Field>
                            <label><h3>La tua zone di consegna:</h3></label>
                            <textarea required ref={register} name="zone_consegna" id="zone_consegna" placeholder='Le tue zone di consegna' defaultValue={zoneConsegna} maxLength="900"/>
                            <br />
                            <Label pointing>Aggiungi qui le zone dove effettui la consegna (max 900 caratteri)</Label>
                        </Form.Field>
                        <Form.Field>
                            <label><h3>Descrivi testualmente i tuoi orari di consegna:</h3></label>
                            <textarea required ref={register} name="orari_consegna" id="orari_consegna" placeholder='I tuoi orari di consegna' defaultValue={orariConsegna} maxLength="900"/>
                            <br />
                            <Label pointing>Aggiungi qui gli orari in cui effettui la consegna (max 900 caratteri)</Label>
                        </Form.Field>
                        <Form.Field>
                            <label><h3>Modalità Asporto:</h3></label>
                            <Checkbox ref={register} name="asporto" id="asporto" checked={asporto} onChange={handleAsporto} toggle className="mt2"/>
                            <br />
                            <Label pointing>Scegli se abilitare la funzione per permettere ai tuoi clienti di richiedere l'Asporto</Label>
                        </Form.Field>

                        <Form.Field>
                            <Button loading={saving} type="submit" color='green'>Salva</Button>
                        </Form.Field>

                        </Form>
                </div>

            </SezioneBoxed>
            
            
            
        </Fragment>
    )
}

export default GestioneProfilo
