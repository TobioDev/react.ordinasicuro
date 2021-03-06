import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from "react-router-dom";

import { Icon, Step, List, Header } from 'semantic-ui-react'

import LoaderOS from './LoaderOS'
import SezioneBoxed from './SezioneBoxed';
import ItemRiepilogoOrdine from './ItemRiepilogoOrdine';
import ModuloInvioOrdine from './ModuloInvioOrdine';

import moment from 'moment';

const ConfermaOrdine = (props) => {
    
    const [infoNegozio, setInfoNegozio] = useState([]);
    const [infoOrdine, setInfoOrdine] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoliOrdinati, setArticoliOrdinati] = useState([]);
    const [infoArticoliOrdinati, setInfoArticoliOrdinati] = useState([]);
    const [visibilitaLoader, setVisibilitaLoader] = useState(true);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);
    const [associazioniOrdineComponenteArticolo, setAssociazioniOrdineComponenteArticolo] = useState([]);
    const [fasceDomicilio, setFasceDomicilio] = useState([]);

    const idOrdine = props.match.params.id_ordine
    
    var arrayOrariDomicilio = [];
    var arrayOrariAsporto = [];

    let prezzoTotaleOrdine = 0;

    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/info_ordine/' + idOrdine)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setInfoOrdine(json.get_ordine);
                setArticoliOrdinati(json.get_articoli_ordinati);
                setInfoArticoliOrdinati(json.get_info_articoli_ordinati);
                setCategorieArticoli(json.get_categorie_articoli);
                setComponentiArticolo(json.get_componenti_articolo);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setAssociazioniOrdineComponenteArticolo(json.get_associazioni_ordine_componente_articolo);
                setFasceDomicilio(json.get_fasce_domicilio);
                setVisibilitaLoader(false)
                console.log(json);

                }
            );

    }, []);

    console.log({fasceDomicilio})
    if(fasceDomicilio.length>0){

        let giorno_settimana_numero = moment().isoWeekday()
        console.log({giorno_settimana_numero})

        fasceDomicilio
            .filter( fascia =>{return fascia[giorno_settimana_numero] === '1'})
            .map( fascia_filtrata => {

                let start = moment(fascia_filtrata.inizio,"HH:mm:ss");
                let end = moment(fascia_filtrata.fine,"HH:mm:ss");

                //ORO COLATO
                //###################################
                do {
                    arrayOrariDomicilio.push(moment(start).format('HH:mm'));
                } while (start.add(30, 'minutes').diff(end) <= 0);
                //######################

        })

    }
    // else{

    //     let start = moment('00:00:00',"HH:mm:ss");
    //     let end = moment("23:59:00","HH:mm:ss");

    //     //ORO COLATO
    //     //###################################
    //     do {
    //         arrayOrariDomicilio.push(moment(start).format('HH:mm'));
    //     } while (start.add(30, 'minutes').diff(end) <= 0);
    //     //######################

    // }

    //metto le ore nell'array in ordine crescente
    arrayOrariDomicilio = arrayOrariDomicilio.sort();
    

    //per ora nell'asporto metto tutte e 24 le ore
    let start_asporto = moment('00:00:00',"HH:mm:ss");
    let end_asporto = moment("23:59:00","HH:mm:ss");

    //ORO COLATO
    //###################################
    do {
        arrayOrariAsporto.push(moment(start_asporto).format('HH:mm'));
    } while (start_asporto.add(30, 'minutes').diff(end_asporto) <= 0);
    //######################

    //metto le ore nell'array in ordine crescente
    arrayOrariAsporto = arrayOrariAsporto.sort();

    

    const stampaElementiRiassunto = articoliOrdinati
                                    .map( articoloOrdinato => 
                                        <Fragment key={articoloOrdinato.id}>
                                            {infoArticoliOrdinati.filter(infoArticoloOrdinato => articoloOrdinato.id_articolo === infoArticoloOrdinato.id)
                                                                .map(infoArticoloFiltrato => {
                                                                    prezzoTotaleOrdine += (articoloOrdinato.quantita*infoArticoloFiltrato.prezzo);
                                                                    let associazioniOrdine = associazioniOrdineComponenteArticolo.filter( associazione => associazione.id_articolo === articoloOrdinato.id_articolo)
                                                                    return (
                                                                        <ItemRiepilogoOrdine key={articoloOrdinato.id} articoloOrdinato={articoloOrdinato} infoArticoloFiltrato={infoArticoloFiltrato} componentiArticolo={componentiArticolo} associazioniOrdineComponenteArticolo = {associazioniOrdine}  />
                                                                    )
                                                                }
                                                                )}
                                        </Fragment>
    );  

    let history = useHistory();

    //console.log(infoOrdine.confermato);

    if(infoOrdine.confermato==='1'){
        
        history.push("/negozio/"+infoNegozio.id);
        return null;
    }
    else{

        return (
            <Fragment>
                <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>
                <SezioneBoxed className="mt6">
                    <Step.Group stackable="tablet" size="tiny">
                        <Step completed >
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
                <SezioneBoxed className="mt2">
                    <Header as='h3' block textAlign="center" className="w-100">
                        IL TUO ORDINE
                    </Header>
                    <h3 className="mt0">{infoNegozio.nome} - {infoNegozio.citta}</h3>
                    <div className="w-100 flex flex-column items-start mt3">
                        <List divided relaxed>
                            {stampaElementiRiassunto}
                        </List>
                        <h2 className="mt1">Totale: € {(prezzoTotaleOrdine*1).toFixed(2)}</h2>
                    </div>
                    <Header as='h3' block textAlign="center" className="w-100">
                        COMPLETA L'ORDINE CON I TUOI DATI
                    </Header>
                    <ModuloInvioOrdine 
                        infoNegozio={infoNegozio} 
                        idOrdine={idOrdine} 
                        arrayOrariDomicilio = {arrayOrariDomicilio}
                        arrayOrariAsporto = {arrayOrariAsporto}
                        fasceDomicilio = {fasceDomicilio}
                    />
                </SezioneBoxed>    
            </Fragment>
        )

    }

    
}

export default ConfermaOrdine
