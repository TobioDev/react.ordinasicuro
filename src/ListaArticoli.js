import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

import Articolo from './Articolo'
import ArticoloBase from './ArticoloBase'
import SezioneBoxed from './SezioneBoxed'
import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react'


const ListaArticoli = ({idNegozio, abbonamentoUtente, articoli, categorieArticoli, componentiArticolo, associazioniComponenteArticolo, ordiniAttivi}) => {

    const { register, handleSubmit, setValue, watch, errors} = useForm();
    const [ aperturaModale, setAperturaModale ] = useState(false);
    const [ aperturaModaleImg, setAperturaModaleImg ] = useState(false);
    const [ titoloModale, setTitoloModale] = useState('');
    const [ messaggioModale, setMessaggioModale] = useState('');
    const [ urlImgModale, setUrlImgModale] = useState('');

    let history = useHistory();     


    const avviaModale = (titolo, testo) => {
        setAperturaModale(true);
        setTitoloModale(titolo);
        setMessaggioModale(testo);
    }


    const avviaModaleImg = (url) => {
        window.history.pushState('backPressed', null, null);
        window.history.pushState('dummy', null, null);
        window.addEventListener('popstate', chiudiModaleImg, { once: true });
        setAperturaModaleImg(true);
        setUrlImgModale("https://www.ordinasicuro.it/670914_920408/lib/img_articoli/img_articoli_compressed/"+url);
    }

    const chiudiModale = () => setAperturaModale(false);
    const chiudiModaleImg = () => setAperturaModaleImg(false);

    
    const onSubmit = data => {

        let arrayTotale = Object.entries(data);
        arrayTotale = arrayTotale.filter((elemento)=>elemento[1]!=='0' && elemento[1]!=='' && elemento[1]!==undefined);
        //console.log( JSON.stringify(arrayTotale));
        // history.push("/#home");
        // console.log(data);
        // console.log('modalità json', JSON.stringify(data));
        // console.log('arrayTotale', arrayTotale);

        //Maggiore di 1 perchè c'è sempre l'id del negozio
        if(arrayTotale.length>1){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(arrayTotale)
            };
            // console.log('body',requestOptions.body)
            fetch('https://ordinasicuro.it/670914_920408/lib/api/crea_ordine', requestOptions)
                .then(response => response.json())
                .then(dati => {
                    if(dati.presenza_errori===false){

                        if(dati.presenza_composti===true){
                            history.push("/conferma-composti2/"+dati.id_ordine_creato);
                        }
                        else{
                            history.push("/conferma-ordine/"+dati.id_ordine_creato);
                        }

                    }
                    else{
                        avviaModale('Attenzione','Si è verificato un errore durante l\'invio del tuo ordine. Riprova di nuovo.');
                    }
                });

        }
        else{
            avviaModale('Attenzione','Per proseguire devi ordinare almeno un prodotto');
        }

        

    };

    const stampaArticoliPerCategoria = categorieArticoli
                                        .map( categoriaArticolo => (
                                            <div className="w-100 mv4 ph3" key={categoriaArticolo.id} >
                                                <h1>{categoriaArticolo.nome}</h1>
                                                <a id={"categoria-"+categoriaArticolo.nome} style={{"position": "relative", "top":"-160px"}}></a>
                                                {articoli
                                                    .filter( articolo => articolo.id_categoria_articolo === categoriaArticolo.id)
                                                    .map( articoloFiltrato => {

                                                        if(articoloFiltrato.visibilita === '1'){
                                                            console.log(articoloFiltrato);
                                                            if(abbonamentoUtente!=='2' && abbonamentoUtente!=='0' && ordiniAttivi===1){
                                                                return (

                                                                    <Articolo
                                                                        key={articoloFiltrato.id} 
                                                                        register={register}
                                                                        setValue={setValue}
                                                                        avviaModaleImg={avviaModaleImg}
                                                                        id={articoloFiltrato.id} 
                                                                        visibilita={articoloFiltrato.visibilita} 
                                                                        nome={articoloFiltrato.nome} 
                                                                        tipologia={articoloFiltrato.tipologia} 
                                                                        id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
                                                                        descrizione = {articoloFiltrato.descrizione} 
                                                                        unita_misura = {articoloFiltrato.unita_misura} 
                                                                        prezzo = {articoloFiltrato.prezzo} 
                                                                        url_immagine = {articoloFiltrato.url_immagine}
                                                                        componentiArticolo = {componentiArticolo}
                                                                        associazioniComponenteArticolo = {associazioniComponenteArticolo}
                                                                    />

                                                                )

                                                            }
                                                            else{

                                                                return (

                                                                    <ArticoloBase
                                                                        key={articoloFiltrato.id} 
                                                                        register={register}
                                                                        setValue={setValue}
                                                                        avviaModaleImg={avviaModaleImg}
                                                                        id={articoloFiltrato.id} 
                                                                        visibilita={articoloFiltrato.visibilita} 
                                                                        nome={articoloFiltrato.nome} 
                                                                        tipologia={articoloFiltrato.tipologia} 
                                                                        id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
                                                                        descrizione = {articoloFiltrato.descrizione} 
                                                                        unita_misura = {articoloFiltrato.unita_misura} 
                                                                        prezzo = {articoloFiltrato.prezzo} 
                                                                        url_immagine = {articoloFiltrato.url_immagine}
                                                                        componentiArticolo = {componentiArticolo}
                                                                        associazioniComponenteArticolo = {associazioniComponenteArticolo}
                                                                    />

                                                                )

                                                            }

                                                        }

                                                    }                                                    

                                                )}
                                            </div>                                            
                                            
                                        ))
    

    return (

        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} nome="form-articoli" id="form-articoli">
                <input ref={register} type="hidden" id="idNegozio" name="idNegozio" value={idNegozio}/>
                {stampaArticoliPerCategoria}
            </form>

            {/* {Modale} */}
            <Modal open={aperturaModale} onClose={chiudiModale} basic size='small' closeIcon>
                <Header icon='hand spock' content={titoloModale} />
                <Modal.Content>
                <p>
                    {messaggioModale}
                </p>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={chiudiModale} inverted>
                    <Icon name='checkmark' /> Ok
                </Button>
                </Modal.Actions>
            </Modal>

            {/* {Modale immagine} */}
            <Modal open={aperturaModaleImg} onClose={chiudiModaleImg} basic closeIcon>
                <Modal.Content image>
                <Image wrapped size='medium' src={urlImgModale} centered />
                </Modal.Content>
            </Modal>
        </Fragment>
    )
}

export default ListaArticoli
