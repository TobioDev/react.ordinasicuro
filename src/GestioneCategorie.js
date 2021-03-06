import React, { Fragment, useEffect, useState } from 'react'
import SezioneBoxed from './SezioneBoxed'
import AzioniRapidePannelloControllo from './AzioniRapidePannelloControllo'

import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from "react-router-dom";

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Menu} from 'semantic-ui-react'
import ComponentePannello from './ComponentePannello';
import CategoriaPannello from './CategoriaPannello';


const GestioneCategorie = () => {

    const [categorie, setCategorie] = useState([]);

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){

            localStorage.removeItem('infoUtente');
            history.push("/login/");

        }
        else{
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/categorie_articoli_da_negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
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
                setCategorie(json.get_categorie_articoli);
                    }
            );
        }

    }, [])


    const stampaCategoriePannello = categorie.map( categoria => (
                                                        <CategoriaPannello
                                                            key={categoria.id} 
                                                            id={categoria.id} 
                                                            nome={categoria.nome}
                                                            id_negozio={categoria.id_negozio}
                                                            posizione={categoria.ordine} 
                                                        />
                                                    )
                                                )


    return (
        <Fragment>

            <div className="w-100 flex flex-row items-start justify-center mt6">

                <div className="w-20 dn flex-l  justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <AzioniRapidePannelloControllo />
                </div>
                <div className="w-100 w-80-l">

                <SezioneBoxed>
                    <div className="w-100">
                    <Button.Group vertical labeled icon>
                        <Link to='/pannello-controllo/' className="mb3">
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna al Pannello di Controllo
                            </Button>
                        </Link>
                        <Button positive onClick={()=>history.push("/aggiungi-categoria/")} icon='plus' content='Aggiungi nuova Categoria' />
                    </Button.Group>
                        

                        <h2 >Gestisci le tue Categorie</h2>
                        {stampaCategoriePannello}
                    </div>

                </SezioneBoxed>

                </div>

            </div>
            
            
            
        </Fragment>
    )
}

export default GestioneCategorie
