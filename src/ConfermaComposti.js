import React, { useState, useEffect } from 'react'

const ConfermaComposti = (props) => {

    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/index.php/api/info_componenti/' + props.match.params.id_ordine)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                console.log(props.match.params.id_negozio)
                // setInfoNegozio(json.get_negozio);
                // setCategorie(json.get_categorie);
                // setCategorieArticoli(json.get_categorie_articoli);
                // setArticoli(json.get_articoli);
                // setComponentiArticolo(json.get_componenti_articolo);
                // setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo);
                // setVisibilitaLoader(false)
                    }
            );

    }, []);

    return (
        <div>
            
        </div>
    )
}

export default ConfermaComposti
