import React, { Fragment } from 'react'
import Articolo from './Articolo'

const ListaArticoli = ({articoli}) => {

    const stampaArticoli = articoli.map( (articolo, i) =>

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
            {stampaArticoli}
        </Fragment>
    )
}

export default ListaArticoli
