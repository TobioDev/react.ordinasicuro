import React, { Fragment, useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Menu} from 'semantic-ui-react'
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
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/componenti_articoli_da_negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
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
        setUrlImgModale("https://www.ordinasicuro.it/670914_920408/lib/img_componenti/img_componenti_compressed/"+url);
    }

    const chiudiModaleImg = () => setAperturaModaleImg(false);


    //console.log('var', componenti);
    const stampaComponentiPannello = componenti.map( componente => (
                                                        <ComponentePannello
                                                            key={componente.id} 
                                                            avviaModaleImg={avviaModaleImg}
                                                            id={componente.id} 
                                                            nome={componente.nome}
                                                            visibilita={componente.visibilita}
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

            <div className="w-100 flex flex-row items-start justify-center mt6">

                <div className="w-20 dn flex-l  justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <Menu vertical>
                        <Menu.Item active><b className="f3">Azioni Rapide</b></Menu.Item>
                        {/* {stampaSubmenuCategorieDesktop(categorieArticoli)} */}
                        <Menu.Item as={Link}
                                    key={'pannello-controllo'}
                                    to={'/pannello-controllo'}  
                                    name= 'Pannello Controllo'
                                >
                                    Home <Icon name='home' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'aggiungi-prodotto'}
                                    to={'/aggiungi-articolo'}  
                                    name= 'Aggiungi Articolo'
                                >
                                    Aggiungi Prodotto <Icon name='plus' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-ordini'}
                                    to={'/gestione-ordini'}  
                                    name= 'Gestione Ordini'
                                >
                                    Gestione Ordini <Icon name='paper plane' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-categorie'}
                                    to={'/gestione-categorie'}  
                                    name= 'Gestione Categorie'
                                >
                                    Gestione Categorie <Icon name='list' />
                        </Menu.Item>
                        <Menu.Item as={Link}
                                    key={'gestione-componenti'}
                                    to={'/gestione-componenti'}  
                                    name= 'Gestione Componenti'
                                >
                                    Gestione Componenti <Icon name='chart pie' />
                        </Menu.Item>  
                    </Menu>
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

                            <h2 >Gestisci i tuoi componenti</h2>
                            {stampaComponentiPannello}
                        </div>

                    </SezioneBoxed>

                </div>

            </div>
            
            
            
        </Fragment>
    )
}

export default GestioneComponenti
