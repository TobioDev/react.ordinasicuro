import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import LoaderOS from './LoaderOS';

import { Button, Icon, Menu, Dropdown, Input, List, Image } from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';
import ListaArticoliPannello from './ListaArticoliPannello';
import SezioneBoxed from './SezioneBoxed';



const PannelloControllo = ({setLoggato}) => {

    const [visibilitaLoader, setVisibilitaLoader] = useState(true);
    const [datiRicevuti, setDatiRicevuti] = useState(false);

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [infoUtenteNegozio, setInfoUtenteNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [categorieArticoliFiltrate, setCategorieArticoliFiltrate] = useState([]);
    const [articoli, setArticoli] = useState([]);
    const [articoliFiltrati, setArticoliFiltrati] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);

    const [parolaRicerca, setParolaRicerca] = useState('');

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
          
            localStorage.removeItem('infoUtente');
            history.push("/login/");
  
        }
        else{
            setLoggato(true);
            fetch('https://ordinasicuro.it/index.php/api/categorie_articoli_da_negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
            .then(response => response.json())
            .then(json => {
                // setInfoNegozio(json.get_negozio);
                // setInfoUtenteNegozio(json.get_utente);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setCategorieArticoliFiltrate(json.get_categorie_articoli);
                // setArticoli(json.get_articoli);
                // setArticoliFiltrati(json.get_articoli)
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setVisibilitaLoader(false);
                console.log(json);
                //setDatiRicevuti(true);
                    }
            );
        }
  
      }, [])

    const stampaListaArticoli = (v) => {

        if(v){
            return <ListaArticoliPannello idNegozio={JSON.parse(localStorage.getItem('infoUtente')).id_negozio} abbonamentoUtente={infoUtenteNegozio.livello} articoli={articoliFiltrati} categorieArticoli={categorieArticoli} componentiArticolo={componentiArticolo} associazioniComponenteArticolo={associazioniComponenteArticolo} />
        }

    }

    // useEffect(()=>{
    //     if(localStorage.getItem('posizionePannello') !== null){
    //         console.log('mo scrollo');
    //         window.scrollTo(0, localStorage.getItem('posizionePannello') );
    //     }
    // })

    const historyPush = (indirizzo) => history.push(indirizzo);

    const azzeraPosizioneCategoria = () => {
        localStorage.setItem('posizioneCategoria', '0');
    }


    const stampaItemListaCategorie = categorie => (
        categorie.map ( categoria => 
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button onClick={() => {azzeraPosizioneCategoria(); history.push('/gestione-articoli-categoria/'+categoria.id)}}>Visualizza Articoli</Button>
                                    </List.Content>
                                    
                                    <List.Content><h3>{categoria.nome}</h3></List.Content>
                                    </List.Item>
        )
    )

    const opzioniCategorieMobile = (categorieArticoli) => {
        let arrayOpzioniCategorie = [];
        categorieArticoli.map( categoria => arrayOpzioniCategorie.push({
                                                                    key: categoria.id,
                                                                    text: categoria.nome,
                                                                    value: categoria.nome
                                                                }
                                                                ))
        return arrayOpzioniCategorie;
    }

    const handleChange = (e, { value }) => {
        var elmnt = document.getElementById("categoria-"+value);
        elmnt.scrollIntoView();
    }

    const handleScritturaRicerca = (e) => {
        setParolaRicerca(e.target.value);
    }

    const handleRicerca = (termine) => {
        if(termine === ""){
            setArticoliFiltrati(articoli);
            window.scrollTo(0,0);
        }
        else{
            let arrayTemporaneo = articoli.filter(articolo => articolo.nome.toLowerCase().includes(termine.toLowerCase()) );
            setArticoliFiltrati(arrayTemporaneo);
            window.scrollTo(0,0);
        }
    }

    const handleRicercaCategorie = (termine) => {
        if(termine === ""){
            setCategorieArticoliFiltrate(categorieArticoli);
            window.scrollTo(0,0);
        }
        else{
            let arrayTemporaneo = categorieArticoli.filter(categoria => categoria.nome.toLowerCase().includes(termine.toLowerCase()) );
            setCategorieArticoliFiltrate(arrayTemporaneo);
            window.scrollTo(0,0);
        }
    }

    return (
    
        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>

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
                    <div className="w-100 flex flex-column items-end justify-end ph2 pt2 dn-l" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        <Input onChange={(e) => handleRicercaCategorie(e.target.value)} icon='search' placeholder='Cerca...' className="mt2" /> 
                        {/* <Dropdown
                            placeholder='Vai alla categoria...'
                            className="dn-l mt2"
                            onChange={handleChange}
                            selection
                            options={opzioniCategorieMobile(categorieArticoli)}
                        />   */}
                    </div>
                    
                    <div className="w-100 flex-l flex-column dn items-center justify-end pr2 pt2 pl2 bg-white" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        {/* <Button.Group widths='5' >
                            <Button positive onClick={() => historyPush('/aggiungi-articolo/')}>Aggiungi Prodotto</Button>
                            <Button>Gestisci Ordini</Button>
                            <Button color="yellow" style={{color: "black"}} onClick={() => historyPush('/gestione-categorie/')}>Gestisci Categorie</Button>
                            <Button color="blue" onClick={() => historyPush('/gestione-componenti/')}>Gestisci Componenti</Button>
                            <Button onClick={() => historyPush('/gestione-profilo/')}>Gestisci il tuo Profilo</Button>
                        </Button.Group> */}
                        <Input onChange={(e) => handleRicercaCategorie(e.target.value)} icon='search' placeholder='Cerca...' className="mt2 w-100" />
                    </div>
                    <SezioneBoxed>
                        <div className="w-100">
                            <h2>Seleziona quale categoria visualizzare:</h2>
                            <List divided verticalAlign='middle'>
                                {stampaItemListaCategorie(categorieArticoliFiltrate)}
                            </List>
                        </div>
                        
                    </SezioneBoxed>
                    
                </div>

            </div>

        </Fragment>

    )
}

export default PannelloControllo