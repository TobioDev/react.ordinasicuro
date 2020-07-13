import React, { Fragment, useState, useEffect } from 'react'

import { Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

import { AiOutlineMenu } from 'react-icons/ai';

import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';
import TimelineVerticale from './TimelineVerticale';
import FeaturesIcone from './FeaturesIcone';
import ConsigliCovid from './ConsigliCovid';
import IscrizioneOS from './IscrizioneOS';
import CtaIcona from './CtaIcona';
import Faq from './Faq';


const Home = () => {

    const [negoziHome, setNegoziHome] = useState([]);
    const [categorie, setCategorie] = useState([]);
    const [visible, setVisible] = useState(false);

    //Passare array vuoto alla fine se si vuole simulare il comportamento di componentDidMount 
    // useEffect(() => {
    //     fetch('https://ordinasicuro.it/index.php/api/negozi_home')
    //         .then(response => response.json())
    //         .then(json => setNegoziHome(json));
    //     fetch('https://ordinasicuro.it/index.php/api/categorie')
    //         .then(response => response.json())
    //         .then(json => setCategorie(json));
    // }, []);

    const negoziFiltrati = negoziHome.filter(negozio => {
        return negozio.visibile !== '0';
    });

    return (
        <Fragment>

                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible
                    width='thin'
                >
                    <Menu.Item as='a'>
                        <Icon name='home' />
                  Home
                </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='gamepad' />
                  Games
                </Menu.Item>
                    <Menu.Item as='a'>
                        <Icon name='camera' />
                  Channels
                </Menu.Item>
                </Sidebar>

            <Segment inverted className="w-100 dn db-l" style={{ marginBottom: "0px", position: "fixed", top: 0, zIndex: 101 }} >
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

            <Segment inverted className="w-100 dn-l" style={{ marginBottom: "0px", marginTop: "0px", position: "fixed", top: 0, zIndex: 101 }} >
                <Menu inverted secondary size="massive">
                    <Menu.Item >
                        <img style={{ width: "150px" }} src="https://ordinasicuro.it/img/logo_home.png" alt="Ordina Sicuro Logo" />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item >
                            <AiOutlineMenu className="white f1" />
                        </Menu.Item>
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
                <Faq />
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
