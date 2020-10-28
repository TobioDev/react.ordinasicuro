import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from "react-hook-form"

import { Button, Header, Icon, Modal, Image } from 'semantic-ui-react'
import ArticoloPannello from './ArticoloPannello';


const ListaArticoliPannello = ({articoli}) => {

    console.log('STAMPO LISTA');

    const { register, setValue, errors} = useForm();
    const [ aperturaModale, setAperturaModale ] = useState(false);
    const [ aperturaModaleImg, setAperturaModaleImg ] = useState(false);
    const [ titoloModale, setTitoloModale] = useState('');
    const [ messaggioModale, setMessaggioModale] = useState('');
    const [ urlImgModale, setUrlImgModale] = useState('');

    //const [ stampaArticoliPerCategoria, setStampaArticoliPerCategoria] = useState('');


    // useEffect((stampaArticoliPerCategoria)=> {

    //     setStampaArticoliPerCategoria( 

    //     )

    // }, [articoli])


    const avviaModale = (titolo, testo) => {
        setAperturaModale(true);
        setTitoloModale(titolo);
        setMessaggioModale(testo);
    }


    const avviaModaleImg = (url) => {
        window.history.pushState('backPressed', null, null);
        window.history.pushState('dummy', null, null);
        window.addEventListener('popstate', chiudiModaleImg, { once: true });
        setAperturaModaleImg(true);
        setUrlImgModale("https://www.ordinasicuro.it/670914_920408/lib/img_articoli/img_articoli_compressed/"+url);
    }

    const chiudiModale = () => setAperturaModale(false);
    const chiudiModaleImg = () => setAperturaModaleImg(false);

    // const stampaArticoliPerCategoria = categorieArticoli
    // .map( categoriaArticolo => (
    //     (<div className="w-100 mv4 ph3" key={categoriaArticolo.id} >
    //         <h1>{categoriaArticolo.nome}</h1>
    //         <a id={"categoria-"+categoriaArticolo.nome} style={{"position": "relative", "top":"-160px"}}></a>
    //         {articoli
    //             .filter( articolo => articolo.id_categoria_articolo === categoriaArticolo.id)
    //             .map( articoloFiltrato => {

    //                 console.log('stampo prodotto');
    //                 return (

    //                     <ArticoloPannello
    //                         key={articoloFiltrato.id} 
    //                         register={register}
    //                         setValue={setValue}
    //                         avviaModaleImg={avviaModaleImg}
    //                         id={articoloFiltrato.id} 
    //                         visibilita={articoloFiltrato.visibilita} 
    //                         nome={articoloFiltrato.nome} 
    //                         tipologia={articoloFiltrato.tipologia} 
    //                         id_categoria_articolo = {articoloFiltrato.id_categoria_articolo} 
    //                         descrizione = {articoloFiltrato.descrizione} 
    //                         unita_misura = {articoloFiltrato.unita_misura} 
    //                         prezzo = {articoloFiltrato.prezzo} 
    //                         url_immagine = {articoloFiltrato.url_immagine}
    //                         componentiArticolo = {componentiArticolo}
    //                         associazioniComponenteArticolo = {associazioniComponenteArticolo}
    //                     />

    //                 )



    //             }                                                    

    //         )}
    //     </div>  )                                          

    // ))

    const stampaArticoli = articoli.map( articolo => {

        console.log('stampo prodotto');
        return (

            <ArticoloPannello
                key={articolo.id} 
                avviaModaleImg={avviaModaleImg}
                id={articolo.id} 
                idCategoriaArticolo={articolo.id_categoria_articolo} 
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
    }                                                    

)


    
    

    return (

        <Fragment>
                {stampaArticoli}

            {/* {Modale} */}
            <Modal open={aperturaModale} onClose={chiudiModale} basic size='small' closeIcon>
                <Header icon='hand spock' content={titoloModale} />
                <Modal.Content>
                <p>
                    {messaggioModale}
                </p>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={chiudiModale} inverted>
                    <Icon name='checkmark' /> Ok
                </Button>
                </Modal.Actions>
            </Modal>

            {/* {Modale immagine} */}
            <Modal open={aperturaModaleImg} onClose={chiudiModaleImg} basic closeIcon>
                <Modal.Content image>
                <Image wrapped size='medium' src={urlImgModale} centered />
                </Modal.Content>
            </Modal>
        </Fragment>
    )
}

export default ListaArticoliPannello
