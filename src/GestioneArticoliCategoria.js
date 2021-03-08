import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import LoaderOS from './LoaderOS';

import { Button, Icon, Menu, Dropdown, Input } from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';
import ListaArticoliPannello from './ListaArticoliPannello';
import SezioneBoxed from './SezioneBoxed';
import AzioniRapidePannelloControllo from './AzioniRapidePannelloControllo';



const GestioneArticoliCategoria = (props) => {

    window.scrollTo(0,0);

    const [visibilitaLoader, setVisibilitaLoader] = useState(true);
    const [datiRicevuti, setDatiRicevuti] = useState(false);

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [infoUtenteNegozio, setInfoUtenteNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
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
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/articoli_da_categoria/' + props.match.params.id_categoria_articolo )
            .then(response => response.json())
            .then(json => {
                // setInfoNegozio(json.get_negozio);
                // setInfoUtenteNegozio(json.get_utente);
                // setCategorie(json.get_categorie);
                // setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli_da_categoria);
                setArticoliFiltrati(json.get_articoli_da_categoria);
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setVisibilitaLoader(false);
                console.log(json);
                setDatiRicevuti(true);
                    }
            );
        }
  
      }, [])

    const stampaListaArticoli = (v) => {

        if(v){
            return <ListaArticoliPannello idNegozio={JSON.parse(localStorage.getItem('infoUtente')).id_negozio} articoli={articoliFiltrati} />
        }

    }

      useEffect(()=>{
        if(localStorage.getItem('posizioneCategoria') !== null && localStorage.getItem('ultimaCategoria') !== null && props.match.params.id_categoria_articolo === localStorage.getItem('ultimaCategoria')){
            //console.log('mo scrollo');
            window.scrollTo(0, localStorage.getItem('posizioneCategoria') );
        }
        else{
            window.scrollTo(0,0);
        }
      })

      const historyPush = (indirizzo) => history.push(indirizzo);


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
        //console.log(e.target.value);
       
    }

    return (
    
        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>

            <div className="w-100 flex flex-row items-start justify-center mt6">
            <div className="w-20 dn flex-l items-start justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <AzioniRapidePannelloControllo />
                </div>
                <div className="w-100 w-80-l">
                    <div className="w-100 flex flex-column items-end justify-end ph2 pt2 dn-l" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        <Input onChange={(e) => handleRicerca(e.target.value)} icon='search' placeholder='Cerca...' className="mt2" /> 
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
                        <Input onChange={(e) => handleRicerca(e.target.value)} icon='search' placeholder='Cerca...' className="mt2 w-100" />
                    </div>
                    <SezioneBoxed>
                        <div className="w-100">
                            <Link to='/pannello-controllo/'>
                                <Button icon labelPosition='left'>
                                    <Icon name='arrow left' />
                                    Torna al Pannello di Controllo
                                </Button>
                            </Link>
                            <h2>Articoli della categoria selezionata:</h2>
                            {stampaListaArticoli(datiRicevuti)}
                        </div>

                    </SezioneBoxed>

                </div>

            </div>

        </Fragment>

    )
}

export default GestioneArticoliCategoria