import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import SezioneBoxed from './SezioneBoxed'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Form, List, Label, Icon, Checkbox, Menu, Modal, Dropdown} from 'semantic-ui-react'
import ComponentePannello from './ComponentePannello';

import { useSnackbar } from 'notistack';

const GestioneProfilo = () => {

    const { register, handleSubmit, setValue, getValues} = useForm();
    const { register:registerDomicilio, handleSubmit:handleSubmitDomicilio, setValue:setValueDomicilio, getValues:getValuesDomicilio} = useForm();

    const { enqueueSnackbar } = useSnackbar();

    const [saving, setSaving] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openModaleDomicilio, setOpenModaleDomicilio] = useState(false);
    const [openModaleCancellaDomicilio, setOpenModaleCancellaDomicilio] = useState(false);

    const [fasciaDomicilioDaCancellare, setFasciaDomicilioDaCancellare] = useState('');

    const [infoNegozio, setInfoNegozio] = useState({});
    const [nome, setNome] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [orariConsegna, setOrariConsegna] = useState('');
    const [zoneConsegna, setZoneConsegna] = useState('');
    const [asporto, setAsporto] = useState(false);
    const [visibile, setVisibile] = useState(false);
    const [fasceDomicilio, setFasceDomicilio] = useState([]);
    const [fasceAsporto, setFasceAsporto] = useState([]);
    const [giorniSelezionatiDomicilio, setGiorniSelezionatiDomicilio] = useState([]);

    const arrayGiorni = [{key: 1, text: "Lunedì", value: 1}, {key: 2, text: "Martedì", value: 2}, {key: 3, text: "Mercoledì", value: 3}, {key: 4, text: "Giovedì", value: 4}, {key: 5, text: "Venerdì", value: 5}, {key: 6, text: "Sabato", value: 6}, {key: 7, text: "Domenica", value: 7}];

    const handleChangeGiorni= (e, {value} ) => {
        
        setGiorniSelezionatiDomicilio(value);
        setValueDomicilio("giorni", JSON.stringify(value));

    }

    let history = useHistory();

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

        window.scrollTo(0,0);

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
            setValue('id_negozio', JSON.parse(localStorage.getItem('infoUtente')).id_negozio );

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

    const eliminaFasciaDomicilio = (id_fascia_domicilio) => {

        let formData = new FormData();
        formData.append('id_fascia_domicilio', id_fascia_domicilio);
        
        //per usare formData non devo utilizzare Header nè il json stringify sul body
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch('https://ordinasicuro.it/670914_920408/lib/api/elimina_fascia_domicilio/', requestOptions)
            .then(response => response.text())
            .then(dati => {
                console.log(dati);
                if( dati === 'ok'){
                    let message = "Fascia Domicilio eliminata."
                    enqueueSnackbar(message, { 
                        autoHideDuration: 2000,
                        variant: 'success',
                    });

                    //Faccio il fetch delle info profil oper aggiornare la visualizzazione delle fasce domicilio
                    fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/get_profilo/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio +'/' )
                    .then(response => response.json())
                    .then(json => {
                        setFasceDomicilio(json.get_fasce_domicilio);
                    })

                    setOpenModaleCancellaDomicilio(false);

                }else{
                    let message = "Errore nell'eliminazione della fascia. Riprovare più tardi"
                    enqueueSnackbar(message, { 
                        autoHideDuration: 2000,
                        variant: 'error',
                    });
                }
                
            });

    }

    const displayFasceDomicilio = fasceDomicilio.map( 
        fascia => (
            <Fragment>

                <List.Item as='li'>
                    {fascia.inizio.substring(0,5)} - {fascia.fine.substring(0,5)} / {fascia['1']==='1' && (<>Lunedì - </>)} {fascia['2']==='1' && (<>Martedì - </>)} {fascia['3']==='1' && (<>Mercoledì - </>)} {fascia['4']==='1' && (<>Giovedì - </>)} {fascia['5']==='1' && (<>Venerdì - </>)} {fascia['6']==='1' && (<>Sabato - </>)} {fascia['7']==='1' && (<>Domenica</>)}  <Button negative type="button" icon="trash" size="mini" style={{marginLeft: "10px"}} onClick={()=>{setFasciaDomicilioDaCancellare(fascia.id); setOpenModaleCancellaDomicilio(true);}}/>
                </List.Item>

            </Fragment>
            
        )
        
    )
        

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

    const onSubmitDomicilio = data => {
        console.log(data);
        console.log(data.giorni);

        //devo aggiungere il conrtollo undefined per data.giorni perchè non viene aggiunto in automatico il valore giorni a data dal form, trattandosi di una select di semantic UI
        if( (data.giorni !=='' && data.giorni!==undefined) && data.inizio_domicilio !=='' && data.fine_domicilio !==''){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(data)
            };
            fetch('https://ordinasicuro.it/670914_920408/lib/api/crea_fascia_domicilio/', requestOptions)
                .then(response => response.text())
                .then(dati => {
                    console.log(dati);
                    if( dati === 'ok'){

                        let message = "Nuova fascia aggiunta!"
                        enqueueSnackbar(message, { 
                            autoHideDuration: 2000,
                            variant: 'success',
                        });

                        //Faccio il fetch delle info profil oper aggiornare la visualizzazione delle fasce domicilio
                        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/get_profilo/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio +'/' )
                        .then(response => response.json())
                        .then(json => {
                            setFasceDomicilio(json.get_fasce_domicilio);
                        })

                        //alla fine chiudo il modale dell'aggiunta Fascia Domicilio
                        setOpenModaleDomicilio(false);

                    }else{
                        let message = "Errore nell'aggiunta della fascia. Riprovare più tardi"
                        enqueueSnackbar(message, { 
                            autoHideDuration: 2000,
                            variant: 'error',
                        });
                    }

                });

        }
        else{

            let message = "Attenzione! Aggiungere tutte le info richieste!"
            enqueueSnackbar(message, { 
                autoHideDuration: 2000,
                variant: 'error',
            });

        }        

        

        
    }

    return (
        <Fragment>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Si è verificato un errore nel salvataggio del tuo prodotto.
                </Alert>
            </Snackbar>

            <div className="w-100 flex flex-row items-start justify-center mt6">

                <div className="w-20 dn flex-l  justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <Menu vertical>
                        <Menu.Item active><b className="f3">Azioni Rapide</b></Menu.Item>
                        {/* {stampaSubmenuCategorieDesktop(categorieArticoli)} */}
                        <Menu.Item as={Link}
                                    key={'pannello-controllo'}
                                    to={'/pannello-controllo'}  
                                    name= 'Pannello Controllo'
                                >
                                    Home <Icon name='home' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'aggiungi-prodotto'}
                                    to={'/aggiungi-articolo'}  
                                    name= 'Aggiungi Articolo'
                                >
                                    Aggiungi Prodotto <Icon name='plus' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-ordini'}
                                    to={'/gestione-ordini'}  
                                    name= 'Gestione Ordini'
                                >
                                    Gestione Ordini <Icon name='paper plane' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-categorie'}
                                    to={'/gestione-categorie'}  
                                    name= 'Gestione Categorie'
                                >
                                    Gestione Categorie <Icon name='list' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-componenti'}
                                    to={'/gestione-componenti'}  
                                    name= 'Gestione Componenti'
                                >
                                    Gestione Componenti <Icon name='chart pie' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-profilo'}
                                    to={'/gestione-profilo'}  
                                    name= 'Gestione Profilo'
                                >
                                    Gestione Profilo <Icon name='user' />
                        </Menu.Item>  
                    </Menu>
                </div>
                <div className="w-100 w-80-l">

                <SezioneBoxed>
                        <div className="w-100 mb5">
                            <Link to='/pannello-controllo/'>
                                <Button icon labelPosition='left'>
                                    <Icon name='arrow left' />
                                    Torna al Pannello di Controllo
                                </Button>
                            </Link>

                            <h2 >Il tuo profilo - {nome}</h2>
                            <p>In questa pagina puoi modificare le informazioni principali del tuo negozio. <br/> Una volta effettuate le modifiche premi il bottone "Salva" in fondo alla pagina per non perdere le modifiche effettuate!</p>

                            <Form onSubmit={handleSubmit(onSubmit)} name="formModificaProfilo" id="formModificaProfilo" enctype='multipart/form-data'>
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
                                    <label><h3>Fasce orarie consegna a domicilio:</h3></label>
                                    <List as='ul'>
                                        {displayFasceDomicilio}
                                    </List>

                                    <Modal
                                        onClose={() => setOpenModaleCancellaDomicilio(false)}
                                        onOpen={() => setOpenModaleCancellaDomicilio(true)}
                                        open={openModaleCancellaDomicilio}
                                        >
                                        <Modal.Header>Elimina fascia oraria</Modal.Header>
                                        <Modal.Content>
                                            <p>Vuoi davvero eliminare questa fascia oraria per la consegna a domicilio?</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='black' onClick={() => setOpenModaleCancellaDomicilio(false)}>
                                            Annulla
                                            </Button>
                                            <Button
                                            content="Elimina questa fascia"
                                            labelPosition='right'
                                            icon='checkmark'
                                            onClick={() => eliminaFasciaDomicilio(fasciaDomicilioDaCancellare)}
                                            negative
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                    
                                    <Modal
                                        onClose={() => setOpenModaleDomicilio(false)}
                                        onOpen={() => setOpenModaleDomicilio(true)}
                                        open={openModaleDomicilio}
                                        trigger={<Button primary type="button">Inserisci una nuova fascia per la consegna a domicilio</Button>}
                                    >
                                        <Modal.Header>Nuova fascia per consegna a domicilio</Modal.Header>
                                        <Modal.Content>
                                            <Form onSubmit={handleSubmitDomicilio(onSubmitDomicilio)} name="formFasciaDomicilio" id="formFasciaDomicilio" enctype='multipart/form-data'>
                                                <input type="hidden" ref={registerDomicilio} name="id_negozio" id="id_negozio" value={JSON.parse(localStorage.getItem('infoUtente')).id_negozio}/>
                                                <Form.Field>
                                                    <label><h3>Ora di inizio:</h3></label>
                                                    <input type="time" name="inizio_domicilio" id="inizio_domicilio" ref={registerDomicilio} step="1800"></input>
                                                    <br />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label><h3>Ora di fine:</h3></label>
                                                    <input type="time" name="fine_domicilio" ref={registerDomicilio}></input>
                                                    <br />
                                                </Form.Field>
                                                <Form.Field>
                                                <label><h3>In quali giorni è valida questa fascia oraria?</h3></label>
                                                </Form.Field>
                                                <Dropdown ref={registerDomicilio} fluid multiple selection options={arrayGiorni} value={giorniSelezionatiDomicilio} onChange={handleChangeGiorni} />
                                            </Form>
                                            
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='black' onClick={() => setOpenModaleDomicilio(false)}>
                                            Annulla
                                            </Button>
                                            <Button
                                            content="Aggiungi fascia"
                                            labelPosition='right'
                                            icon='checkmark'
                                            //Strana soluzione per avere funzioni multiple nell'onclick con handleSubmit
                                            // onClick={handleSubmitDomicilio( data =>{onSubmitDomicilio(data); setOpenModaleDomicilio(false) }) } 
                                            onClick={handleSubmitDomicilio(onSubmitDomicilio)}
                                            positive
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                    <br />
                                    <Label pointing>Inserisci qui le fasce orarie in cui sei disposto a consegnare a domicilio</Label>
                                </Form.Field>

                                <Form.Field>
                                    <Button loading={saving} type="submit" color='green'>Salva</Button>
                                </Form.Field>

                                </Form>
                        </div>

                    </SezioneBoxed>

                </div>

            </div>
            
            
            
        </Fragment>
    )
}

export default GestioneProfilo
