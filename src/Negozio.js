import React, { useEffect, useState, Fragment } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import HeaderNegozio from './HeaderNegozio'
import ListaArticoli from './ListaArticoli'

const Negozio = (props) => {

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoli, setArticoli] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)

        fetch('https://ordinasicuro.it/index.php/api/negozio/' + props.match.params.id_negozio)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli);
                setComponentiArticolo(json.get_componenti_articolo);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                    }
            );
        
    }, []);

    return (

        <Fragment>
            <HeaderNegozio infoNegozio={infoNegozio} categorie={categorie} />
                <ListaArticoli idNegozio={props.match.params.id_negozio} articoli={articoli} categorieArticoli={categorieArticoli} componentiArticolo={componentiArticolo} associazioniComponenteArticolo={associazioniComponenteArticolo} />
                {/* <input type="submit" value="INVIA ORA" /> */}
                <Button animated fluid color="green" size="large" className="bottom-0" style={{"position" : "fixed"}} type="submit" form="form-articoli">
                  <Button.Content visible>Prosegui e vai al riepilogo <Icon name='arrow right' /></Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>
        </Fragment>    

    )
}

export default Negozio
