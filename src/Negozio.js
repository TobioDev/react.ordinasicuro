import React, { useEffect, useState, Fragment } from 'react'

import HeaderNegozio from './HeaderNegozio'
import ListaArticoli from './ListaArticoli'

const Negozio = (props) => {

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoli, setArticoli] = useState([]);

    useEffect(() => {
        fetch('https://ordinasicuro.it/index.php/api/negozio/' + props.match.params.id_negozio)
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli);
                    }
            );
        
        window.scrollTo(0, 0)
        
    }, []);

    return (

        <Fragment>
            <HeaderNegozio infoNegozio={infoNegozio} categorie={categorie} />
            <form id="lista_articoli">
                <ListaArticoli articoli={articoli} categorieArticoli={categorieArticoli} />
            </form>
        </Fragment>    

    )
}

export default Negozio
