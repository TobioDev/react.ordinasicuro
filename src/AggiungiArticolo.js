import React, { useEffect, useState, Fragment } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import { useSnackbar } from 'notistack';

import { id } from 'date-fns/esm/locale';

const formDataImmagine = new FormData();

const AggiungiArticolo = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, setValue, getValues} = useForm();

    setValue('id_negozio', JSON.parse(localStorage.getItem('infoUtente')).id_negozio);
    setValue('componenti_aggiunti_articolo', '');

    const [open, setOpen] = React.useState(false);
    const [openModaleImmagine, setOpenModaleImmagine] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [flagImmagineModificata, setFlagImmagineModificata] = useState(false);

    const [nome, setNome] = useState(['']);
    const [idArticolo, setIdArticolo] = useState(['']);
    const [descrizione, setDescrizione] = useState(['']);
    const [idCategoriaArticolo, setIdCategoriaArticolo] = useState(['']);
    const [arrayOpzioniCategorie, setArrayOpzioniCategorie] = useState([[]]);
    const [arrayOpzioniComponentiArticoli, setArrayOpzioniComponentiArticoli] = useState([[]]);
    const [arrayOpzioniComponentiArticolo, setArrayOpzioniComponentiArticolo] = useState([[]]);
    const [numeroMaxComponenti, setNumeroMaxComponenti] = useState(['']);
    const [unitaMisura, setUnitaMisura] = useState(['']);
    const [prezzo, setPrezzo] = useState(['']);
    const [urlImmagine, setUrlImmagine] = useState(['']);
    const [tipologia, setTipologia] = useState(['']);
    const [unitaMisuraDisabilitato, setUnitaMisuraDisabilitato] = useState(false);

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

        //All'apertura della pagina torna in cima
        window.scrollTo(0,0);

        if(localStorage.getItem('infoUtente') === null){
            localStorage.removeItem('infoUtente');
            history.push("/login/");
        }
        else{
            //Richiedo categorie del negozio e componenti articoli del negozio
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/aggiungi_articolo/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio + '/' )
            .then(response => response.json())
            .then(json => {
                    //console.log(json);
                    setValue("nome_articolo", '');
                    setValue("descrizione_articolo", '');
                    setValue("numero_max_componenti_articolo", '');
                    setValue("unita_misura_articolo", '');
                    setValue("prezzo_articolo", '');
                    setTipologia('semplice');
                    setValue("tipologia_articolo", 'semplice');

                    let arrayTemporaneo = [];
                    json.get_categorie_negozio.map( categoria => arrayTemporaneo.push({key: categoria.id, text: categoria.nome, value: categoria.id}));
                    setArrayOpzioniCategorie(arrayTemporaneo);

                    arrayTemporaneo = [];
                        json.get_componenti_articoli.map( componente => arrayTemporaneo.push({key: componente.id, text: componente.nome, value: componente.id}));
                        setArrayOpzioniComponentiArticoli(arrayTemporaneo);
                
                    }
            );
        }
  
    }, [])

    const handleChangeCategoria = (e, {value} ) => {
        setIdCategoriaArticolo(value);
        setValue("id_categoria_articolo", value);
    }

    const opzioniTipologia = [
        { key: 'semplice', text: 'Semplice', value: 'semplice' },
        { key: 'composto', text: 'Composto', value: 'composto' }
    ];

    const handleChangeTipologia = (e, {value} ) => {
        setTipologia(value);
        setValue("tipologia_articolo", value);
        if(value === 'composto'){
            setUnitaMisuraDisabilitato(true);
            setValue('unita_misura_articolo', 'pz');
        }
        else if (value === 'semplice'){
            setUnitaMisuraDisabilitato(false);
            setValue('unita_misura_articolo', '');
        }
    }

    const handleChangeComponenti = (e, {value} ) => {
        setArrayOpzioniComponentiArticolo(value);
        setValue("componenti_articolo", JSON.stringify(value));
    }

    
    
    const handleChangeImmagine = (e) => {
        console.log(e.target.files[0].size);
        if(e.target.files[0].size<2000000){
            formDataImmagine.append('nuova_immagine_articolo', e.target.files[0]); 
            console.log('dentro', e.target.files[0])
            setFlagImmagineModificata(true);
            console.log(formDataImmagine.get('nuova_immagine_articolo'));
        }
        else{
            setValue('immagine_articolo', '');
            alert("L'immagine selezionata è troppo grande. La dimensione massima consentita è pari a 2MB.");
        }
        
    }

    const eliminaImmagine = () => {

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/elimina_immagine_articolo/' + idArticolo )
        .then(response => response.text())
        .then(risp => {

            console.log(risp);

            if(risp === 'ok'){
                setUrlImmagine('');

            }

                }
        );

    }

    const stampaSezioneComposto = tipologia => {
        if (tipologia === 'composto'){

            return (
                <Fragment>

                    <Form.Field>
                        <label>Seleziona tutti i componenti che vuoi rendere disponibili per questo prodotto: (clicca sulla freccia a destra per far comparire gli altri componenti da aggiungere) </label>
                        <Dropdown ref={register} fluid multiple selection options={arrayOpzioniComponentiArticoli} value={arrayOpzioniComponentiArticolo} onChange={handleChangeComponenti} />
                    </Form.Field>
                    <Form.Field>
                        <label>Per inserire dei nuovi componenti non presenti nel precedente campo, inserisci il nome di tutti i nuovi componenti separati da virgola:</label>
                        <input ref={register} name="componenti_aggiunti_articolo" id="componenti_aggiunti_articolo" placeholder='' type="text"/>
                        <Label pointing>Ad esempio: fiordilatte, cioccolato, vaniglia, stracciatella</Label>
                    </Form.Field>
                    <Form.Field>
                        <label>N° massimo di componenti che l'utente potrà scegliere al momento dell'ordine::</label>
                        <input ref={register} name="numero_max_componenti_articolo" id="numero_max_componenti_articolo" placeholder='Numero massimo componenti' defaultValue={numeroMaxComponenti} type="number"/>
                        <Label pointing>Rappresenta il numero massimo di componenti che l'utente può scegliere per comporre questo prodotto. Minimo 1, massimo 10.</Label>
                    </Form.Field>

                </Fragment>
                
            
            )
        }
    }


    const onSubmit = data => {
        //console.log(data);
        // console.log(data.nuova_immagine_articolo);
        setSaving(true);

        if(data.nome_articolo !== '' && data.unita_misura_articolo !== '' && data.prezzo_articolo !== '' ){

            let message = "Attendere, salvataggio in corso..."
            enqueueSnackbar(message, { 
                autoHideDuration: 2000,
                variant: 'success',
            });

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(data)
            };
            fetch('https://ordinasicuro.it/670914_920408/lib/api/crea_articolo/', requestOptions)
                .then(response => response.json())
                .then(dati => {
                    console.log(dati);
                    console.log('flagImmagine', flagImmagineModificata );
                    console.log(dati.esito);
                    if(dati.esito==="ok" && flagImmagineModificata){

                        console.log('idperimmagine', dati.id_articolo_inserito);
                        console.log('formdatapreinvio', formDataImmagine.get('nuova_immagine_articolo'));

                        const requestOptionsImmagine = {
                            method: 'POST',
                            body: formDataImmagine
                        };
                        fetch('https://ordinasicuro.it/670914_920408/lib/api/aggiorna_immagine_articolo/' + dati.id_articolo_inserito + '/', requestOptionsImmagine)
                                .then(response => response.text())
                                .then(dati => {
                                    console.log('aggiornamento immagine', dati);
                                    if(dati==="ok"){
                                        history.goBack()
                                    }
                                    else{
                                        setSaving(false);
                                        // setOpen(true);
                                        let message = "Si è verificato un errore nel salvataggio del tuo prodotto. Riprovare più tardi."
                                        enqueueSnackbar(message, { 
                                            variant: 'error',
                                        });
                                    }
                                });
                    }
                    else{
                        if( dati.esito === 'ok'){
                            history.goBack();
                        }else{
                            setSaving(false);
                            // setOpen(true);
                            let message = "Si è verificato un errore nel salvataggio del tuo prodotto. Riprovare più tardi."
                            enqueueSnackbar(message, { 
                                variant: 'error',
                            });
                        }
                        
                    }
                    
                });
        }
        else{
            setSaving(false);
            alert("È necessario compilare ogni campo prima di proseguire con il salvataggio!");
        }

        
    }


    return (
        <Fragment>
            <div className="mt6">
                {/* <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Si è verificato un errore nel salvataggio del tuo prodotto.
                    </Alert>
                </Snackbar> */}

                <Modal
                    closeIcon
                    open={openModaleImmagine}
                    onClose={() => setOpenModaleImmagine(false)}
                    onOpen={() => setOpenModaleImmagine(true)}
                >
                    <Header icon='trash' content='Elimina immagine' />
                    <Modal.Content>
                        <p>
                            Vuoi davvero eliminare questa immagine?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => setOpenModaleImmagine(false)}>
                            <Icon name='remove' /> No
                        </Button>
                        <Button color='green' onClick={() => {setOpenModaleImmagine(false); eliminaImmagine();} } >
                            <Icon name='checkmark' /> Sì
                        </Button>
                    </Modal.Actions>
                </Modal>


                <SezioneBoxed>
                    <div className="w-100">
                        <Link to='/pannello-controllo/'>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna al Pannello di Controllo
                            </Button>
                        </Link>
                        
                        <h2>Aggiungi un nuovo prodotto</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} nome="formModificaArticolo" id="formModificaArticolo" enctype='multipart/form-data'>
                            <input type="hidden" require ref={register} name="id_negozio" id="id_negozio" value={JSON.parse(localStorage.getItem('infoUtente')).id_negozio}/>
                            <Form.Field>
                                <label>Scegli un immagine per il tuo prodotto:</label>
                                <input require ref={register} type='file' accept="image/*" name='immagine_articolo' id="immagine_articolo" onChange={handleChangeImmagine}></input>
                                <Label pointing>Max 2MB</Label>
                            </Form.Field>
                            <Form.Field>
                                <label>Nome:</label>
                                <input require ref={register} name="nome_articolo" id="nome_articolo" placeholder='Nome del prodotto' defaultValue={nome} maxLength="60"/>
                                <Label pointing>Max 60 caratteri</Label>
                            </Form.Field>
                            <Form.Field>
                                <label>Descrizione:</label>
                                <textarea ref={register} name="descrizione_articolo" id="descrizione_articolo" placeholder='Descrizione del prodotto' defaultValue={descrizione} maxLength="900"/>
                                <Label pointing>Max 900 caratteri</Label>
                            </Form.Field>
                            <Form.Field>
                                <label>Seleziona la categoria del prodotto:</label>
                                <Dropdown fluid selection name="id_categoria_articolo" id="id_categoria_articolo" options={arrayOpzioniCategorie} value={idCategoriaArticolo} onChange={handleChangeCategoria}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Seleziona la tipologia del prodotto:</label>
                                <Dropdown fluid selection name="tipologia_articolo" id="tipologia_articolo" options={opzioniTipologia} value={tipologia} onChange={handleChangeTipologia}/>
                            </Form.Field>
                            {stampaSezioneComposto(tipologia)}
                            <Form.Field>
                                <label>Unità di misura:</label>
                                <input disabled={unitaMisuraDisabilitato} require ref={register} name="unita_misura_articolo" id="unita_misura_articolo" placeholder='Unità di misura' defaultValue={unitaMisura} maxLength="9" />
                                <Label pointing>Max 9 caratteri</Label>
                            </Form.Field>
                            <Form.Field>
                                <label>Prezzo:</label>
                                <input require ref={register} step="any" name="prezzo_articolo" id="prezzo_articolo" placeholder='Prezzo' defaultValue={prezzo} type="number"/>
                                <Label pointing>Utilizza il punto per separare i decimali</Label>
                            </Form.Field>
                            <Form.Field>
                                <Button loading={saving} type="submit" color='green'>Salva</Button>
                            </Form.Field>

                        </Form>
                    </div>

                </SezioneBoxed>
                
                
            </div>

        </Fragment>
        
    )
}

export default AggiungiArticolo
