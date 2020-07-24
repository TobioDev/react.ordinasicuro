import React, { useState, useEffect } from 'react'

import { Dropdown } from 'semantic-ui-react'

const ConfermaComposti = (props) => {

    const [associazioniComponenteArticolo, setAssociazioniComponenteArticolo] = useState([]);
    const [componentiArticolo, setComponentiArticolo] = useState([]);
    const [articoliOrdinatiComposti, setArticoliOrdinatiComposti] = useState([]);
    const [articoliComposti, setArticoliComposti] = useState([]);

    useEffect(() => {

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/index.php/api/info_componenti/' + props.match.params.id_ordine)
            .then(response => response.json())
            .then(json => {
                setComponentiArticolo(json.get_componenti_articolo_da_negozio);
                setAssociazioniComponenteArticolo(json.get_associazioni_componente_articolo_da_negozio);
                setArticoliOrdinatiComposti(json.get_articoli_ordinati_composti);
                setArticoliComposti(json.get_articoli_composti_da_articoli_ordinati);
                console.log(json)
                console.log(props.match.params.id_ordine)
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

    const stampaSelectComponenti = articoliOrdinatiComposti
                                    .map( articoloOrdinatoComposto => {
                                        console.log('ciao2')
                                        var arrayOpzioniComponenti = [];
                                        articoliComposti
                                            .filter( articoloComposto => articoloComposto.id === articoloOrdinatoComposto.id_articolo)
                                            .map(articoloCompostoFiltrato => {
                                                                            console.log('ciao3')
                                                                            associazioniComponenteArticolo
                                                                                .filter( associazioneComponenteArticolo => associazioneComponenteArticolo.id_articolo === articoloCompostoFiltrato.id)
                                                                                .map( associazioneComponenteArticoloFiltrato => {
                                                                                                                                    console.log('ciao4')
                                                                                                                                    componentiArticolo
                                                                                                                                    .filter( componenteArticolo => componenteArticolo.id === associazioneComponenteArticoloFiltrato.id_componente)
                                                                                                                                    .map(componenteFiltrato => {
                                                                                                                                        console.log('ciao')
                                                                                                                                            arrayOpzioniComponenti.push({key: componenteFiltrato.id, text: componenteFiltrato.nome, value: componenteFiltrato.id})
                                                                                                                                        }
                                                                                                                                    )}
                                                                                )}
                                            )

                                        return <Dropdown  name={"componenti"+articoloOrdinatoComposto.id_articolo} id={"componenti"+articoloOrdinatoComposto.id_articolo} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti}/>
                                    }
                    
                                    )


        // associazioniComponenteArticolo
        //     .filter( associazione => associazione.id_articolo === id)
        //     .map( associazioneFiltrata => componentiArticolo
        //                                     .filter( componente => componente.id === associazioneFiltrata.id_componente)
        //                                     .map( componenteFiltrato => arrayOpzioniComponenti.push({key: componenteFiltrato.nome, text: componenteFiltrato.nome, value: componenteFiltrato.id}))
        //     )
        // if(arrayOpzioniComponenti.length>0)
        // return (<Dropdown onChange={handleChange} name={"componenti"+id} id={"componenti"+id} placeholder='Seleziona le opzioni per questo prodotto' fluid multiple selection clearable options={arrayOpzioniComponenti}/>)

    return (
        <div className="mt6">
            {stampaSelectComponenti}
            
        </div>
    )
}

export default ConfermaComposti
