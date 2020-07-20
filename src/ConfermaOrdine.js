import React, { useEffect, useState, Fragment } from 'react'

import { Icon, Step, List } from 'semantic-ui-react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import LoaderOS from './LoaderOS'
import SezioneBoxed from './SezioneBoxed';

const ConfermaOrdine = (props) => {
    
    const [infoNegozio, setInfoNegozio] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoliOrdinati, setArticoliOrdinati] = useState([]);
    const [infoArticoliOrdinati, setInfoArticoliOrdinati] = useState([]);
    const [visibilitaLoader, setVisibilitaLoader] = useState(true);

    const idOrdine = props.match.params.id_ordine              


    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/index.php/api/info_ordine/' + idOrdine)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setArticoliOrdinati(json.get_articoli_ordinati);
                setInfoArticoliOrdinati(json.get_info_articoli_ordinati);
                setCategorieArticoli(json.get_categorie_articoli);
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setVisibilitaLoader(false)
                console.log(json);
                    }
            );

    }, []);

    const stampaElementiRiassunto = articoliOrdinati
                                    .map( articoloOrdinato => 
                                        <div>
                                            {infoArticoliOrdinati.filter(infoArticoloOrdinato => articoloOrdinato.id_articolo === infoArticoloOrdinato.id)
                                                                .map(infoArticoloFiltrato => 
                                                                <List.Item>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header >{infoArticoloFiltrato.nome}</List.Header>
                            <List.Description>{"Quantità: " + articoloOrdinato.quantita}</List.Description>
                        </List.Content>
                    </List.Item>
                )}
                                        </div>
                                   
    );  

    return (
        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>
            <SezioneBoxed className="mt6">
                <Step.Group stackable="tablet" size="tiny">
                    <Step completed>
                        <Icon name='credit card' />
                        <Step.Content>
                            <Step.Title>Scegli</Step.Title>
                            <Step.Description>Scegli cosa vuoi ordinare</Step.Description>
                        </Step.Content>
                    </Step>
                    <Step active>
                        <Icon name='clipboard check' />
                        <Step.Content>
                            <Step.Title>Conferma il tuo Ordine</Step.Title>
                            <Step.Description>Verifica le informazioni che hai inserito</Step.Description>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </SezioneBoxed>
            <SezioneBoxed className="mt4">
                <div className="w-100 flex items-start">
                    <List divided relaxed>
                        {stampaElementiRiassunto}
                    </List>
                </div>
                

            </SezioneBoxed>    
        </Fragment>
    )
}

export default ConfermaOrdine
