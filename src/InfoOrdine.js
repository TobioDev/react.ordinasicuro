import React, { useEffect, useState, Fragment } from 'react'
import SezioneBoxed from './SezioneBoxed'

import { Button, Form, Input, TextArea, Label, Dropdown, Image, Select, Modal, Header, Icon, Table, List} from 'semantic-ui-react'

import { useHistory } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

const InfoOrdine = (props) => {

    const [open, setOpen] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    const [ordine, setOrdine] = useState([]);
    const [articoliOrdinati, setArticoliOrdinati] = useState([]);
    const [articoliNegozio, setArticoliNegozio] = useState([]);
    const [componenti, setComponenti] = useState([]);
    const [associazioniOrdineComponenteArticolo, setAssociazioniOrdineComponenteArticolo] = useState([]);
    const [nome, setNome] = useState(['']);
    const [idComponente, setIdComponente] = useState(['']);

    window.scrollTo(0,0);

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
            localStorage.removeItem('infoUtente');
            history.push("/login/");
        }
        else{
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/info_ordine_api/' + props.match.params.id_ordine )
            .then(response => response.json())
            .then(json => {
                setOrdine(json.get_ordine);
                setArticoliOrdinati(json.get_articoli_ordinati);
                setArticoliNegozio(json.get_articoli_da_negozio);
                setComponenti(json.get_componenti);
                setAssociazioniOrdineComponenteArticolo(json.get_associazioni_ordine_componente_articolo);
                console.log(json);
            
            })
        }
        
  
    }, [])

                                                // <Table.Row>
                                                //     <Table.Cell>{ordineFiltrato.nome} {ordineFiltrato.cognome}</Table.Cell>
                                                //     <Table.Cell>{ordineFiltrato.data_ora}</Table.Cell>
                                                //     <Table.Cell collapsing textAlign='right'>
                                                //         <Button onClick={() => {history.push('/info-ordine/'+ randomNumber + ordineFiltrato.id)}}>Visualizza Ordine</Button>
                                                //     </Table.Cell>
                                                // </Table.Row>

    const stampaArticoliOrdinati = articoliOrdinati.map( articoloOrdinato => (
        <Table.Row>
        {
            articoliNegozio.filter(articoloNegozio => articoloNegozio.id === articoloOrdinato.id_articolo)
            .map(articoloNegozioFiltrato => {
                let testoComponentiFinale = '';
                if(articoloNegozioFiltrato.tipologia==='composto'){
                    for (let index = 1; index <= articoloOrdinato.quantita; index++) {
                        let testoComponenti = '';
                        associazioniOrdineComponenteArticolo.filter( associazioneFiltrata => {
                            // console.log('condizione1', associazioneFiltrata.id_articolo === articoloNegozioFiltrato.id)
                            // console.log('condizione2', associazioneFiltrata.replica === index)
                            console.log('assIdArticolo', associazioneFiltrata.id_articolo)
                            console.log('artFiltrID', articoloNegozioFiltrato.id )
                            console.log('index', typeof( index) )
                            console.log('replica', typeof(associazioneFiltrata.replica) )



                            return associazioneFiltrata.id_articolo === articoloNegozioFiltrato.id && associazioneFiltrata.replica === index.toString()

                        })
                                                        .map(associazioneFiltrata => {
                                                            componenti.filter(componente => componente.id === associazioneFiltrata.id_componente)
                                                                        .map(componenteFiltrato => {
                                                                            testoComponenti += componenteFiltrato.nome + ',';
                                                                            console.log('testoComponenti', testoComponenti)
                                                                        })
                                                        })
                        testoComponentiFinale = <Fragment> {testoComponentiFinale}<List.Item><List.Content><List.Header>{index}</List.Header><List.Description>{testoComponenti}</List.Description></List.Content></List.Item></Fragment>;
                        
                    }
                }
                return (
                    <Fragment>
                        <Table.Cell>{articoloOrdinato.quantita} {articoloNegozioFiltrato.unita_misura}</Table.Cell>
                        <Table.Cell>{articoloNegozioFiltrato.nome} (€ {articoloNegozioFiltrato.prezzo})</Table.Cell>
                        <Table.Cell>
                            <List bulleted>
                                {testoComponentiFinale}
                            </List>
                        </Table.Cell>
                        <Table.Cell>€ {articoloNegozioFiltrato.prezzo*articoloOrdinato.quantita}</Table.Cell>
                    </Fragment>
                    
                )
            })
        }
        </Table.Row>
    ))

    //////////////

    // {

        

////////////////////

    return (
        <Fragment>
            <div className="mt6">

                <SezioneBoxed>
                    <div className="w-100">
                        <Link to='/gestione-ordini/'>
                            <Button icon labelPosition='left'>
                                <Icon name='arrow left' />
                                Torna a Gestione Ordini
                            </Button>
                        </Link>
                        
                        <h2>Info Ordine {ordine.id}</h2>
                        <p><h3>Tipologia consegna:</h3> {ordine.tipologia_consegna}</p>
                        <p><h3>Data e ora dell'ordine:</h3> {ordine.data_ora}</p>
                        <p>{ordine.nome} {ordine.cognome}</p>
                        <p>{ordine.indirizzo}</p>
                        <p><a href={"mailto:"+ordine.email}>{ordine.email}</a></p>
                        <p><a href={"tel:0039"+ordine.telefono}>{ordine.telefono}</a></p>
                        {() => {if(ordine.orario_consegna !== ''){return <p><h3>Orario preferito (se indicato):</h3> {ordine.orario_consegna}</p>}}}
                        <Table celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='4'>Prodotti Ordinati</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {stampaArticoliOrdinati}
                            </Table.Body>
                        </Table>
                        
                        
                    </div>

                </SezioneBoxed>
                
                
            </div>

        </Fragment>
        
    )
}

export default InfoOrdine