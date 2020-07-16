import React, { useState } from 'react'
import { useForm } from "react-hook-form"

import { useHistory } from "react-router-dom";

import Articolo from './Articolo'
import SezioneBoxed from './SezioneBoxed'

const ListaArticoli = ({idNegozio, articoli, categorieArticoli}) => {

    const { register, handleSubmit, watch, errors} = useForm();
    let history = useHistory();
    
    const onSubmit = data => {

        let variabile_presenza_errori = false;

        let arrayTotale = Object.entries(data);
        arrayTotale = arrayTotale.filter((elemento)=>elemento[1]!=='0' && elemento[1]!=='');
        //console.log( JSON.stringify(arrayTotale));
        // history.push("/#home");
        console.log(data);
        console.log('modalità json', JSON.stringify(data));

        if(arrayTotale.length>1){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: JSON.stringify(arrayTotale)
            };
            console.log('body',requestOptions.body)
            fetch('https://ordinasicuro.it/api/crea_ordine', requestOptions)
                .then(response => response.json())
                .then(dati => console.log('risposta', dati));

        }
        else{
            alert('Per proseguire, seleziona almeno una voce dal menu.');
        }

        

    };

    const stampaArticoliPerCategoria = categorieArticoli
                                        .map( (categoriaArticolo) => (
                                            <div className="w-100 mv4">
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
            <input ref={register} type="hidden" id="idNegozio" name="idNegozio" value={idNegozio}/>
            <SezioneBoxed >
                {stampaArticoliPerCategoria}
            </SezioneBoxed >
        </form>
    )
}

export default ListaArticoli
