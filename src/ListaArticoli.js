import React, { Fragment } from 'react'
import Articolo from './Articolo'
import SezioneBoxed from './SezioneBoxed'

const ListaArticoli = ({articoli, categorieArticoli}) => {

    // const stampaArticoliPerCategoria = categorieArticoli
    //                                     .map( (categoriaArticolo) => {
    //                                         return(
    //                                             <h1>{categoriaArticolo.nome}</h1>
    //                                             articoli.filter((articolo) =>
    //                                                 articolo.id_categoria_articolo === categoriaArticolo.id
    //                                             )
    //                                             .map((articoloFiltrato) => 

    //                                                 <Articolo
    //                                                     key={articoloFiltrato.id} 
    //                                                     id={articoloFiltrato.id} 
    //                                                     visibilita={articoloFiltrato.visibilita} 
    //                                                     nome={articoloFiltrato.nome} 
    //                                                     tipologia={articoloFiltrato.tipologia} 
    //                                                     id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
    //                                                     descrizione = {articoloFiltrato.descrizione} 
    //                                                     unita_misura = {articoloFiltrato.unita_misura} 
    //                                                     prezzo = {articoloFiltrato.prezzo} 
    //                                                     url_immagine = {articoloFiltrato.url_immagine}
    //                                                 />

    //                                             )
    //                                         )
                                            
                                            
    //                                     })

    const stampaArticoli = articoli.map( (articolo) =>

        <Articolo
            key={articolo.id} 
            id={articolo.id} 
            visibilita={articolo.visibilita} 
            nome={articolo.nome} 
            tipologia={articolo.tipologia} 
            id_categoria_articolo = {articolo.id_categoria_articolo} 
            descrizione = {articolo.descrizione} 
            unita_misura = {articolo.unita_misura} 
            prezzo = {articolo.prezzo} 
            url_immagine = {articolo.url_immagine}
        />

    )
    

    return (
        <Fragment>
            <SezioneBoxed >
                {stampaArticoli}
            </SezioneBoxed >
        </Fragment>
    )
}

export default ListaArticoli
