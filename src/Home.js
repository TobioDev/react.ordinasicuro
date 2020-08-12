import React, { Fragment, useState, useEffect } from 'react'

import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';
import FeaturesIcone from './FeaturesIcone';
import ConsigliCovid from './ConsigliCovid';
import IscrizioneOS from './IscrizioneOS';
import CtaIcona from './CtaIcona';
import Faq from './Faq';
import Footer from './Footer'

import { HashLink as Link } from 'react-router-hash-link';


const Home = () => {

    const [negoziHome, setNegoziHome] = useState([]);
    const [categorie, setCategorie] = useState([]);

    //Passare array vuoto alla fine se si vuole simulare il comportamento di componentDidMount 
    useEffect(() => {
        fetch('https://ordinasicuro.it/index.php/api/negozi_home')
            .then(response => response.json())
            .then(json => setNegoziHome(json));
        fetch('https://ordinasicuro.it/index.php/api/categorie')
            .then(response => response.json())
            .then(json => setCategorie(json));
    }, []);

    const negoziFiltrati = negoziHome.filter(negozio => {
        return negozio.visibile !== '0';
    });

    return (
        <Fragment>

            <Header />

            <CtaIcona />

            <SezioneBoxed backgroundColor="bg-near-white">
                <CardList negozi={negoziFiltrati} categorie={categorie} />
                <Link to="/ricerca">
                  <div className="link br2 ph3 pv2 mb2 mt2 mh3-l dib black w-100 tc b f4 hover-white titolo" style={{backgroundColor : "rgb(255, 193, 7)"}}>SFOGLIA TUTTE LE ATTIVITÀ</div>
                </Link>
            </SezioneBoxed>



            <SezioneBoxed backgroundColor="bg-white">
                <FeaturesIcone />
            </SezioneBoxed>

            <SezioneBoxed backgroundColor="bg-white" >
                <Faq />
            </SezioneBoxed>

            <SezioneBoxed backgroundColor="bg-near-white" >
                <ConsigliCovid />
            </SezioneBoxed>

            <SezioneBoxed className="bg-dark-gray">
                <IscrizioneOS />
            </SezioneBoxed>
            <Footer />
        </Fragment>
    )
}

export default Home
