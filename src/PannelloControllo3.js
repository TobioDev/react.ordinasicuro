import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import LoaderOS from './LoaderOS';

import { Button, Icon, Menu, Dropdown, Input } from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';
import ListaArticoliPannello from './ListaArticoliPannello';
import SezioneBoxed from './SezioneBoxed';



const PannelloControllo3 = ({setLoggato}) => {

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
            setLoggato(true);
            fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setInfoUtenteNegozio(json.get_utente);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli);
                setArticoliFiltrati(json.get_articoli)
                setComponentiArticolo(json.get_componenti_articolo);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setVisibilitaLoader(false);
                console.log(json);
                setDatiRicevuti(true);
                    }
            );
        }
  
      }, [])

    const stampaListaArticoli = (v) => {

        if(v){
            return <ListaArticoliPannello idNegozio={JSON.parse(localStorage.getItem('infoUtente')).id_negozio} abbonamentoUtente={infoUtenteNegozio.livello} articoli={articoliFiltrati} categorieArticoli={categorieArticoli} componentiArticolo={componentiArticolo} associazioniComponenteArticolo={associazioniComponenteArticolo} />
        }

    }

      useEffect(()=>{
        if(localStorage.getItem('posizionePannello') !== null){
            console.log('mo scrollo');
            window.scrollTo(0, localStorage.getItem('posizionePannello') );
        }
      })

      const historyPush = (indirizzo) => history.push(indirizzo);

      const stampaSubmenuCategorieDesktop = categorieArticoli => (
        categorieArticoli.map( categoria => 
                                <Menu.Item as={Link}
                                    key={categoria.id}
                                    to={"#categoria-"+categoria.nome}  
                                    name= {categoria.nome}
                                >
                                    {categoria.nome}
                                </Menu.Item>)
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
        //console.log(e.target.value);
       
    }

    return (
    
        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>

            <div className="w-100 flex flex-row items-start justify-center mt6">
                <div className="w-20 dn flex-l items-start justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <Menu vertical>
                        <Menu.Item active><b className="f3">Categorie</b></Menu.Item>
                        {stampaSubmenuCategorieDesktop(categorieArticoli)}  
                    </Menu>
                </div>
                <div className="w-100 w-80-l">
                    <div className="w-100 flex flex-column items-end justify-end ph2 pt2 dn-l" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        <Input icon placeholder='Cerca...' className="" >
                            <input onChange={handleRicerca} />
                            <Icon name='search' />
                        </Input>  
                        <Dropdown
                            placeholder='Vai alla categoria...'
                            className="dn-l mt2"
                            onChange={handleChange}
                            selection
                            options={opzioniCategorieMobile(categorieArticoli)}
                        />  
                    </div>
                    
                    <div className="w-100 flex-l flex-column dn items-center justify-end pr2 pt2 pl2 bg-white" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        <Button.Group widths='5' >
                            <Button positive onClick={() => historyPush('/aggiungi-articolo/')}>Aggiungi Prodotto</Button>
                            <Button>Gestisci Ordini</Button>
                            <Button color="yellow" style={{color: "black"}} onClick={() => historyPush('/gestione-categorie/')}>Gestisci Categorie</Button>
                            <Button color="blue" onClick={() => historyPush('/gestione-componenti/')}>Gestisci Componenti</Button>
                            <Button onClick={() => historyPush('/gestione-profilo/')}>Gestisci il tuo Profilo</Button>
                        </Button.Group>
                        <Input placeholder='Cerca...' className="mt2 w-100" >
                            <input  onChange={handleScritturaRicerca}/>
                            <Icon onClick={() => handleRicerca(parolaRicerca)} name='search' inverted circular link />
                        </Input>
                    </div>

                    {stampaListaArticoli(datiRicevuti)}
                </div>

            </div>

        </Fragment>

    )
}

export default PannelloControllo3