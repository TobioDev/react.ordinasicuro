import React, { Fragment, useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
// import { Dropdown } from 'semantic-ui-react'

import  './Articolo.css'

const Articolo = ({id, visibilita, nome, tipologia, id_categoria_articolo, descrizione, unita_misura, prezzo, url_immagine, register, setValue, componentiArticolo, associazioniComponenteArticolo, avviaModaleImg }) => {

    const [quantita, setQuantita] = useState(0);
    const [visibilitaNota, setvisibilitaNota] = useState('dn');
    const [disabilitaNota, setDisabilitaNota] = useState(true);


    //Per registrare valore Dropdown Semantic UI
    // const handleChange = (e, { name, value }) => {setValue(name, value)}
    // useEffect( (id) => {register("componenti"+id);},[register])

    useEffect( () => {
        if(quantita===0){
            setDisabilitaNota(true)
        }
        else{
            setDisabilitaNota(false)
        }
    },[quantita])


    // const stampaSelectComponenti = (componentiArticolo, associazioniComponenteArticolo, id) => {
    //     let arrayOpzioniComponenti = [];
    //     associazioniComponenteArticolo
    //         .filter( associazione => associazione.id_articolo === id)
    //         .map( associazioneFiltrata => componentiArticolo
    //                                         .filter( componente => componente.id === associazioneFiltrata.id_componente)
    //                                         .map( componenteFiltrato => arrayOpzioniComponenti.push({key: componenteFiltrato.nome, text: componenteFiltrato.nome, value: componenteFiltrato.id}))
    //         )
    //     if(arrayOpzioniComponenti.length>0)
    //     return (<Dropdown onChange={handleChange} name={"componenti"+id} id={"componenti"+id} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti}/>)
    // } 
    

    const link_img = (url_immagine) => {
        if(url_immagine!== ''){
            return <img className="w4 h4 fl mr3 img-articolo br3 pointer" src={"https://www.ordinasicuro.it/img_articoli/img_articoli_compressed/" + url_immagine } onClick={() => avviaModaleImg(url_immagine)} alt="" />
        }
    }

    const aggiungi=() => {
        setQuantita((quantita*1)+1);
    }

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

    let escapeNome = nome.replace("\\", "")
    let escapeDescrizione = descrizione.replace("\\", "")

    let prezzoUnita = () => {
        if(unita_misura.toLowerCase() !== 'pz' ){
            return '€ '+prezzo+' / '+unita_misura
        }
        else{
            return '€ '+prezzo
        }
    }


    return (
        <Fragment>
            <div className="w-100 pa4 ba b--black-20 br3 mb2">
                <div className="w-100 flex items-start justify-start">
                    <p className="w-60 f4 fw7 titolo mb0">{escapeNome}</p>
                    <p className="w-40 f4 titolo flex justify-end">{prezzoUnita()}</p>
                </div>
                <div className="w-100 mt3 flex items-start justify-start">
                    {link_img(url_immagine)}
                    <p className="sottotitolo">{escapeDescrizione}</p>
                </div>
                <div className="w-100 mt3 flex justify-start items-center">
                    {/* {stampaSelectComponenti(componentiArticolo, associazioniComponenteArticolo, id) } */}
                </div>
                <div className="w-100 mt3 flex justify-start items-center">
                    <div className="flex justify-start items-center w-70">
                        <p className="mh2 mv0">{unita_misura}</p> 
                        <input ref={register} name={"quantita"+id} id={"quantita"+id} className="input-reset ba b--black-20 pa2 mv0 mr2 w-20 w-10-l" value={quantita} type="text" aria-describedby="name-desc"/>
                        <Button type="button" color='red' content='-' onClick={diminuisci} />
                        <Button type="button" color='green' content='+' onClick={aggiungi} />
                    </div>
                    <div className="flex justify-end items-center w-30 titolo fw7">
                        <Button disabled={disabilitaNota} type="button" primary onClick={comparsaNota}>Nota</Button>
                        {/* <button type="button" class="f6 link dim br3 bn ph3 pv2 mb2 dib white bg-blue titolo fw7" href="#0" onClick={comparsaNota}> Nota </button> */}
                    </div>
                </div>
                <div className={"w-100 mt3 justify-start items-center " + visibilitaNota}>
                    <textarea ref={register} name={"nota"+id} id={"nota"+id} rows="10" className="w-100 pa2" placeholder="Inserisci qui una tua nota per questo prodotto..."></textarea>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Articolo
