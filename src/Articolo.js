import React, { Fragment, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import  './Articolo.css'

const Articolo = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine, register, componentiArticolo, associazioniComponenteArticolo }) => {

    const [quantita, setQuantita] = useState(0);
    const [visibilitaNota, setvisibilitaNota] = useState('dn');


    const stampaSelectComponenti = (componentiArticolo, associazioniComponenteArticolo, id) => {
        let arrayOpzioniComponenti = [];
        associazioniComponenteArticolo
            .filter( associazione => associazione.id_articolo === id)
            .map( associazioneFiltrata => componentiArticolo
                                            .filter( componente => componente.id === associazioneFiltrata.id_componente)
                                            .map( componenteFiltrato => arrayOpzioniComponenti.push({key: componenteFiltrato.nome, text: componenteFiltrato.nome, value: componenteFiltrato.id}))
            )
        if(arrayOpzioniComponenti.length>0)
        return (<Dropdown placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti} />)
    } 
    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img className="w4 h4 fl mr3 img-articolo br3" src={"https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/" + url_immagine } alt="" />
        }
    }

    const aggiungi=() => (
        setQuantita((quantita*1)+1)
    )

    const diminuisci=() => {
        if(quantita >0){
            setQuantita((quantita*1)-1)
        }
    }

    const comparsaNota = () => {
        if(visibilitaNota === 'dn'){
            setvisibilitaNota('flex animate__animated animate__fadeIn')
        }else{
            setvisibilitaNota('dn')
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
                    {stampaSelectComponenti(componentiArticolo, associazioniComponenteArticolo, id) }
                </div>
                <div class="w-100 mt3 flex justify-start items-center">
                    <div className="flex justify-start items-center w-60">
                        <input ref={register} name={"quantita"+id} id={"quantita"+id} className="input-reset ba b--black-20 pa2 mb2 w-20" value={quantita} type="text" aria-describedby="name-desc"/> <p className="mh2 w-20">{unita_misura}</p> 
                        <button type="button" class="f6 br3 bn ph3 pv2 mb2 mr2 dib white bg-dark-green titolo fw7" onClick={aggiungi}> + </button>
                        <button type="button" class="f6 br3 bn ph3 pv2 mb2 dib white bg-dark-red titolo fw7" onClick={diminuisci}> - </button>
                    </div>
                    <div className="flex justify-end items-center w-40 titolo fw7">
                        <button type="button" class="f6 link dim br3 bn ph3 pv2 mb2 dib white bg-blue titolo fw7" href="#0" onClick={comparsaNota}> Nota </button>
                    </div>
                </div>
                <div class={"w-100 mt3 justify-start items-center " + visibilitaNota}>
                    <textarea ref={register} name={"nota"+id} id={"nota"+id} rows="10" className="w-100 pa2" placeholder="Inserisci qui una tua nota per questo prodotto..."></textarea>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Articolo
