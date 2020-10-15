import React, { useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select} from 'semantic-ui-react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";
import { id } from 'date-fns/esm/locale';

const ModificaArticolo = (props) => {

    const { register, handleSubmit, setValue, getValues} = useForm();

    const [nome, setNome] = useState(['']);
    const [descrizione, setDescrizione] = useState(['']);
    const [idCategoriaArticolo, setIdCategoriaArticolo] = useState(['']);
    const [arrayOpzioniCategorie, setArrayOpzioniCategorie] = useState([[]]);
    const [arrayOpzioniComponentiArticoli, setArrayOpzioniComponentiArticoli] = useState([[]]);
    const [arrayOpzioniComponentiArticolo, setArrayOpzioniComponentiArticolo] = useState([[]]);
    const [unitaMisura, setUnitaMisura] = useState(['']);
    const [prezzo, setPrezzo] = useState(['']);
    const [urlImmagine, setUrlImmagine] = useState(['']);
    const [tipologia, setTipologia] = useState(['']);


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
                    setUnitaMisura(json.get_articolo.unita_misura);
                    setPrezzo(json.get_articolo.prezzo);
                    setUrlImmagine(json.get_articolo.url_immagine);
                    setTipologia(json.get_articolo.tipologia);

                    let arrayTemporaneo = [];
                    json.get_categorie_negozio.map( categoria => arrayTemporaneo.push({key: categoria.id, text: categoria.nome, value: categoria.id}));
                    setArrayOpzioniCategorie(arrayTemporaneo);

                    if (json.get_articolo.tipologia === 'composto'){

                        arrayTemporaneo = [];
                        json.get_componenti_articoli.map( componente => arrayTemporaneo.push({key: componente.id, text: componente.nome, value: componente.id}));
                        setArrayOpzioniComponentiArticoli(arrayTemporaneo);

                        arrayTemporaneo = [];
                        json.get_componenti_articolo.map( componente => arrayTemporaneo.push(componente.id));
                        setArrayOpzioniComponentiArticolo(arrayTemporaneo);

                    }

                    

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

    const stampaImmagine = urlImmagine => {
        console.log(urlImmagine);
        if (urlImmagine !== ''){

            return (
                <Form.Field>
                    <label>Immagine articolo:</label>
                    <Image src={'https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/' + urlImmagine} size='small' />
                </Form.Field>
            
            )
        }
    }

    const stampaSezioneComposto = tipologia => {
        if (tipologia === 'composto'){

            return (
                <Form.Field>
                    <label>Seleziona tutti i componenti che vuoi rendere disponibili per questo prodotto:</label>
                    <Dropdown fluid multiple selection options={arrayOpzioniComponentiArticoli} value='126' />
                </Form.Field>
            
            )
        }
    }


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
                        {stampaImmagine(urlImmagine)}
                        <Form.Field>
                            <label>Modifica l'immagine per il tuo prodotto:</label>
                            <input ref={register} type='file' name='immagine_articolo' id="immagine_articolo"></input>
                            <Label pointing>Max 2MB</Label>
                        </Form.Field>
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
                        {stampaSezioneComposto(tipologia)}
                        <Form.Field>
                            <label>Seleziona la categoria del prodotto:</label>
                            <Dropdown fluid selection options={arrayOpzioniCategorie} value={idCategoriaArticolo} />
                        </Form.Field>
                        <Form.Field>
                            <label>Unità di misura:</label>
                            <input ref={register} name="unita_misura" id="unita_misura" placeholder='Unità di misura' defaultValue={unitaMisura} maxLength="9"/>
                            <Label pointing>Max 9 caratteri</Label>
                        </Form.Field>
                        <Form.Field>
                            <label>Prezzo:</label>
                            <input ref={register} name="prezzo" id="prezzo" placeholder='Prezzo' defaultValue={prezzo} type="number"/>
                            <Label pointing>Utilizza il punto per separare i decimali</Label>
                        </Form.Field>

                    </Form>
                </div>

            </SezioneBoxed>
            
            
        </div>
    )
}

export default ModificaArticolo
