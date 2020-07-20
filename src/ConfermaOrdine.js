import React, { useEffect, useState } from 'react'

import { Icon, Step } from 'semantic-ui-react'
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

    const idOrdine = props.match.params.id_ordine;


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

    return (
        <div>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>
            <SezioneBoxed>
                <div className="mt6">
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
                </div>
                
            </SezioneBoxed>
        </div>
    )
}

export default ConfermaOrdine
