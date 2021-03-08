import React, { Fragment, useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'
import AzioniRapidePannelloControllo from './AzioniRapidePannelloControllo'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Menu, Table} from 'semantic-ui-react'
import ComponentePannello from './ComponentePannello';


const GestioneOrdini = () => {

    const [ordini, setOrdini] = useState([]);
    const [ urlImgModale, setUrlImgModale] = useState('');
    const [ aperturaModaleImg, setAperturaModaleImg ] = useState(false);
    //const [nome, setNome] = useState(['']);

    let history = useHistory();

    let randomNumber = Math.floor(1000 + Math.random() * 9000);

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/get_ordini_api/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
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
                setOrdini(json.get_ordini)
                    }
            );
        }

    }, [])

    const avviaModaleImg = (url) => {
        window.history.pushState('backPressed', null, null);
        window.history.pushState('dummy', null, null);
        window.addEventListener('popstate', chiudiModaleImg, { once: true });
        setAperturaModaleImg(true);
        setUrlImgModale("https://www.ordinasicuro.it/670914_920408/lib/img_componenti/img_componenti_compressed/"+url);
    }

    const chiudiModaleImg = () => setAperturaModaleImg(false);
    
    const stampaRigheTabella = ordini.filter( ordine => (ordine.confermato === '1'))
                                    .map( ordineFiltrato => {

                                        return (<Table.Row>
                                                    <Table.Cell collapsing>
                                                        <Icon name='paper plane' /> {ordineFiltrato.id}
                                                    </Table.Cell>
                                                    <Table.Cell>{ordineFiltrato.nome} {ordineFiltrato.cognome}</Table.Cell>
                                                    <Table.Cell>{ordineFiltrato.data_ora}</Table.Cell>
                                                    <Table.Cell collapsing textAlign='right'>
                                                        <Button onClick={() => {history.push('/info-ordine/'+ randomNumber + ordineFiltrato.id)}}>Visualizza Ordine</Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                        )

                                    })


    return (
        <Fragment>
            {/* {Modale immagine} */}
            <Modal open={aperturaModaleImg} onClose={chiudiModaleImg} basic closeIcon>
                <Modal.Content image>
                <Image wrapped size='medium' src={urlImgModale} centered />
                </Modal.Content>
            </Modal>

            <div className="w-100 flex flex-row items-start justify-center mt6">

                <div className="w-20 dn flex-l  justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <AzioniRapidePannelloControllo />
                </div>
                <div className="w-100 w-80-l">

                    <SezioneBoxed>
                        <div className="w-100">
                            <Link to='/pannello-controllo/'>
                                <Button icon labelPosition='left'>
                                    <Icon name='arrow left' />
                                    Torna al Pannello di Controllo
                                </Button>
                            </Link>

                            <h2 >Gestisci i tuoi ordini</h2>
                            <Table celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='4'>Ordini Ricevuti</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {stampaRigheTabella}
                                </Table.Body>
                            </Table>
                        </div>

                    </SezioneBoxed>

                </div>

            </div>
            
            
            
        </Fragment>
    )
}

export default GestioneOrdini
