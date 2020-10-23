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

const ModificaCategoria = (props) => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [open, setOpen] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    const [nome, setNome] = useState(['']);
    const [idCategoria, setIdCategoria] = useState(['']);

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
            fetch('https://ordinasicuro.it/index.php/api/modifica_categoria_articolo/' + props.match.params.id_categoria_articolo )
            .then(response => response.json())
            .then(json => {

                console.log(json);

                if(json.get_categoria_articolo.id_negozio === JSON.parse(localStorage.getItem('infoUtente')).id_negozio){
                    setNome(json.get_categoria_articolo.nome.replace("\\\'", "\'"));
                    setIdCategoria(json.id);
                    setValue('id_categoria_articolo', json.get_categoria_articolo.id) 
                }
            
            })
        }
    
    }, [])


    const onSubmit = data => {
        console.log(data);
        setSaving(true);

        if(data.nome_categoria !== ''){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(data)
            };
            fetch('https://ordinasicuro.it/api/aggiorna_categoria_articolo/', requestOptions)
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
        else{
            alert("È necessario compilare ogni campo prima di proseguire con il salvataggio!");
        }

        
    }


    return (
        <Fragment>
            <div className="mt6">
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Si è verificato un errore nel salvataggio della tua categoria.
                    </Alert>
                </Snackbar>


                <SezioneBoxed>
                    <div className="w-100">
                        <Link to='/gestione-componenti/'>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna a Gestione Categorie
                            </Button>
                        </Link>
                        
                        <h2>Modifica la Categoria che hai selezionato</h2>
                        <Form onSubmit={handleSubmit(onSubmit)} nome="formModificaCategoria" id="formModificaCategoria" enctype='multipart/form-data'>

                            <Form.Field>
                                <label>Nome:</label>
                                <input require ref={register} name="nome_categoria_articolo" id="nome_categoria_articolo" placeholder='Nome della categoria' defaultValue={nome} maxLength="60"/>
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

export default ModificaCategoria