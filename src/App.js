import React, { Fragment } from 'react';
import {Helmet} from "react-helmet";

import Home from './Home'

import './App.css';
import 'animate.css/animate.css' 

import { Route } from 'react-router-dom'
import NavbarOS from './NavbarOS';
import Negozio from './Negozio';
import ConfermaOrdine from './ConfermaOrdine';


function App() {


	return (

		<Fragment >
			<Helmet>
                <meta charSet="utf-8" />
                <title>Ordina Sicuro - Menu e Vetrina Digitale</title>
                <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic" rel="stylesheet" type="text/css"/>
				<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"/>
            </Helmet>
			<NavbarOS />
			<Route
				exact
				path="/"
				render={() => (
					<Home />
				)}
			/>
			<Route 
				path='/negozio/:id_negozio'
				exact
				component={Negozio} />
			
			<Route 
				path='/conferma-ordine/:id_ordine'
				exact
				component={ConfermaOrdine} />

			<Route 
				path='/conferma-composti/:id_ordine'
				exact
				component={ConfermaOrdine} />

		</Fragment>


	);



}

export default App;
