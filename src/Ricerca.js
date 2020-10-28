import React, { Fragment, useState, useEffect } from 'react'

import SezioneBoxed from './SezioneBoxed'
import LoaderOS from './LoaderOS'
import CardList from './CardList'

import { HashLink as Link } from 'react-router-hash-link';

const Ricerca = (props) => {

    const [negozi, setNegozi] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [visibilitaLoader, setVisibilitaLoader] = useState(true);

    const [termineNuovaRicerca, setTermineNuovaRicerca] = useState('')

    const onChange = (e) => {
        setTermineNuovaRicerca(encodeURI(e.target.value))
    }

    const nuovaRicerca = () => {

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/ricerca/' + termineNuovaRicerca)
        .then(response => response.json())
        //.then( text => console.log(text))
        .then(json => {
            setNegozi(json.get_negozi);
            setCategorie(json.get_categorie);
            setVisibilitaLoader(false)
                }
        )

    }

    const handleKeyPress = (event) => {

        if(event.key === 'Enter'){

            nuovaRicerca()
            
        }
        
        
    }

    useEffect(() => {

        let termineRicerca = '';
        if ( props.match.params.termine_ricerca !== undefined ){

            termineRicerca = props.match.params.termine_ricerca;

        }

        window.scrollTo(0,0);

        fetch('https://ordinasicuro.it/670914_920408/lib/index.php/api/ricerca/' + termineRicerca)
            .then(response => response.json())
            //.then( text => console.log(text))
            .then(json => {
                setNegozi(json.get_negozi);
                setCategorie(json.get_categorie);
                setVisibilitaLoader(false)
                    }
            );

    }, []);

    const negoziFiltrati = negozi.filter(negozio => {
        return negozio.visibile !== '0';
    });


    return (

        <Fragment>

            <LoaderOS visibilita={visibilitaLoader} frase="Stiamo raccogliendo tutte le informazioni..."/>

            <SezioneBoxed className="mt6">
                <h1>La tua Ricerca</h1>
            </SezioneBoxed>
            <SezioneBoxed>
                <div className="tc mb3 w-100">
                    <input
                        placeholder="...o effettua una nuova ricerca"
                        className="mw-100 w-90 w-70-ns f4 input-reset ba b--black-20 pv3 ph4 border-box titolo"
                        onChange={onChange}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        type="submit"
                        value="CERCA"
                        onClick={() => nuovaRicerca()}
                        className="input-reset grow w-90 w-auto-ns mt2 bg-black-80 white f4 pv2 pv3-ns ph4 ba b--black-80 bg-hover-mid-gray titolo"
                    />

                </div>
            </SezioneBoxed>
            <SezioneBoxed>
                <CardList negozi={negoziFiltrati} categorie={categorie} />
            </SezioneBoxed>
            
        </Fragment>

    )
}

export default Ricerca
