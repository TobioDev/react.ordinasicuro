import React from 'react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

import Articolo from './Articolo'
import SezioneBoxed from './SezioneBoxed'

const ListaArticoli = ({articoli, categorieArticoli}) => {

    const { register, handleSubmit, watch, errors} = useForm();
    let history = useHistory();
    
    const onSubmit = data => {

        //let arrayTotale = Object.entries(data);
        //arrayTotale = arrayTotale.filter((elemento)=>elemento[1]!=='0' && elemento[1]!=='');
        //console.log( JSON.stringify(arrayTotale));
        // history.push("/#home");
        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('https://ordinasicuro.it/api/crea_ordine', requestOptions)
            .then(response => response.json())
            .then(dati => console.log('risposta', dati));

    };

    const stampaArticoliPerCategoria = categorieArticoli
                                        .map( (categoriaArticolo) => (
                                            <div>
                                                <h1>{categoriaArticolo.nome}</h1>
                                                {articoli.filter((articolo) =>
                                                    articolo.id_categoria_articolo === categoriaArticolo.id
                                                )
                                                .map((articoloFiltrato) => 

                                                    <Articolo
                                                        key={articoloFiltrato.id} 
                                                        register={register}
                                                        id={articoloFiltrato.id} 
                                                        visibilita={articoloFiltrato.visibilita} 
                                                        nome={articoloFiltrato.nome} 
                                                        tipologia={articoloFiltrato.tipologia} 
                                                        id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
                                                        descrizione = {articoloFiltrato.descrizione} 
                                                        unita_misura = {articoloFiltrato.unita_misura} 
                                                        prezzo = {articoloFiltrato.prezzo} 
                                                        url_immagine = {articoloFiltrato.url_immagine}
                                                    />

                                                )}
                                            </div>                                            
                                            
                                        ))
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} nome="form-articoli" id="form-articoli">
            <SezioneBoxed >
                {stampaArticoliPerCategoria}
            </SezioneBoxed >
        </form>
    )
}

export default ListaArticoli
