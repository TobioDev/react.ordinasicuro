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

const ModificaComponente = (props) => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [open, setOpen] = React.useState(false);
    const [openModaleImmagine, setOpenModaleImmagine] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    const [nome, setNome] = useState(['']);
    const [idComponente, setIdComponente] = useState(['']);
    const [urlImmagine, setUrlImmagine] = useState(['']);

    setValue('id_negozio', JSON.parse(localStorage.getItem('infoUtente')).id_negozio);

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

    window.scrollTo(0,0);

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
            localStorage.removeItem('infoUtente');
            history.push("/login/");
        }
        else{
            fetch('https://ordinasicuro.it/index.php/api/modifica_componente/' + props.match.params.id_componente )
            .then(response => response.json())
            .then(json => {

                console.log(json);

                if(json.id_negozio === JSON.parse(localStorage.getItem('infoUtente')).id_negozio){
                    setNome(json.nome.replace("\\\'", "\'"));
                    setUrlImmagine(json.url_immagine);
                    setIdComponente(json.id);
                    setValue('id_componente', json.id) 
                }
            
            })
        }
        
  
    }, [])


    const formDataImmagine = new FormData();
    let flagImmagineModificata = false;
    
    const handleChangeImmagine = (e) => {
        console.log(e.target.files[0].size);
        if(e.target.files[0].size<2000000){
            formDataImmagine.append('nuova_immagine_componente', e.target.files[0]); 
            console.log('dentro', e.target.files[0])
            flagImmagineModificata = true;
            console.log(formDataImmagine.get('nuova_immagine_componente'));
        }
        else{
            setValue('immagine_componente', '');
            alert("L'immagine selezionata è troppo grande. La dimensione massima consentita è pari a 2MB.");
        }
        
    }

    const eliminaImmagine = () => {

        fetch('https://ordinasicuro.it/index.php/api/elimina_immagine_componente/' + idComponente )
        .then(response => response.text())
        .then(risp => {

            console.log(risp);

            if(risp === 'ok'){
                setUrlImmagine('');

            }

                }
        );

    }

    const stampaImmagine = urlImmagine => {

        if (urlImmagine !== ''){

            return (
                <Form.Field>
                    <label>Immagine articolo:</label>
                    <Image src={'https://www.ordinasicuro.it/img_componenti/img_componenti_compressed/' + urlImmagine} size='small' />
                    <Button type="button" color='red' onClick={() => setOpenModaleImmagine(true)}>Elimina Immagine</Button>
                </Form.Field>
            
            )
        }
    }

    const onSubmit = data => {
        console.log(data);
        console.log(data.nuova_immagine_articolo);
        setSaving(true);

        if(data.nome_componente !== ''){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(data)
            };
            fetch('https://ordinasicuro.it/api/aggiorna_componente/', requestOptions)
                .then(response => response.text())
                .then(dati => {
                    console.log(dati);
                    if(dati==="ok" && flagImmagineModificata){

                        const requestOptionsImmagine = {
                            method: 'POST',
                            body: formDataImmagine
                        };
                        fetch('https://ordinasicuro.it/api/aggiorna_immagine_componente/' + idComponente + '/', requestOptionsImmagine)
                                .then(response => response.text())
                                .then(dati => {
                                    console.log('aggiornamento immagine', dati);
                                    if(dati==="ok"){
                                        history.goBack()
                                    }
                                    else{
                                        setSaving(false);
                                        setOpen(true);
                                    }
                                });
                    }
                    else{
                        if( dati === 'ok'){
                            history.goBack();
                        }else{
                            setSaving(false);
                            setOpen(true);
                        }
                        
                    }
                    
                });

        }
        else{
            alert("È necessario compilare ogni campo prima di proseguire con il salvataggio!");
        }

        
    }


    return (
        <Fragment>
            <div className="mt6">
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Si è verificato un errore nel salvataggio del tuo componente.
                    </Alert>
                </Snackbar>

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
                        <Link to='/gestione-componenti/'>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna a Gestione Componenti
                            </Button>
                        </Link>
                        
                        <h2>Modifica il componente che hai selezionato</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} nome="formModificaComponente" id="formModificaComponente" enctype='multipart/form-data'>
                            {stampaImmagine(urlImmagine)}
                            <Form.Field>
                                <label>Modifica l'immagine per il tuo prodotto:</label>
                                <input require ref={register} type='file' accept="image/*" name='immagine_articolo' id="immagine_articolo" onChange={handleChangeImmagine}></input>
                                <Label pointing>Max 2MB</Label>
                            </Form.Field>
                            <Form.Field>
                                <label>Nome:</label>
                                <input require ref={register} name="nome_componente" id="nome_componente" placeholder='Nome del componente' defaultValue={nome} maxLength="60"/>
                                <Label pointing>Max 60 caratteri</Label>
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

export default ModificaComponente