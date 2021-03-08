import React, { Fragment } from 'react'
import { Divider } from 'semantic-ui-react'

import  './Articolo.css'

const ArticoloBase = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine, register, setValue, componentiArticolo, associazioniComponenteArticolo, avviaModaleImg }) => {

    let escapeNome = nome.replaceAll("\\\'", "\'")
    escapeNome = nome.replaceAll("\\\"", "\"")
    let escapeDescrizione = descrizione.replaceAll("\\\'", "\'")
    escapeDescrizione = descrizione.replaceAll("\\\"", "\"")

    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img className="w4 h4 fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/670914_920408/lib/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }

    let prezzoUnita = () => {
        if(unita_misura.toLowerCase() !== 'pz' && unita_misura.toLowerCase() !== 'drink' ){
            return '€ '+prezzo+' / '+unita_misura
        }
        else{
            return '€ '+prezzo
        }
    }


    return (
        <Fragment>
            <div className="w-100 pv2 ph3  br3 mb2 shadow-3">
                {/* <div className="w-100 flex items-start justify-start">
                    
                    <p className="w-40 f4 titolo flex justify-end">{prezzoUnita()}</p>
                </div> */}
                <div className="w-100 mv2 flex items-start justify-start">
                    {link_img(url_immagine)}
                    <div>
                        <h1 className="f5 fw7 titolo mb0">{escapeNome}</h1>
                        <p className="sottotitolo f5 mt3-l mt2">{escapeDescrizione}</p>
                    </div>
                </div>
                <Divider className="w-70 w-100-l fr"/>
                <div className="w-100 mv2 flex items-start justify-end">
                    <p className="w-40 f5 titolo flex justify-end"><b>{prezzoUnita()}</b></p>
                </div>

            </div>
            
        </Fragment>
    )
}

export default ArticoloBase
