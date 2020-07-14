import React, { Fragment } from 'react'

const Articolo = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine }) => {

    return (
        <Fragment>
            <p>{nome}</p>
            <p>{descrizione}</p>
        </Fragment>
    )
}

export default Articolo
