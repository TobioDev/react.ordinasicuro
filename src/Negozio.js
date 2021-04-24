import React, { useEffect, useState, Fragment } from 'react'
import { Button, Icon, Menu, Dropdown } from 'semantic-ui-react'

import { HashLink as Link } from 'react-router-hash-link';

import HeaderNegozio from './HeaderNegozio'
import ListaArticoli from './ListaArticoli'
import LoaderOS from './LoaderOS';

const Negozio = (props) => {

    const [visibilitaLoader, setVisibilitaLoader] = useState(true);

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [infoUtenteNegozio, setInfoUtenteNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoli, setArticoli] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);
    // const [asporto, setAsporto] = useState(0);
    // const [numeroFasceDomicilio, setNumeroFasceDomicilio] = useState([]);
    const [ordiniAttivi, setOrdiniAttivi] = useState(0);


    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/negozio/' + props.match.params.id_negozio)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setInfoUtenteNegozio(json.get_utente);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli);
                setComponentiArticolo(json.get_componenti_articolo);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                // setNumeroFasceDomicilio(json.get_fasce_domicilio);
                // setAsporto(json.get_asporto);  
                setOrdiniAttivi(json.ordini_attivi);  
                setVisibilitaLoader(false)
                    }
            );

    }, []);

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

    const stampaBottoneProsegui = () => {
        console.log(infoUtenteNegozio.livello)
        if(infoUtenteNegozio.livello!=='2' && infoUtenteNegozio.livello!=='0' && ordiniAttivi===1){
            return (
                <Button animated fluid color="green" size="large" className="bottom-0" style={{"position" : "fixed"}} type="submit" form="form-articoli">
                    <Button.Content visible>Prosegui e vai al riepilogo <Icon name='arrow right' /></Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            )
            
        }
    }

    return (

        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>
            <HeaderNegozio infoNegozio={infoNegozio} categorie={categorie} infoUtenteNegozio={infoUtenteNegozio} />
            <div className="w-100 flex flex-row items-start justify-center">
                <div className="w-20 dn flex-l items-start justify-center pt6 pl2" style={{'position' : "sticky", "top" : "0"}}>
                    <Menu vertical>
                        <Menu.Item active><b className="f3">Categorie</b></Menu.Item>
                        {stampaSubmenuCategorieDesktop(categorieArticoli)}  
                    </Menu>
                </div>
                <div className="w-100 w-80-l">
                    <div className="w-100 flex items-center justify-end pr2 pt2 dn-l" style={{"position" : "sticky", "top" : "100px", "zIndex":'1'}}>
                        <Dropdown
                            placeholder='Vai alla categoria...'
                            className="dn-l"
                            onChange={handleChange}
                            selection
                            options={opzioniCategorieMobile(categorieArticoli)}
                        />    
                    </div>
                    
                    <ListaArticoli
                        idNegozio={props.match.params.id_negozio}
                        abbonamentoUtente={infoUtenteNegozio.livello}
                        articoli={articoli}
                        categorieArticoli={categorieArticoli}
                        componentiArticolo={componentiArticolo}
                        associazioniComponenteArticolo={associazioniComponenteArticolo}
                        ordiniAttivi={ordiniAttivi}
                    />
                </div>

            </div>
            
            
            
                {/* <input type="submit" value="INVIA ORA" /> */}
            {stampaBottoneProsegui()}
            
        </Fragment>    

    )
}

export default Negozio
