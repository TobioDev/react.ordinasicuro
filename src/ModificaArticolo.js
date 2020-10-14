import React, { useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { Button, Form, Input, Select, TextArea, Label, Dropdown} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

const ModificaArticolo = (props) => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [nome, setNome] = useState(['']);
    const [descrizione, setDescrizione] = useState(['']);
    const [idCategoriaArticolo, setIdCategoriaArticolo] = useState(['']);
    const [arrayOpzioniCategorie, setArrayOpzioniCategorie] = useState([[]]);



    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
          
            localStorage.removeItem('infoUtente');
            history.push("/login/");
  
        }
        else{
            fetch('https://ordinasicuro.it/index.php/api/modifica_articolo/' + props.match.params.id_articolo )
            .then(response => response.json())
            .then(json => {
                // setInfoNegozio(json.get_negozio);
                // setInfoUtenteNegozio(json.get_utente);
                // setCategorie(json.get_categorie);
                // setCategorieArticoli(json.get_categorie_articoli);
                // setArticoli(json.get_articoli);
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                // setVisibilitaLoader(false);
                if(json.get_articolo.id_negozio === JSON.parse(localStorage.getItem('infoUtente')).id_negozio){
                    setNome(json.get_articolo.nome);
                    setDescrizione(json.get_articolo.descrizione);
                    setIdCategoriaArticolo(json.get_articolo.id_categoria_articolo);

                    let arrayTemnporaneo = [];
                    json.get_categorie_negozio.map( categoria => arrayTemnporaneo.push({key: categoria.id, text: categoria.nome, value: categoria.id}));
                    setArrayOpzioniCategorie(arrayTemnporaneo);

                    console.log(json);
                }
                else{
                    history.push("/login/");
                }
                
                    }
            );
        }
  
      }, [])


      console.log('ciao', arrayOpzioniCategorie);

    const onSubmit = data => {
        //console.log(data);

        if(typeof data.orario !== 'undefined'){

            localStorage.setItem('infoOrdine', JSON.stringify(data));

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(data)
            };
            fetch('https://ordinasicuro.it/api/conferma_ordine', requestOptions)
                .then(response => response.json())
                .then(dati => {
                    if(dati.presenza_errori===false){
                        //alert('Successo!');
                        history.push("/ordine-inviato/");
                    }
                    else{
                        //avviaModale('Attenzione','Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                        alert('Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                    }
                });

        }else{
            alert("Completa tutti i campi richiesti prima di procedere.")
        }

        
    }


    return (
        <div className="mt6">
            <SezioneBoxed>
                <div className="w-100">
                    <h2>Modifica il prodotto che hai selezionato</h2>
                    <Form onSubmit={handleSubmit(onSubmit)} nome="formModificaArticolo" id="formModificaArticolo">
                        <Form.Field>
                            <label>Nome:</label>
                            <input ref={register} name="nome_articolo" id="nome_articolo" placeholder='Nome del prodotto' defaultValue={nome} maxLength="60"/>
                            <Label pointing>Max 60 caratteri</Label>
                        </Form.Field>
                        <Form.Field>
                            <label>Descrizione:</label>
                            <TextArea ref={register} name="descrizione_articolo" id="descrizione_articolo" placeholder='Descrizione del prodotto' defaultValue={descrizione} maxLength="900"/>
                            <Label pointing>Max 900 caratteri</Label>
                        </Form.Field>
                        <Form.Field>
                            <label>Seleziona la categoria del prodotto:</label>
                            <Dropdown placeholder='Skills' fluid multiple selection options={arrayOpzioniCategorie} />
                        </Form.Field>

                    </Form>
                </div>

            </SezioneBoxed>
            
            
        </div>
    )
}

export default ModificaArticolo
