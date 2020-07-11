import React, { Fragment } from 'react'

import Header from './Header';
import SezioneBoxed from './SezioneBoxed';
import CardList from './CardList';
import TimelineVerticale from './TimelineVerticale';
import FeaturesIcone from './FeaturesIcone';
import ConsigliCovid from './ConsigliCovid';
import IscrizioneOS from './IscrizioneOS';
import CtaIcona from './CtaIcona';

const Home = ({ negozi, categorie, contatore }) => {
    return (
        <Fragment>
            <Header contatore={contatore} />

            <CtaIcona />

            <SezioneBoxed backgroundColor="bg-near-white">
                <CardList negozi={negozi} categorie={categorie} />
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
