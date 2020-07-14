import React, { Fragment } from 'react'

import  './Articolo.css'

const Articolo = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine }) => {

    const link_img = (url_immagine) => {

        if(url_immagine!== ''){
            return <img className="w4 h4 fl mr3 img-articolo br3" src={"https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/" + url_immagine } alt="" />
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
                <div class="w-100 mt3 flex justify-start items-center">
                    <div className="flex justify-start items-center w-60">
                        <input name="" className="input-reset ba b--black-20 pa2 mb2 w-20" type="text" aria-describedby="name-desc"/> <p className="mh2 w-20">{unita_misura}</p> 
                        <a class="f6 br3 ph3 pv2 mb2 mr2 dib white bg-dark-green titolo fw7"> + </a>
                        <a class="f6 br3 ph3 pv2 mb2 dib white bg-dark-red titolo fw7"> - </a>
                    </div>
                    <div className="flex justify-end items-center w-40 titolo fw7">
                        <a class="f6 link dim br3 ph3 pv2 mb2 dib white bg-blue" href="#0"> Nota </a>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Articolo
