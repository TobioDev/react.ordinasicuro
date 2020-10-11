import React, { useState, Fragment, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import LoaderOS from './LoaderOS';

const PannelloControllo = ({}) => {

    const [visibilitaLoader, setVisibilitaLoader] = useState(true);

    const [infoNegozio, setInfoNegozio] = useState([]);
    const [infoUtenteNegozio, setInfoUtenteNegozio] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [categorieArticoli, setCategorieArticoli] = useState([]);
    const [articoli, setArticoli] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);

    let history = useHistory();

    useEffect(() => {

        if(localStorage.getItem('infoUtente') === null){
          
            localStorage.removeItem('infoUtente');
            history.push("/login/");
  
        }
        else{
            fetch('https://ordinasicuro.it/index.php/api/negozio/' + JSON.parse(localStorage.getItem('infoUtente')).id_negozio )
            .then(response => response.json())
            .then(json => {
                setInfoNegozio(json.get_negozio);
                setInfoUtenteNegozio(json.get_utente);
                setCategorie(json.get_categorie);
                setCategorieArticoli(json.get_categorie_articoli);
                setArticoli(json.get_articoli);
                setComponentiArticolo(json.get_componenti_articolo);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                setVisibilitaLoader(false);
                console.log(json);
                    }
            );
        }
  
      }, [])

    return (
    
        <Fragment>
            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>

        </Fragment>

    )
}

export default PannelloControllo