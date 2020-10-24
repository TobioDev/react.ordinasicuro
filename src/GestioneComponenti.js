import React, { Fragment, useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon} from 'semantic-ui-react'
import ComponentePannello from './ComponentePannello';


const GestioneComponenti = () => {

    const [componenti, setComponenti] = useState([]);
    const [ urlImgModale, setUrlImgModale] = useState('');
    const [ aperturaModaleImg, setAperturaModaleImg ] = useState(false);
    //const [nome, setNome] = useState(['']);


    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
            fetch('https://ordinasicuro.it/index.php/api/componenti_articoli_da_negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
            .then(response => response.json())
            .then(json => {
                // setInfoNegozio(json.get_negozio);
                // setInfoUtenteNegozio(json.get_utente);
                // setCategorie(json.get_categorie);
                // setCategorieArticoli(json.get_categorie_articoli);
                // setArticoli(json.get_articoli);
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                // setVisibilitaLoader(false);
                console.log(json);
                setComponenti(json)
                    }
            );
        }

    }, [])

    const avviaModaleImg = (url) => {
        window.history.pushState('backPressed', null, null);
        window.history.pushState('dummy', null, null);
        window.addEventListener('popstate', chiudiModaleImg, { once: true });
        setAperturaModaleImg(true);
        setUrlImgModale("https://www.ordinasicuro.it/img_componenti/img_componenti_compressed/"+url);
    }

    const chiudiModaleImg = () => setAperturaModaleImg(false);


    //console.log('var', componenti);
    const stampaComponentiPannello = componenti.map( componente => (
                                                        <ComponentePannello
                                                            key={componente.id} 
                                                            avviaModaleImg={avviaModaleImg}
                                                            id={componente.id} 
                                                            nome={componente.nome}
                                                            id_negozio={componente.id_negozio} 
                                                            url_immagine={componente.url_immagine} 
                                                        />
                                                    )
                                                )


    return (
        <Fragment>
            {/* {Modale immagine} */}
            <Modal open={aperturaModaleImg} onClose={chiudiModaleImg} basic closeIcon>
                <Modal.Content image>
                <Image wrapped size='medium' src={urlImgModale} centered />
                </Modal.Content>
            </Modal>

            <SezioneBoxed>
                <div className="w-100 mt6">
                    <Link to='/pannello-controllo/'>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow left' />
                            Torna al Pannello di Controllo
                        </Button>
                    </Link>

                    <h2 >Gestisci i tuoi componenti</h2>
                    {stampaComponentiPannello}
                </div>

            </SezioneBoxed>
            
            
            
        </Fragment>
    )
}

export default GestioneComponenti
