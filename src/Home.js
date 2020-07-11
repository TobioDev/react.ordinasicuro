import React, { Fragment, useState, useEffect } from 'react'

import { Menu, Segment } from 'semantic-ui-react';

import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';
import TimelineVerticale from './TimelineVerticale';
import FeaturesIcone from './FeaturesIcone';
import ConsigliCovid from './ConsigliCovid';
import IscrizioneOS from './IscrizioneOS';
import CtaIcona from './CtaIcona';


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

            <Segment inverted className="w-100" style={{ marginBottom: "0px", position: "fixed", top: 0, zIndex: 800 }} >
                <Menu inverted secondary size="massive">
                    <Menu.Item >
                        <img style={{ width: "150px" }} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item name='home' active={true} />
                        <Menu.Item name='messages' />
                        <Menu.Item name='friends' />
                    </Menu.Menu>
                </Menu>
            </Segment>

            <Header />

            <CtaIcona />

            <SezioneBoxed backgroundColor="bg-near-white">
                <CardList negozi={negoziFiltrati} categorie={categorie} />
            </SezioneBoxed>



            <SezioneBoxed backgroundColor="bg-white">
                <FeaturesIcone />
            </SezioneBoxed>

            <SezioneBoxed backgroundColor="bg-white" >
                <TimelineVerticale />
            </SezioneBoxed>

            <SezioneBoxed backgroundColor="bg-near-white" >
                <ConsigliCovid />
            </SezioneBoxed>

            <SezioneBoxed backgroundColor="bg-dark-gray" >
                <IscrizioneOS />
            </SezioneBoxed>
        </Fragment>
    )
}

export default Home
