import React, { Fragment } from 'react'

import  './Articolo.css'

const ArticoloBase = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine, register, setValue, componentiArticolo, associazioniComponenteArticolo, avviaModaleImg }) => {

    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img className="w4 h4 fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }


    return (
        <Fragment>
            <div className="w-100 pa4 ba b--black-20 br3 mb2">
                <div className="w-100 flex items-start justify-start">
                    <p className="w-60 f4 fw7 titolo mb0">{nome}</p>
                    <p className="w-40 f4 titolo flex justify-end">€ {prezzo} / {unita_misura}</p>
                </div>
                <div className="w-100 mt3 flex items-start justify-start">
                    {link_img(url_immagine)}
                    <p className="sottotitolo">{descrizione}</p>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ArticoloBase
